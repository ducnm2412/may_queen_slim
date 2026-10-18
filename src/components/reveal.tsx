"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Hiệu ứng hiện dần cho phần tử .rv.
 * Chỉ bắt đầu sau 2 khung hình để React hydrate xong toàn trang (tránh lệch HTML server/client),
 * và không ghi style inline: độ trễ lấy từ CSS qua thuộc tính data-rv.
 */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    let io: IntersectionObserver | null = null;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        document.body.classList.remove("no-js");
        const els = Array.from(document.querySelectorAll<HTMLElement>(".rv:not(.in)"));
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
          els.forEach((el) => el.classList.add("in"));
          return;
        }
        io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add("in");
                io?.unobserve(e.target);
              }
            });
          },
          { threshold: 0.08 },
        );
        els.forEach((el) => io!.observe(el));
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      io?.disconnect();
    };
  }, [pathname]);
  return null;
}
