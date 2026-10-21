"use client";

import Image from "next/image";
import Link from "./llink";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useStore } from "./providers";
import { Icon } from "./icons";
import { CONTACT, PRODUCTS, formatVnd } from "@/lib/products";
import { POSTS as ARTICLES } from "@/lib/posts";
import { HERO_VIDEO, TRANSFORM } from "@/lib/media";
import { flyToCart } from "@/lib/motion";

/* Trang chủ v2 kể chuyện theo phong cách Kobler: mỗi khối gần trọn màn hình, hiệu ứng theo cuộn.
*/

/** Nút mua: thêm vào giỏ và mở giỏ hàng trượt. */
function BuyBtn({ id, vi, en, className = "" }: { id: string; vi: string; en: string; className?: string }) {
  const { t, add, openCart } = useStore();
  return <button type="button" className={`btn-solid buy ${className}`} onClick={() => { add(id); openCart(); }}>{t(vi, en)}</button>;
}

/** Tiêu đề 2 dòng kiểu Kobler: dòng 2 màu nhấn. */
function Title({ a, b, as: Tag = "h2", className = "" }: { a: string; b?: string; as?: "h1" | "h2"; className?: string }) {
  return (
    <Tag className={`ttl ${className}`}>
      <span>{a}</span>
      {b && <em>{b}</em>}
    </Tag>
  );
}

function Arrow() {
  return <span className="arr" aria-hidden="true"><Icon name="right" size={14} /></span>;
}

/**
 * Hiệu ứng cuộn dùng chung, một vòng rAF cho cả trang:
 * - [data-sticky]: ghi --p (0→1) theo tiến độ cuộn qua khối ghim.
 * - [data-px]: parallax nhẹ, hệ số nhỏ trên điện thoại.
 * - [data-count]: số chạy khi vào màn hình.
 */
function ScrollFx() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sticky = Array.from(document.querySelectorAll<HTMLElement>("[data-sticky]"));
    const px = reduced ? [] : Array.from(document.querySelectorAll<HTMLElement>("[data-px]"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      document.documentElement.style.setProperty("--sp", max > 0 ? (scrollY / max).toFixed(4) : "0");
      const k = innerWidth < 760 ? 0.5 : 1;
      for (const el of sticky) {
        const r = el.getBoundingClientRect();
        const span = r.height - vh;
        const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1;
        el.style.setProperty("--p", reduced ? "1" : p.toFixed(4));
      }
      for (const el of px) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const off = (r.top + r.height / 2 - vh / 2) * Number(el.dataset.px) * k;
        el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
      }
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", req, { passive: true });
    addEventListener("resize", req);

    const counts = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        const el = e.target as HTMLElement;
        const to = Number(el.dataset.count);
        if (reduced) { el.textContent = String(to); continue; }
        const t0 = performance.now();
        const step = (now: number) => {
          const x = Math.min(1, (now - t0) / 1600);
          el.textContent = String(Math.round(to * (1 - Math.pow(1 - x, 3))));
          if (x < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.6 });
    counts.forEach((el) => io.observe(el));

    return () => {
      removeEventListener("scroll", req);
      removeEventListener("resize", req);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);
  return null;
}

/* ---------- Khối 1: Video TVC ---------- */
function HeroVideo() {
  const { t } = useStore();
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { v.dataset.userPaused = "1"; v.pause(); return; }
    // Ra khỏi màn hình thì tạm dừng cho nhẹ máy, quay lại thì chạy tiếp
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !v.dataset.userPaused) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.15 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { delete v.dataset.userPaused; v.play().catch(() => {}); }
    else { v.dataset.userPaused = "1"; v.pause(); }
  };

  return (
    <section className="hv" aria-label={t("Video giới thiệu", "Intro video")}>
      <video ref={ref} className="hv-video" autoPlay muted={muted} loop playsInline preload="metadata" onPlay={() => setPaused(false)} onPause={() => setPaused(true)} poster={HERO_VIDEO.poster} aria-hidden="true">
        {HERO_VIDEO.mobile && <source src={HERO_VIDEO.mobile} media="(max-width: 760px)" type="video/mp4" />}
        <source src={HERO_VIDEO.desktop} type="video/mp4" />
      </video>
      {HERO_VIDEO.isDemo && <span className="hv-tag">{t("Video minh hoạ", "Illustrative video")}</span>}
      <div className="hv-ctl">
        <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? t("Bật tiếng", "Unmute") : t("Tắt tiếng", "Mute")} aria-pressed={!muted}>
          <svg viewBox="0 0 24 24" className="ic"><path d="M4 9h4l5-4v14l-5-4H4z" />{muted ? <path d="m16 9 5 6M21 9l-5 6" /> : <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />}</svg>
        </button>
        <button type="button" onClick={togglePlay} aria-label={paused ? t("Phát video", "Play video") : t("Tạm dừng video", "Pause video")}>
          <svg viewBox="0 0 24 24" className="ic">{paused ? <path d="M8 5v14l11-7z" /> : <path d="M9 5v14M15 5v14" />}</svg>
        </button>
      </div>
    </section>
  );
}

/* ---------- Section 2: câu chuyện thương hiệu ngắn (bố cục khối "Kiến trúc Pháp" của Kobler) ---------- */
function Intro() {
  const { t } = useStore();
  return (
    <section className="bs">
      <Image className="bs-bg" data-px="-0.12" src="/img/v2/brand-dark.jpg" alt="" fill sizes="100vw" quality={85} />
      <div className="wrap bs-body">
        <Title className="rv" a={t("Câu chuyện Mayqueen", "The Mayqueen story")} b={t("Từ thảo mộc phương Đông", "From Eastern botanicals")} />
        <p className="bs-lead rv">{t("Một nghi thức. Nhiều giá trị sống", "One ritual. Many values for life")}</p>
        <div className="cta-row rv">
          <BuyBtn id="cb30" vi="Mua combo Sáng – Tối" en="Buy the day–night combo" />
          <Link className="btn-ln bs-cta" href="/cau-chuyen">{t("Đọc câu chuyện", "Read our story")} <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Đoạn biến hình: ảnh trước → sau theo cuộn ---------- */
export function Transform() {
  const { t } = useStore();
  return (
    <section className="tf" data-sticky aria-label={t("Hành trình tự tin", "A confident journey")}>
      <div className="tf-pin">
        <div className="tf-img tf-before"><Image src={TRANSFORM.before} alt="" fill sizes="100vw" quality={80} loading="eager" /></div>
        <div className="tf-img tf-after"><Image src={TRANSFORM.after} alt="" fill sizes="100vw" quality={85} /></div>
        <div className="tf-shade" />
        <div className="wrap tf-txt">
          <div className="tf-a">
            <p className="kick">{t("Ngày đầu tiên", "Day one")}</p>
            <Title a={t("Ngại ngùng", "Hesitant")} b={t("trước gương", "in the mirror")} />
          </div>
          <div className="tf-b">
            <p className="kick">{t("Sau hành trình Sáng – Tối", "After the day–night ritual")}</p>
            <Title a={t("Tự tin", "Confident")} b={t("với chính mình", "in your own skin")} />
            <div className="cta-row"><BuyBtn id="cb30" vi="Bắt đầu liệu trình 30 ngày" en="Start the 30-day course" /></div>
          </div>
        </div>
        <div className="tf-bar" aria-hidden="true"><i /></div>
        <span className="hv-tag">{t("Hình ảnh minh hoạ · Kết quả tuỳ cơ địa", "Illustrative · Results vary")}</span>
      </div>
    </section>
  );
}

/* ---------- Khối 2: Câu chuyện thương hiệu ---------- */
const VALUES = [
  { k: ["Thảo mộc", "Botanicals"], d: ["Tinh tuý từ lá, rễ, hạt phương Đông", "The essence of Eastern leaves, roots and seeds"] },
  { k: ["Nhịp Sáng – Tối", "Day–night rhythm"], d: ["Thuận theo nhịp sinh học cơ thể", "In tune with your body clock"] },
  { k: ["Không nhịn ăn", "No starving"], d: ["Vẫn trọn vẹn bữa cơm gia đình", "Keep your family meals"] },
  { k: ["Bền lâu", "Lasting care"], d: ["Chăm sóc chậm mà bền", "Slow, steady, lasting care"] },
];

export function Story() {
  const { t } = useStore();
  return (
    <>
      <section className="st" id="cau-chuyen">
        <div className="st-bg"><Image src="/img/v2/story-field.jpg" alt="" fill sizes="100vw" quality={80} /></div>
        <div className="wrap st-body">
          <Title className="rv" a={t("Thon gọn từ bên trong", "Slim from within")} b={t("Vẻ đẹp khởi nguồn từ thảo mộc", "Beauty rooted in botanicals")} />
          <div className="st-copy rv">
            <p>{t("Mayqueen bắt đầu từ một câu hỏi giản dị: làm sao để người phụ nữ Việt giữ được vóc dáng mà không phải đánh đổi những bữa cơm gia đình, giấc ngủ ngon hay niềm vui mỗi ngày?", "Mayqueen began with a simple question: how can Vietnamese women keep their shape without giving up family meals, good sleep or everyday joy?")}</p>
            <p>{t("Chúng tôi tìm câu trả lời trong kho tàng thảo mộc phương Đông, những lá, rễ, hạt đã gắn bó với đời sống người Việt qua nhiều thế hệ, và chắt lọc thành một nghi thức nhẹ nhàng: sáng khởi động, tối thanh lọc.", "We found the answer in Eastern botanicals, leaves, roots and seeds woven into Vietnamese life for generations, distilled into a gentle ritual: wake up by day, cleanse by night.")}</p>
            <p>{t("Ngay từ những ngày đầu, B.O.T Việt Nam theo đuổi triết lý chăm sóc chậm mà bền: lắng nghe cơ thể, tôn trọng nhịp sinh học, để vẻ đẹp đến tự nhiên và ở lại lâu hơn.", "From day one, B.O.T Vietnam has pursued slow, lasting care: listen to the body, respect its rhythm, and let beauty arrive naturally and stay longer.")}</p>
          </div>
          <dl className="st-vals rv">
            {VALUES.map((v) => (
              <div key={v.k[0]}><dt>{t(v.k[0], v.k[1])}</dt><dd>{t(v.d[0], v.d[1])}</dd></div>
            ))}
          </dl>
        </div>
      </section>
      <section className="qt">
        <div className="qt-img rv zoomimg"><Image src="/img/v2/story-herbs.jpg" alt={t("Thảo mộc", "Botanicals")} fill sizes="(max-width: 900px) 100vw, 50vw" quality={85} /></div>
        <figure className="qt-body">
          <span className="qt-mark rv" aria-hidden="true">“</span>
          <blockquote className="rv">{t("Vẻ đẹp thật sự không đến từ sự khắc nghiệt với bản thân. Nó đến khi ta biết lắng nghe và chăm sóc cơ thể mình, mỗi sáng và mỗi tối.", "True beauty doesn't come from being harsh on yourself. It comes when we listen to and care for our body, every morning and every night.")}</blockquote>
          <figcaption className="rv">
            <span className="sign">Tiến Đại</span>
            <b>{CONTACT.person}</b>
            <small>{CONTACT.company}</small>
          </figcaption>
        </figure>
      </section>
    </>
  );
}

/* ---------- Sản phẩm: combo Sáng – Tối ---------- */
const STEPS = [
  { id: "mq", k: ["Bước buổi sáng · 07:00", "Morning step · 07:00"], img: "/img/mayqueen-leaf.jpg", pts: [["Viên uống thảo mộc, lọ 30 viên", "Herbal capsules, 30 per bottle"], ["Dùng sau bữa sáng", "Take after breakfast"], ["Hỗ trợ chuyển hoá mỡ thừa", "Supports fat metabolism"]] },
  { id: "yd", k: ["Bước buổi tối · 21:00", "Night step · 21:00"], img: "/img/yodetox-da.jpg", pts: [["Thức uống thanh lọc, hộp 30 gói", "Detox drink, 30 sachets"], ["Một cốc ấm trước khi ngủ", "A warm cup before bed"], ["Thanh lọc dịu nhẹ", "Gentle cleanse"]] },
] as const;

export function Products() {
  const { t, lang, add, openCart } = useStore();
  const combo = PRODUCTS.find((p) => p.id === "cb30")!;
  return (
    <section className="pr2" id="san-pham">
      <div className="wrap">
        <Title className="rv center" a={t("Hai bước mỗi ngày", "Two steps a day")} b={t("Nghi thức Sáng – Tối", "The day–night ritual")} />
        <div className="pr2-duo">
          {STEPS.map((s) => {
            const p = PRODUCTS.find((x) => x.id === s.id)!;
            return (
              <article className="pr2-card rv" key={s.id}>
                <Link href={`/san-pham/${p.id}`} className="pr2-ph zoomimg" tabIndex={-1} aria-hidden="true"><Image src={s.img} alt="" fill sizes="(max-width: 900px) 100vw, 25vw" quality={85} /></Link>
                <div className="pr2-tx">
                  <p className="kick">{t(s.k[0], s.k[1])}</p>
                  <h3>{lang === "en" && p.nameEn ? p.nameEn : p.name}</h3>
                  <div className="pr2-pr">{formatVnd(p.price)}{p.old && <s>{formatVnd(p.old)}</s>}</div>
                  <div className="pr2-act">
                    <button type="button" className="btn-solid sm" onClick={() => { add(p.id); openCart(); }}>{t("Mua ngay", "Buy now")}</button>
                    <Link className="btn-ln dk" href={`/san-pham/${p.id}`}>{t("Khám phá", "Explore")} <Arrow /></Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <article className="pr2-combo rv">
          <div className="pr2-combo-ph zoomimg"><Image src={combo.img} alt={combo.name} fill sizes="(max-width: 900px) 100vw, 50vw" quality={85} /></div>
          <div className="pr2-combo-tx">
            <p className="kick">{t(combo.tag ?? "", combo.tagEn ?? "")}</p>
            <Title a={t("Combo Sáng – Tối", "Day–Night combo")} b={t("Liệu trình 30 ngày", "30-day course")} />
            <div className="pr2-pr lg">{formatVnd(combo.price)}{combo.old && <s>{formatVnd(combo.old)}</s>}</div>
            <div className="pr2-act">
              <button type="button" className="btn-solid" onClick={() => { add(combo.id); openCart(); }}>{t("Mua ngay", "Buy now")}</button>
              <button type="button" className="btn-ln" onClick={(e) => { flyToCart(e.currentTarget.closest(".pr2-combo")?.querySelector(".pr2-combo-ph")); add(combo.id); }}>{t("Thêm vào giỏ", "Add to cart")} <Arrow /></button>
            </div>
            <Link className="pr2-all" href="/san-pham">{t("Xem tất cả sản phẩm", "View all products")} <Arrow /></Link>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ---------- Khối 3: Thành phần (tách lớp theo cuộn) ---------- */
// Tên nguyên liệu lấy theo các phiếu COA khách gửi.
// Cần đối chiếu bảng thành phần trên vỏ hộp / hồ sơ công bố trước khi chạy thật.
type Ing = { n: [string, string]; d: [string, string] };
const ING: Record<"mq" | "yd", { img: string; name: string; when: [string, string]; list: Ing[] }> = {
  mq: {
    img: "/img/mayqueen-leaf.jpg", name: "Mayqueen Slim", when: ["Buổi sáng", "Morning"],
    list: [
      { n: ["Chiết xuất trà xanh", "Green tea extract"], d: ["Hỗ trợ chuyển hoá năng lượng", "Supports energy metabolism"] },
      { n: ["Chitosan", "Chitosan"], d: ["Hỗ trợ hạn chế hấp thu chất béo", "Helps limit fat absorption"] },
      { n: ["L-Glutamine", "L-Glutamine"], d: ["Giúp giảm cảm giác thèm ngọt", "Helps ease sugar cravings"] },
      { n: ["Chiết xuất ngưu tất", "Achyranthes extract"], d: ["Hỗ trợ lưu thông, cơ thể nhẹ nhàng", "Supports circulation and lightness"] },
      { n: ["Chiết xuất men gạo đỏ", "Red yeast rice extract"], d: ["Hỗ trợ cân bằng mỡ máu", "Supports healthy blood lipids"] },
      { n: ["Polypodium", "Polypodium"], d: ["Chống oxy hoá, bảo vệ làn da", "Antioxidant skin protection"] },
      { n: ["Collagen peptide", "Collagen peptide"], d: ["Giữ da săn chắc khi vóc dáng thay đổi", "Keeps skin firm as you slim"] },
      { n: ["Vitamin C", "Vitamin C"], d: ["Tăng sức đề kháng, sáng da", "Boosts immunity and glow"] },
    ],
  },
  yd: {
    img: "/img/yodetox-da.jpg", name: "Yodetox Extra", when: ["Buổi tối", "Evening"],
    list: [
      { n: ["Diếp cá", "Houttuynia"], d: ["Thanh nhiệt, mát gan", "Cooling and liver-friendly"] },
      { n: ["Atiso", "Artichoke"], d: ["Hỗ trợ tiêu hoá chất béo", "Aids fat digestion"] },
      { n: ["Rau má", "Gotu kola"], d: ["Giải nhiệt, dịu nóng trong", "Soothes internal heat"] },
      { n: ["Lá sen", "Lotus leaf"], d: ["Giúp ngủ ngon, nhẹ bụng", "Calm sleep, lighter belly"] },
      { n: ["Hoa cúc", "Chrysanthemum"], d: ["Thư giãn sau ngày dài", "Unwind after a long day"] },
      { n: ["Cam thảo", "Licorice"], d: ["Vị ngọt dịu, điều hoà", "Gentle natural sweetness"] },
    ],
  },
};

export function Ingredients() {
  const { t } = useStore();
  const [tab, setTab] = useState<keyof typeof ING>("mq");
  const cur = ING[tab];
  const n = cur.list.length;
  const half = Math.ceil(n / 2);
  const side = (from: number, to: number, cls: "l" | "r") => (
    <ol className={`ig-col ${cls}`}>
      {cur.list.slice(from, to).map((x, k) => {
        const i = from + k;
        return (
          <li key={x.n[0]} style={{ ["--i" as string]: i }}>
            <span className="ig-num">{String(i + 1).padStart(2, "0")}</span>
            <b>{t(x.n[0], x.n[1])}</b>
            <span className="ig-d">{t(x.d[0], x.d[1])}</span>
          </li>
        );
      })}
    </ol>
  );
  return (
    <section className="ig" id="thanh-phan" data-sticky style={{ ["--n" as string]: n }}>
      <div className="ig-pin">
        <div className="wrap ig-head">
          <div>
            <Title a={t(`${n} tinh chất`, `${n} key actives`)} b={t("Trong từng liệu trình", "In every course")} />
            <p className="ig-note">{t("Tinh chất chọn lọc, đủ phiếu kiểm nghiệm nguyên liệu.", "Selected actives, each with a certificate of analysis.")}</p>
          </div>
          <div className="ig-tabs" role="tablist" aria-label={t("Sản phẩm", "Product")}>
            {(Object.keys(ING) as (keyof typeof ING)[]).map((k) => (
              <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>
                {k === "mq" ? <Icon name="sun" size={15} /> : <Icon name="moon" size={15} />}
                {ING[k].name} <small>({t(ING[k].when[0], ING[k].when[1])})</small>
              </button>
            ))}
          </div>
        </div>
        <div className="wrap ig-stage" key={tab}>
          {side(0, half, "l")}
          <div className="ig-core">
            <svg className="ig-ring" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="48" pathLength="1" /></svg>
            <div className="ig-arch"><Image src={cur.img} alt={cur.name} fill sizes="(max-width: 900px) 70vw, 28vw" quality={85} /></div>
            <span className="ig-badge">{t(cur.when[0], cur.when[1])}<b>{cur.name}</b></span>
          </div>
          {side(half, n, "r")}
        </div>
      </div>
    </section>
  );
}

/* ---------- Khối 4: Chứng nhận ---------- */
// Chứng nhận thật trích từ file PDF khách gửi (public/img/cert).
const CERTS: { img: string; n: [string, string]; by: [string, string] }[] = [
  { img: "/img/cert/cong-bo.jpg", n: ["Giấy tiếp nhận đăng ký bản công bố sản phẩm", "Product declaration receipt"], by: ["Cục An toàn thực phẩm · Số 6926/2021/ĐKSP", "Vietnam Food Administration · No. 6926/2021/ĐKSP"] },
  { img: "/img/cert/gmp.jpg", n: ["Chứng nhận GMP nhà máy", "Factory GMP certificate"], by: ["Cục An toàn thực phẩm · Số 69/2023/ATTP-CNGMP", "Vietnam Food Administration · No. 69/2023/ATTP-CNGMP"] },
  { img: "/img/cert/iso-22000.jpg", n: ["Chứng nhận ISO 22000:2018", "ISO 22000:2018 certificate"], by: ["GOOD Việt Nam · Nhà máy Goldcare", "GOOD Vietnam · Goldcare factory"] },
  { img: "/img/cert/irdop.jpg", n: ["Phiếu kết quả thử nghiệm", "Test result report"], by: ["Viện IRDOP", "IRDOP Institute"] },
];

/** Phiếu kiểm nghiệm (COA) nguyên liệu từ nhà cung cấp, cùng file PDF. */
const COAS: { img: string; n: [string, string] }[] = [
  { img: "/img/cert/coa-tra-xanh.jpg", n: ["Chiết xuất trà xanh", "Green tea extract"] },
  { img: "/img/cert/coa-chitosan.jpg", n: ["Chitosan", "Chitosan"] },
  { img: "/img/cert/coa-nguu-tat.jpg", n: ["Chiết xuất ngưu tất", "Achyranthes extract"] },
  { img: "/img/cert/coa-polypodium.jpg", n: ["Chiết xuất Polypodium", "Polypodium extract"] },
  { img: "/img/cert/coa-hong-cuc.jpg", n: ["Chiết xuất men gạo đỏ", "Red yeast rice extract"] },
  { img: "/img/cert/coa-l-glutamine.jpg", n: ["L-Glutamine", "L-Glutamine"] },
  { img: "/img/cert/coa-collagen.jpg", n: ["Collagen peptide", "Collagen peptide"] },
  { img: "/img/cert/coa-vitamin-c.jpg", n: ["Vitamin C", "Vitamin C"] },
];

const STATS: { v?: number; s?: string; u: [string, string]; l: [string, string] }[] = [
  { v: 30, u: ["viên", "caps"], l: ["Mỗi lọ Mayqueen Slim", "Per Mayqueen Slim bottle"] },
  { v: 30, u: ["gói", "sachets"], l: ["Mỗi hộp Yodetox Extra", "Per Yodetox Extra box"] },
  { v: 2, u: ["bước", "steps"], l: ["Sáng – Tối mỗi ngày", "Day and night"] },
  { s: "VN", u: ["", ""], l: ["Sản xuất tại Việt Nam", "Made in Vietnam"] },
];

export function Certs() {
  const { t, openImage } = useStore();
  return (
    <section className="ct" id="chung-nhan">
      <div className="ct-bg" />
      <div className="wrap">
        <Title className="rv center" a={t("Niềm tin", "Trust")} b={t("Tạo nên lựa chọn", "Behind every choice")} />
        <div className="ct-grid">
          {CERTS.map((c) => (
            <button type="button" key={c.img} className="ct-card rv" onClick={() => openImage(c.img, t(c.n[0], c.n[1]))}>
              <span className="ct-ph"><Image src={c.img} alt="" width={420} height={594} sizes="(max-width: 760px) 45vw, 16vw" /></span>
              <b>{t(c.n[0], c.n[1])}</b>
              <small>{t(c.by[0], c.by[1])}</small>
              <span className="ct-zoom"><Icon name="search" size={14} />{t("Phóng to", "Zoom")}</span>
            </button>
          ))}
        </div>
        <h3 className="ct-sub rv">{t("Phiếu kiểm nghiệm nguyên liệu (COA)", "Raw material certificates of analysis")}</h3>
        <div className="ct-coa">
          {COAS.map((c) => (
            <button type="button" key={c.img} className="rv" onClick={() => openImage(c.img, `COA · ${t(c.n[0], c.n[1])}`)}>
              <Image src={c.img} alt="" width={240} height={340} sizes="(max-width: 760px) 30vw, 10vw" />
              <span>{t(c.n[0], c.n[1])}</span>
            </button>
          ))}
        </div>
        <div className="ct-stats">
          {STATS.map((s) => (
            <div key={s.l[0]} className="rv">
              <b>{s.v != null ? <span data-count={s.v}>0</span> : s.s}<small>{t(s.u[0], s.u[1])}</small></b>
              <span>{t(s.l[0], s.l[1])}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Khối 5: Cảm nhận khách hàng (nội dung mẫu, ảnh AI) ---------- */
const REVIEWS = [
  { img: "/img/v2/fb-1.jpg", n: "Minh Anh", r: ["Nhân viên văn phòng · 32 tuổi", "Office worker · 32"], q: ["Mình thích nhất là nghi thức Sáng – Tối rất dễ theo. Buổi chiều không còn thèm đồ ngọt như trước, tối uống Yodetox thấy ấm bụng, ngủ ngon hơn.", "The day–night ritual is so easy to follow. Fewer afternoon sugar cravings, and Yodetox at night feels warm and calming."] },
  { img: "/img/v2/fb-2.jpg", n: "Thu Hà", r: ["Nội trợ · 38 tuổi", "Homemaker · 38"], q: ["Vẫn ăn cơm cùng cả nhà, không phải nhịn. Hộp gói gọn, mang theo tiện, nhân viên tư vấn nhắc lịch dùng rất chu đáo.", "I still eat with my family, no starving. Compact packs, and the consultant reminds me of my schedule kindly."] },
  { img: "/img/v2/fb-3.jpg", n: "Ngọc Lan", r: ["Giảng viên · 26 tuổi", "Lecturer · 26"], q: ["Vị Yodetox dễ uống hơn mình nghĩ. Sau vài tuần thấy người nhẹ nhõm, mặc đồ đi dạy tự tin hơn hẳn.", "Yodetox tastes nicer than I expected. After a few weeks I feel lighter and more confident at work."] },
  { img: "/img/v2/fb-4.jpg", n: "Diệu Linh", r: ["Kinh doanh tự do · 45 tuổi", "Business owner · 45"], q: ["Bận rộn nên mình cần thứ gì đơn giản. Hai bước mỗi ngày, không cầu kỳ, bao bì cũng sang để làm quà.", "I'm busy, so I need something simple. Two steps a day, and the packaging is elegant enough to gift."] },
];

export function Reviews() {
  const { t } = useStore();
  return (
    <section className="rvw" id="cam-nhan">
      <div className="wrap">
        <div className="rvw-head">
          <Title className="rv" a={t("Cảm nhận", "In their words")} b={t("Từ khách hàng", "Our customers")} />
          <p className="rv">{t("Những chia sẻ từ khách hàng sau hành trình Sáng – Tối cùng Mayqueen.", "What customers share after the Mayqueen day–night ritual.")}</p>
        </div>
        <div className="rvw-grid">
          {REVIEWS.map((r) => (
            <article className="rvw-card rv" key={r.n}>
              <div className="rvw-ph"><Image src={r.img} alt="" fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw" quality={80} /></div>
              <div className="rvw-tx">
                <div className="stars" aria-label={t("5 trên 5 sao", "5 out of 5 stars")}>★★★★★</div>
                <blockquote>“{t(r.q[0], r.q[1])}”</blockquote>
                <b>{r.n}</b>
                <small>{t(r.r[0], r.r[1])}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Sống đẹp cùng Mayqueen (blog) ---------- */
export function LiveWellV2() {
  const { t } = useStore();
  return (
    <section className="lw">
      <div className="wrap">
        <Title className="rv center" a={t("Sống đẹp", "Live well")} b={t("Cùng Mayqueen", "With Mayqueen")} />
        <div className="lw-grid">
          {ARTICLES.slice(0, 5).map((p) => (
            <Link key={p.slug} className="lw-tile rv" href={`/song-dep/${p.slug}`}>
              <Image src={p.img} alt="" fill sizes="(max-width: 760px) 70vw, 20vw" quality={75} />
              <span><small>{t(...p.cat)}</small>{t(...p.title)}</span>
            </Link>
          ))}
        </div>
        <div className="center"><Link className="btn-ln" href="/song-dep">{t("Tất cả bài viết", "All articles")} <Arrow /></Link></div>
      </div>
    </section>
  );
}

/* ---------- Form tư vấn liệu trình 1:1 ---------- */
const CONCERNS = [
  ["Mỡ bụng", "Belly fat"],
  ["Hay thèm ăn", "Cravings"],
  ["Đầy bụng, khó tiêu", "Bloating"],
  ["Giữ dáng sau sinh", "Post-partum shape"],
  ["Khác", "Other"],
] as const;

export function Consult() {
  const { t } = useStore();
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!f.checkValidity()) { f.reportValidity(); return; }
    // TODO trước khi go-live: nối form tư vấn về CRM / Google Sheet / Zalo OA
    setSent(true);
  };
  return (
    <section className="cs" id="lien-he">
      <div className="cs-img zoomimg rv"><Image src="/img/v2/tvc-4-buoi-toi.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 50vw" quality={80} /></div>
      <div className="cs-body">
        <Title className="rv" a={t("Tư vấn liệu trình", "Your 1:1 plan")} b="1 : 1" />
        <p className="rv">{t("Để lại thông tin, chuyên viên sẽ nhắn Zalo cho bạn trong 15 phút (8:00–21:00).", "Leave your details and a consultant will text you on Zalo within 15 minutes (8:00–21:00).")}</p>
        {sent ? (
          <p className="cs-ok" role="status">{t("Đã nhận! Chuyên viên sẽ liên hệ bạn ngay.", "Got it! We'll be in touch shortly.")}</p>
        ) : (
          <form className="cs-form rv" onSubmit={submit} noValidate>
            <label><span>{t("Họ tên", "Full name")}</span><input name="name" required autoComplete="name" /></label>
            <label><span>{t("Số điện thoại", "Phone")}</span><input name="phone" required inputMode="tel" autoComplete="tel" pattern="[0-9 +]{9,13}" /></label>
            <fieldset>
              <legend>{t("Vấn đề quan tâm", "Your concern")}</legend>
              <div className="cs-chips">
                {CONCERNS.map((c, i) => (
                  <label key={c[0]}><input type="radio" name="concern" value={c[0]} defaultChecked={i === 0} /><span>{t(c[0], c[1])}</span></label>
                ))}
              </div>
            </fieldset>
            <button className="btn-solid" type="submit">{t("Nhận tư vấn miễn phí", "Get free advice")}</button>
          </form>
        )}
      </div>
      <ul className="cs-strip">
        <li><Icon name="phone" /><span><b>{t("Tư vấn 1:1", "1:1 advice")}</b>{t("Hotline / Zalo ", "Hotline / Zalo ")}{CONTACT.phone}</span></li>
        <li><Icon name="truck" /><span><b>{t("Giao toàn quốc", "Nationwide delivery")}</b>{t("Freeship đơn từ 700k", "Free from 700k")}</span></li>
        <li><Icon name="shield" /><span><b>{t("Kiểm tra trước khi nhận", "Inspect on delivery")}</b>{t("Đổi trả trong 7 ngày nếu lỗi", "7-day returns if faulty")}</span></li>
      </ul>
    </section>
  );
}

type L = [string, string];

/** Banner đầu trang con kiểu Kobler: ảnh nền tối, breadcrumb, tiêu đề 2 dòng. */
export function PageHero({ img, a, b, desc, crumb, pos }: { img: string; a: L; b: L; desc: L; crumb: L; pos?: string }) {
  const { t } = useStore();
  return (
    <section className="ph2">
      <div className="ph2-bg"><Image src={img} alt="" fill priority sizes="100vw" quality={80} style={pos ? { objectPosition: pos } : undefined} /></div>
      <div className="wrap ph2-body">
        <nav className="ph2-crumb" aria-label="Breadcrumb"><Link href="/">{t("Trang chủ", "Home")}</Link><Icon name="right" size={12} /><span>{t(...crumb)}</span></nav>
        <Title as="h1" className="hv-in" a={t(...a)} b={t(...b)} />
        <p className="hv-sub hv-in">{t(...desc)}</p>
      </div>
    </section>
  );
}

/** Khung chung cho trang v2: gắn hiệu ứng cuộn. */
export function V2Page({ children }: { children: ReactNode }) {
  return (
    <main className="v2">
      {children}
      <ScrollFx />
      <div className="scroll-bar" aria-hidden="true" />
    </main>
  );
}

/* =====================================================================
   Trang chủ theo 4 khối mẫu Kobler: 8 lớp kiến tạo → Thành phần,
   Niềm tin tạo nên lựa chọn → Chứng nhận, Công trình tiêu biểu → Feedback,
   Công cụ chọn sàn → Thông tin công ty.
   ===================================================================== */

/** Trượt thẻ bằng nút mũi tên (transform), không dùng cuộn ngang để không chặn cuộn trang. */
function useStepper(count: number) {
  const [i, setI] = useState(0);
  const [per, setPer] = useState(1);
  useEffect(() => {
    const on = () => setPer(innerWidth >= 1100 ? 0 : innerWidth >= 700 ? 1 : 2);
    on();
    addEventListener("resize", on);
    return () => removeEventListener("resize", on);
  }, []);
  return { i, per, set: (n: number) => setI(Math.max(0, Math.min(count - 1, n))) };
}

/** Kéo bằng tay trên cảm ứng: vuốt ngang đổi thẻ, không giữ cuộn dọc. */
function swipe(go: (d: number) => void) {
  let x0: number | null = null;
  return {
    onTouchStart: (e: React.TouchEvent) => { x0 = e.touches[0].clientX; },
    onTouchEnd: (e: React.TouchEvent) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    },
  };
}

const BENEFITS = [
  { img: "/img/mayqueen-leaf.jpg", h: ["Sáng đốt mỡ", "Burn by day"], d: ["Hỗ trợ chuyển hoá mỡ thừa, khởi động ngày mới nhẹ nhàng", "Supports fat metabolism to start the day light"] },
  { img: "/img/yodetox-da.jpg", h: ["Tối thanh lọc", "Cleanse by night"], d: ["Thanh lọc dịu nhẹ, nhẹ bụng và ngủ ngon hơn", "A gentle cleanse for a lighter belly and better sleep"] },
  { img: "/img/v2/tvc-4-buoi-toi.jpg", h: ["Không nhịn ăn", "No starving"], d: ["Vẫn trọn vẹn những bữa cơm cùng gia đình", "Keep enjoying meals with your family"] },
  { img: "/img/v2/story-herbs.jpg", h: ["Thảo mộc thiên nhiên", "Natural botanicals"], d: ["Trà xanh, ngưu tất và tinh chất phương Đông", "Green tea, achyranthes and Eastern extracts"] },
  { img: "/img/duo-glass.jpg", h: ["Chuẩn GMP · ISO 22000", "GMP · ISO 22000"], d: ["Sản xuất tại nhà máy đạt chuẩn an toàn thực phẩm", "Made in a certified food-safety factory"] },
  { img: "/img/v2/tvc-2-chay-bo.jpg", h: ["Khoẻ mỗi ngày", "Well every day"], d: ["Cơ thể nhẹ nhõm, tràn đầy năng lượng", "A lighter body, full of energy"] },
] as const;

function KLayers() {
  const { t } = useStore();
  const st = useStepper(BENEFITS.length);
  const visible = 3 - st.per;
  const max = BENEFITS.length - visible;
  const go = (d: number) => st.set(Math.min(max, st.i + d));
  return (
    <section className="kl">
      <div className="kl-left">
        <Title className="rv" a={t("8 tinh chất kiến tạo", "8 actives shaping")} b={t("Vóc dáng thon gọn", "A leaner silhouette")} />
        <div className="kl-stack">
          <div className="kl-img clipin rv"><Image src="/img/v2/layers.jpg" alt={t("Các lớp tinh chất thảo mộc", "Layers of botanical actives")} fill sizes="(max-width: 900px) 50vw, 18vw" quality={85} /></div>
          <ol className="kl-list">
            {ING.mq.list.map((x, i) => (
              <li key={x.n[0]} className="rv"><span>{i + 1}</span><div><b>{t(x.n[0], x.n[1])}</b></div></li>
            ))}
          </ol>
        </div>
      </div>
      <div className="kl-right">
        <Title className="rv" a={t("Cơ chế", "The science")} b={t("Phía sau sự thon gọn", "Behind the shape")} />
        <div className="kl-wrap">
          <button type="button" className="kf-arr l" aria-label={t("Trước", "Previous")} onClick={() => go(-1)} disabled={st.i === 0}><Icon name="left" /></button>
          <div className="kl-view rv" {...swipe(go)}>
            <div className="kl-track" style={{ ["--i" as string]: st.i, ["--v" as string]: visible }}>
              {BENEFITS.map((b) => (
                <article className="kl-card" key={b.h[0]}>
                  <Image src={b.img} alt="" fill sizes="(max-width: 700px) 85vw, (max-width: 1100px) 40vw, 18vw" quality={80} />
                  <div><b>{t(b.h[0], b.h[1])}</b></div>
                </article>
              ))}
            </div>
          </div>
          <button type="button" className="kf-arr r" aria-label={t("Sau", "Next")} onClick={() => go(1)} disabled={st.i >= max}><Icon name="right" /></button>
        </div>
        <div className="kl-foot">
          <div className="cta-row">
            <BuyBtn id="mq" vi="Mua Mayqueen Slim · 450k" en="Buy Mayqueen Slim · 450k" className="dark" />
            <Link className="btn-ln dk kl-more" href="/san-pham">{t("Xem sản phẩm", "See products")} <Arrow /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function KCompany() {
  const { t } = useStore();
  return (
    <>
      <section className="kc">
        <div className="kc-img clipin rv"><Image src="/img/v2/company.jpg" alt={t("Chuyên viên Mayqueen tư vấn cho khách hàng", "A Mayqueen consultant advising a customer")} fill sizes="(max-width: 900px) 100vw, 60vw" quality={85} /></div>
        <div className="kc-body">
          <h2 className="ttl kc-ttl rv"><span>{CONTACT.company}</span></h2>
          <ul className="kc-items rv">
            <li><Icon name="pin" size={40} /><span><small>{t("Địa chỉ", "Address")}</small>{CONTACT.address}</span></li>
            <li><Icon name="user" size={40} /><span><small>{t("Người liên hệ", "Contact person")}</small>{CONTACT.person}</span></li>
            <li><Icon name="phone" size={40} /><span><small>Hotline</small>{CONTACT.phone}</span></li>
          </ul>
          <div className="cta-row rv">
            <a className="btn-solid buy dark" href={CONTACT.zalo} target="_blank" rel="noopener">{t("Đặt hàng qua Zalo", "Order on Zalo")}</a>
            <Link className="btn-ln dk" href="/lien-he">{t("Liên hệ tư vấn", "Contact us")} <Arrow /></Link>
          </div>
        </div>
      </section>
      <ul className="kc-strip">
        <li><Icon name="msg" /><span><b>{t("Tư vấn 1:1", "1:1 advice")}</b>{t("Zalo & hotline 8:00–21:00", "Zalo & hotline 8:00–21:00")}</span></li>
        <li><Icon name="truck" /><span><b>{t("Giao toàn quốc", "Nationwide delivery")}</b>{t("Freeship đơn từ 700k", "Free from 700k")}</span></li>
        <li><Icon name="layers" /><span><b>{t("Chứng nhận đầy đủ", "Fully certified")}</b>{t("Công bố, GMP, ISO 22000", "Declared, GMP, ISO 22000")}</span></li>
      </ul>
    </>
  );
}

/** Section sản phẩm theo mẫu banner Seagull: nền vân loang, tên lớn bên trái, hộp tách nền bên phải. */
function Showcase() {
  const { t } = useStore();
  return (
    <section className="sc">
      <div className="sc-in wrap">
        <div className="sc-tx rv">
          <h2><span>Mayqueen</span><em>Slim</em></h2>
          <i aria-hidden="true" />
          <p className="sc-sub">{t("Thảo mộc · Thon gọn", "Botanical · Slim")}</p>
          <p className="sc-note">{t("Bảo chứng bởi B.O.T Việt Nam", "Guaranteed by B.O.T Vietnam")}</p>
          <div className="cta-row sc-cta">
            <BuyBtn id="mq" vi="Mua ngay · 450.000đ" en="Buy now · 450,000đ" className="cream" />
            <Link className="sc-more" href="/san-pham/mq">{t("Xem chi tiết", "Details")}</Link>
          </div>
        </div>
        <Link href="/san-pham/mq" className="sc-prod rv" aria-label="Mayqueen Slim">
          <Image src="/img/v2/mayqueen-box.png" alt="Mayqueen Slim" width={699} height={850} sizes="(max-width: 900px) 60vw, 26vw" quality={90} />
        </Link>
      </div>
    </section>
  );
}

export function StoryHome() {
  return (
    <main id="top" className="v2">
      <HeroVideo />
      <Intro />
      <KLayers />
      <Transform />
      <Showcase />
      <Products />
      <KCompany />
      <ScrollFx />
      <div className="scroll-bar" aria-hidden="true" />
    </main>
  );
}
