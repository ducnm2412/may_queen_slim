"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "./providers";
import { Icon } from "./icons";

type Slide = {
  chip: [string, string];
  title: [string, string];
  desc: [string, string];
  buy: { id: string; label: [string, string] };
  secondary: { href: string; label: [string, string] };
  stats: { v: string; l: [string, string] }[];
  img: string;
  alt: string;
};

/** Tăng số này mỗi khi thay ảnh trong public/img/hero để trình duyệt và cache Next tải ảnh mới. */
const HERO_VERSION = 2;
const v = (src: string) => `${src}?v=${HERO_VERSION}`;

const SLIDES: Slide[] = [
  {
    chip: ["Bước buổi tối", "Night step"],
    title: ["Yodetox Extra", "Yodetox Extra"],
    desc: [
      "Một cốc thảo mộc ấm trước khi ngủ. Bớt đầy hơi, bụng nhẹ, da sáng khoẻ.",
      "A warm herbal cup before bed. Less bloating, a lighter belly, brighter skin.",
    ],
    buy: { id: "yd", label: ["Mua · 400k", "Buy · 400k"] },
    secondary: { href: "#san-pham", label: ["Xem sản phẩm", "See all"] },
    stats: [
      { v: "30", l: ["Gói / hộp", "Sachets / box"] },
      { v: "21:00", l: ["Giờ dùng", "Best time"] },
      { v: "B.O.T", l: ["Sản xuất tại VN", "Made in Vietnam"] },
    ],
    img: v("/img/hero/slide-3-yodetox.jpg"),
    alt: "Hộp Yodetox Extra",
  },
  {
    chip: ["Thảo mộc · Bảo chứng B.O.T Việt Nam", "Herbal · guaranteed by B.O.T Vietnam"],
    title: ["Combo Sáng – Tối", "Day–Night Combo"],
    desc: [
      "Combo Sáng – Tối: Mayqueen Slim hỗ trợ chuyển hoá mỡ, Yodetox Extra thanh lọc dịu nhẹ. Liệu trình 30 ngày, không nhịn ăn.",
      "The Day–Night combo: Mayqueen Slim supports fat metabolism, Yodetox Extra gently detoxes. A 30-day course, no starving.",
    ],
    buy: { id: "cb30", label: ["Mua combo · 790k", "Buy combo · 790k"] },
    secondary: { href: "#ve-chung-toi", label: ["Câu chuyện thương hiệu", "Our story"] },
    stats: [
      { v: "30", l: ["Ngày liệu trình", "Days per course"] },
      { v: "2", l: ["Bước mỗi ngày", "Steps a day"] },
      { v: "0", l: ["Ngày nhịn đói", "Days of starving"] },
    ],
    img: v("/img/hero/slide-1-combo.jpg"),
    alt: "Hộp quà combo Mayqueen Slim và Yodetox Extra",
  },
  {
    chip: ["Bước buổi sáng", "Morning step"],
    title: ["Mayqueen Slim", "Mayqueen Slim"],
    desc: [
      "Viên uống thảo mộc hỗ trợ chuyển hoá mỡ thừa, chặn cơn đói giả. 2 viên sau bữa sáng.",
      "Herbal capsules that support fat metabolism and curb false hunger. 2 capsules after breakfast.",
    ],
    buy: { id: "mq", label: ["Mua · 450k", "Buy · 450k"] },
    secondary: { href: "#san-pham", label: ["Xem sản phẩm", "See all"] },
    stats: [
      { v: "30", l: ["Viên / lọ", "Capsules / bottle"] },
      { v: "07:00", l: ["Giờ dùng", "Best time"] },
      { v: "B.O.T", l: ["Sản xuất tại VN", "Made in Vietnam"] },
    ],
    img: v("/img/hero/slide-2-mayqueen.jpg"),
    alt: "Hộp Mayqueen Slim",
  },
];

export function Hero() {
  const { t, add, openCart, openImage } = useStore();
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchX = useRef<number | null>(null);

  // Chuyển slide theo hướng; tự chạy 5 giây/slide, không dừng khi rê chuột.
  const go = useCallback((to: number, d: "next" | "prev") => {
    setDir(d);
    setI(((to % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  const start = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(() => {
      setDir("next");
      setI((k) => (k + 1) % SLIDES.length);
    }, 5000);
  }, []);

  useEffect(() => {
    start();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [start]);

  const next = () => { go(i + 1, "next"); start(); };
  const prev = () => { go(i - 1, "prev"); start(); };

  return (
    <section
      className={`hero ${dir}`}
      aria-roledescription="carousel"
      aria-label={t("Nổi bật", "Featured")}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
      }}
    >
      {SLIDES.map((s, k) => (
        <div key={k} className={`slide${k === i ? " on" : ""}`} aria-hidden={k !== i}>
          <div className="txt">
            <span className="chip">{t(...s.chip)}</span>
            <h1>{t(...s.title)}</h1>
            <p className="d">{t(...s.desc)}</p>
            <div className="cta">
              <button
                className="btn btn-dark"
                type="button"
                tabIndex={k === i ? 0 : -1}
                onClick={() => {
                  add(s.buy.id);
                  openCart();
                }}
              >
                {t(...s.buy.label)}
              </button>
              <a className="btn btn-line" href={s.secondary.href} tabIndex={k === i ? 0 : -1}>{t(...s.secondary.label)}</a>
            </div>
            <div className="stats">
              {s.stats.map((st) => (
                <div key={st.l[0]}>
                  <b>{st.v}</b>
                  <span>{t(...st.l)}</span>
                </div>
              ))}
            </div>
          </div>
          <button type="button" className="pic zoomable" aria-label={t("Xem ảnh lớn", "View large image")} tabIndex={k === i ? 0 : -1} onClick={() => openImage(s.img, s.alt)}>
            <Image src={s.img} alt={s.alt} fill priority={k === 0} quality={90} sizes="(max-width: 760px) 1600px, 100vw" />
            <span className="zoom-hint"><Icon name="search" size={16} />{t("Phóng to", "Zoom")}</span>
          </button>
        </div>
      ))}
      <div className="hero-nav">
        <button type="button" className="hero-arrow" aria-label={t("Slide trước", "Previous slide")} onClick={prev}><Icon name="left" /></button>
        <div className="dots" role="tablist">
          {SLIDES.map((_, k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-label={`Slide ${k + 1}`}
              aria-current={k === i}
              onClick={() => {
                go(k, k > i ? "next" : "prev");
                start();
              }}
            />
          ))}
        </div>
        <button type="button" className="hero-arrow" aria-label={t("Slide sau", "Next slide")} onClick={next}><Icon name="right" /></button>
      </div>
    </section>
  );
}
