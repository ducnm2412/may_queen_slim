"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useStore } from "./providers";

/** Xem ảnh phóng to toàn màn hình. Mở bằng openImage(src, alt) từ store. */
export function Lightbox() {
  const { t, lightbox, closeImage } = useStore();

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeImage();
    addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeImage]);

  if (!lightbox) return null;
  return (
    <div data-lenis-prevent className="lightbox" role="dialog" aria-modal="true" aria-label={t("Xem ảnh", "View image")} onClick={closeImage}>
      <button className="lightbox-x" type="button" aria-label={t("Đóng", "Close")} onClick={closeImage}>×</button>
      <figure onClick={(e) => e.stopPropagation()}>
        <Image src={lightbox.src} alt={lightbox.alt} width={2000} height={2000} quality={95} sizes="100vw" priority />
        {lightbox.alt && <figcaption>{lightbox.alt}</figcaption>}
      </figure>
    </div>
  );
}
