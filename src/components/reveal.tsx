"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Gắn một IntersectionObserver cho mọi phần tử .rv — một lần, toàn trang. */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    document.body.classList.remove("no-js");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll<HTMLElement>(".rv").forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll<HTMLElement>("section, footer, main").forEach((s) => {
      s.querySelectorAll<HTMLElement>(".rv").forEach((el, i) => {
        el.style.transitionDelay = `${(i % 5) * 70}ms`;
        io.observe(el);
      });
    });
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
