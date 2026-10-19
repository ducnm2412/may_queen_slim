"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { useStore } from "./providers";
import { scrollToTarget, setLenis } from "@/lib/scroll";

/**
 * Cuộn mượt, chậm rãi bằng Lenis cho chuột và trackpad.
 * - Cảm ứng trên điện thoại giữ cuộn gốc của hệ điều hành (mượt sẵn, tránh trễ tay).
 * - Tự tắt làm mượt khi người dùng bật "giảm chuyển động".
 * - Dừng cuộn trang khi mở giỏ hàng, menu mobile hoặc xem ảnh lớn.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const { cartOpen, lightbox } = useStore();

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.075, // càng nhỏ càng trôi chậm
      wheelMultiplier: 0.9,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: true,
      respectReducedMotion: true,
      stopInertiaOnNavigate: true,
    });
    lenisRef.current = lenis;
    setLenis(lenis);

    // Link cùng trang có #muc (vd. /#danh-cho-ai khi đang ở trang chủ): trượt bằng Lenis
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      history.replaceState(history.state, "", url.hash);
      scrollToTarget(el);
    };
    document.addEventListener("click", onClick, true);

    // Mở trang khác kèm #muc (vd. từ /song-dep bấm "Dành cho ai"): tới đúng mục sau khi trang hiện
    return () => {
      document.removeEventListener("click", onClick, true);
      lenis.destroy();
      setLenis(null);
      lenisRef.current = null;
    };
  }, []);

  // Đổi trang: tính lại chiều cao trang mới
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      lenisRef.current?.resize();
      if (location.hash) {
        const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (el) setTimeout(() => scrollToTarget(el, { immediate: true }), 60);
      }
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  // Khoá cuộn nền khi có lớp phủ
  useEffect(() => {
    const menuOpen = () => !!document.querySelector(".mob.open");
    const l = lenisRef.current;
    if (!l) return;
    if (cartOpen || lightbox || menuOpen()) l.stop();
    else l.start();
  }, [cartOpen, lightbox]);

  return null;
}
