"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useStore } from "./providers";
import { Icon } from "./icons";
import { CONTACT, PRODUCTS, formatVnd } from "@/lib/products";
import { POSTS as ARTICLES } from "@/lib/posts";
import { HERO_VIDEO, TRANSFORM } from "@/lib/media";
import { flyToCart } from "@/lib/motion";

/* Trang chủ v2 kể chuyện theo phong cách Kobler: mỗi khối gần trọn màn hình, hiệu ứng theo cuộn.
   Chữ trong [ … ] là chỗ chờ khách gửi thông tin thật, không tự điền. */

const DISCLAIMER: [string, string] = [
  "Thực phẩm này không phải là thuốc, không có tác dụng thay thế thuốc chữa bệnh.",
  "This product is not a medicine and does not replace medical treatment.",
];

/** Nhãn đánh dấu nội dung mẫu, để khách không đưa lên chạy thật. */
function Sample({ dark }: { dark?: boolean }) {
  const { t } = useStore();
  return <span className={`sample${dark ? " dk" : ""}`}>{t("Nội dung mẫu", "Sample content")}</span>;
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
  const { t, add, openCart } = useStore();
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
      <div className="hv-shade" />
      {HERO_VIDEO.isDemo && <span className="hv-tag">{t("Video minh hoạ", "Illustrative video")}</span>}
      <div className="wrap hv-body">
        <p className="kick hv-in">Mayqueen Slim · Yodetox Extra</p>
        <Title as="h1" className="hv-in" a={t("Sáng đốt mỡ", "Burn by day")} b={t("Tối thanh lọc", "Cleanse by night")} />
        <p className="hv-sub hv-in">{t("Thon gọn từ bên trong với nghi thức thảo mộc Sáng – Tối, không nhịn ăn, nhẹ nhàng mỗi ngày.", "Slim from within with a herbal day–night ritual. No starving, gentle every day.")}</p>
        <div className="hv-cta hv-in">
          <button type="button" className="btn-solid" onClick={() => { add("cb30"); openCart(); }}>{t("Mua combo", "Buy combo")}</button>
          <a className="btn-ln" href="#lien-he">{t("Tư vấn miễn phí", "Free consultation")} <Arrow /></a>
        </div>
      </div>
      <div className="hv-ctl">
        <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? t("Bật tiếng", "Unmute") : t("Tắt tiếng", "Mute")} aria-pressed={!muted}>
          <svg viewBox="0 0 24 24" className="ic"><path d="M4 9h4l5-4v14l-5-4H4z" />{muted ? <path d="m16 9 5 6M21 9l-5 6" /> : <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />}</svg>
        </button>
        <button type="button" onClick={togglePlay} aria-label={paused ? t("Phát video", "Play video") : t("Tạm dừng video", "Pause video")}>
          <svg viewBox="0 0 24 24" className="ic">{paused ? <path d="M8 5v14l11-7z" /> : <path d="M9 5v14M15 5v14" />}</svg>
        </button>
      </div>
      <p className="hv-disc">{t(...DISCLAIMER)}</p>
    </section>
  );
}

/* ---------- Đoạn biến hình: ảnh trước → sau theo cuộn ---------- */
function Transform() {
  const { t } = useStore();
  return (
    <section className="tf" data-sticky aria-label={t("Hành trình tự tin", "A confident journey")}>
      <div className="tf-pin">
        <div className="tf-img tf-before"><Image src={TRANSFORM.before} alt="" fill sizes="100vw" quality={80} /></div>
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
            <p>{t("Nhẹ nhõm hơn, khoẻ khoắn hơn, và thoải mái trong từng bộ trang phục yêu thích.", "Lighter, more energetic, and at ease in the outfits you love.")}</p>
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

function Story() {
  const { t } = useStore();
  return (
    <>
      <section className="st" id="cau-chuyen">
        <div className="st-bg" data-px="-0.08"><Image src="/img/v2/story-field.jpg" alt="" fill sizes="100vw" quality={80} /></div>
        <div className="wrap st-body">
          <div className="rv"><Sample dark /></div>
          <Title className="rv" a={t("Thon gọn từ bên trong", "Slim from within")} b={t("Vẻ đẹp khởi nguồn từ thảo mộc", "Beauty rooted in botanicals")} />
          <div className="st-copy rv">
            <p>{t("Mayqueen bắt đầu từ một câu hỏi giản dị: làm sao để người phụ nữ Việt giữ được vóc dáng mà không phải đánh đổi những bữa cơm gia đình, giấc ngủ ngon hay niềm vui mỗi ngày?", "Mayqueen began with a simple question: how can Vietnamese women keep their shape without giving up family meals, good sleep or everyday joy?")}</p>
            <p>{t("Chúng tôi tìm câu trả lời trong kho tàng thảo mộc phương Đông, những lá, rễ, hạt đã gắn bó với đời sống người Việt qua nhiều thế hệ, và chắt lọc thành một nghi thức nhẹ nhàng: sáng khởi động, tối thanh lọc.", "We found the answer in Eastern botanicals, leaves, roots and seeds woven into Vietnamese life for generations, distilled into a gentle ritual: wake up by day, cleanse by night.")}</p>
            <p>{t("Từ năm [năm thành lập], B.O.T Việt Nam theo đuổi triết lý chăm sóc chậm mà bền: lắng nghe cơ thể, tôn trọng nhịp sinh học, để vẻ đẹp đến tự nhiên và ở lại lâu hơn.", "Since [founding year], B.O.T Vietnam has pursued slow, lasting care: listen to the body, respect its rhythm, and let beauty arrive naturally and stay longer.")}</p>
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
          <div className="rv"><Sample /></div>
          <span className="qt-mark rv" aria-hidden="true">“</span>
          <blockquote className="rv">{t("Vẻ đẹp thật sự không đến từ sự khắc nghiệt với bản thân. Nó đến khi ta biết lắng nghe và chăm sóc cơ thể mình, mỗi sáng và mỗi tối.", "True beauty doesn't come from being harsh on yourself. It comes when we listen to and care for our body, every morning and every night.")}</blockquote>
          <figcaption className="rv">
            <span className="sign">[Chữ ký]</span>
            <b>[{t("Họ và tên Chủ tịch", "Chairperson's full name")}]</b>
            <small>{t("Chủ tịch", "Chairperson")} · [{t("Tên công ty", "Company name")}]</small>
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

function Products() {
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
                  <ul>{s.pts.map((x) => <li key={x[0]}><Icon name="leaf" size={15} />{t(x[0], x[1])}</li>)}</ul>
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
            <p>{t(combo.spec, combo.specEn)}</p>
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
// Chữ mẫu: sale điền bảng thành phần thật từ vỏ hộp / hồ sơ công bố. Không tự bịa.
const ING = {
  mq: { n: 8, img: "/img/mayqueen-leaf.jpg", name: "Mayqueen Slim", when: ["Buổi sáng", "Morning"] },
  yd: { n: 6, img: "/img/yodetox-da.jpg", name: "Yodetox Extra", when: ["Buổi tối", "Evening"] },
} as const;

function Ingredients() {
  const { t } = useStore();
  const [tab, setTab] = useState<keyof typeof ING>("mq");
  const cur = ING[tab];
  const items = Array.from({ length: cur.n }, (_, i) => i);
  return (
    <section className="ig" id="thanh-phan" data-sticky style={{ ["--n" as string]: cur.n, ["--rows" as string]: Math.ceil(cur.n / 2) }}>
      <div className="ig-pin">
        <div className="wrap ig-head">
          <div>
            <Title a={t(`${cur.n} lớp thảo mộc`, `${cur.n} botanical layers`)} b={t("Trong từng liệu trình", "In every course")} />
            <p className="ig-note">{t("Bảng thành phần đang chờ khách cung cấp từ vỏ hộp / hồ sơ công bố.", "Ingredient list pending from the packaging / registration dossier.")} <Sample /></p>
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
        <div className="ig-stage" key={tab}>
          <div className="ig-core"><Image src={cur.img} alt={cur.name} fill sizes="(max-width: 900px) 70vw, 30vw" quality={85} /></div>
          <ol className="ig-layers">
            {items.map((i) => (
              <li key={i} style={{ ["--i" as string]: i, ["--row" as string]: Math.floor(i / 2) }} className={i % 2 ? "r" : "l"}>
                <span className="ig-num">{String(i + 1).padStart(2, "0")}</span>
                <b>[{t("Thành phần", "Ingredient")} {i + 1}]</b>
                <span>[{t("công dụng", "benefit")}]</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- Khối 4: Chứng nhận ---------- */
const CERTS = [
  { img: "/img/v2/cert-cong-bo.jpg", n: ["Giấy tiếp nhận đăng ký bản công bố sản phẩm", "Product declaration receipt"] },
  { img: "/img/v2/cert-quang-cao.jpg", n: ["Giấy xác nhận nội dung quảng cáo", "Advertising content approval"] },
  { img: "/img/v2/cert-gmp.jpg", n: ["Chứng nhận GMP nhà máy (nếu có)", "Factory GMP certificate (if any)"] },
  { img: "/img/v2/cert-iso.jpg", n: ["Chứng nhận ISO nhà máy (nếu có)", "Factory ISO certificate (if any)"] },
  { img: "/img/v2/cert-giay-phep.jpg", n: ["Giấy phép kinh doanh B.O.T Việt Nam", "B.O.T Vietnam business licence"] },
  { img: "/img/v2/cert-kiem-nghiem.jpg", n: ["[Chứng nhận khác]", "[Other certificate]"] },
];

const STATS: { v?: number; s?: string; u: [string, string]; l: [string, string] }[] = [
  { v: 30, u: ["viên", "caps"], l: ["Mỗi lọ Mayqueen Slim", "Per Mayqueen Slim bottle"] },
  { v: 30, u: ["gói", "sachets"], l: ["Mỗi hộp Yodetox Extra", "Per Yodetox Extra box"] },
  { v: 2, u: ["bước", "steps"], l: ["Sáng – Tối mỗi ngày", "Day and night"] },
  { s: "VN", u: ["", ""], l: ["Sản xuất tại Việt Nam", "Made in Vietnam"] },
];

function Certs() {
  const { t, openImage } = useStore();
  return (
    <section className="ct" id="chung-nhan">
      <div className="ct-bg" data-px="0.06" />
      <div className="wrap">
        <Title className="rv center" a={t("Niềm tin", "Trust")} b={t("Tạo nên lựa chọn", "Behind every choice")} />
        <div className="ct-grid">
          {CERTS.map((c) => (
            <button type="button" key={c.img} className="ct-card rv" onClick={() => openImage(c.img, `${t(c.n[0], c.n[1])} · ${t("Ảnh minh hoạ", "Illustrative image")}`)}>
              <span className="ct-ph"><Image src={c.img} alt="" width={420} height={594} sizes="(max-width: 760px) 45vw, 16vw" /><em>{t("Ảnh minh hoạ", "Illustrative")}</em></span>
              <b>{t(c.n[0], c.n[1])}</b>
              <small>[{t("Đơn vị cấp", "Issued by")}]</small>
              <span className="ct-zoom"><Icon name="search" size={14} />{t("Phóng to", "Zoom")}</span>
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

function Reviews() {
  const { t } = useStore();
  const track = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const go = (i: number) => {
    const el = track.current;
    const card = el?.children[Math.max(0, Math.min(REVIEWS.length - 1, i))] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const w = (el.children[0] as HTMLElement).offsetWidth;
    setIdx(Math.round(el.scrollLeft / w));
  };
  return (
    <section className="rvw" id="cam-nhan">
      <div className="wrap">
        <div className="rvw-head">
          <div>
            <Title className="rv" a={t("Cảm nhận", "In their words")} b={t("Từ khách hàng", "Our customers")} />
            <p className="rv">{t("Ảnh và lời cảm nhận tạo bằng AI để xem bố cục. Bản final thay bằng tin nhắn, video khách thật.", "AI-made photos and quotes for layout preview only. Final version uses real customer messages and videos.")}</p>
          </div>
          <div className="rvw-arrows">
            <button type="button" aria-label={t("Trước", "Previous")} onClick={() => go(idx - 1)} disabled={idx === 0}><Icon name="left" /></button>
            <button type="button" aria-label={t("Sau", "Next")} onClick={() => go(idx + 1)} disabled={idx >= REVIEWS.length - 1}><Icon name="right" /></button>
          </div>
        </div>
        <div className="rvw-track" ref={track} onScroll={onScroll} data-lenis-prevent-wheel>
          {REVIEWS.map((r) => (
            <article className="rvw-card" key={r.n}>
              <div className="rvw-ph"><Image src={r.img} alt="" fill sizes="(max-width: 760px) 85vw, 30vw" quality={80} /><Sample dark /></div>
              <div className="rvw-tx">
                <div className="stars" aria-label={t("5 trên 5 sao", "5 out of 5 stars")}>★★★★★</div>
                <blockquote>“{t(r.q[0], r.q[1])}”</blockquote>
                <b>{r.n}</b>
                <small>{t(r.r[0], r.r[1])}</small>
              </div>
            </article>
          ))}
        </div>
        <div className="rvw-dots">
          {REVIEWS.map((r, i) => <button key={r.n} type="button" aria-label={`${i + 1}`} aria-current={i === idx} onClick={() => go(i)} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------- Sống đẹp cùng Mayqueen (blog) ---------- */
function LiveWellV2() {
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

function Consult() {
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

export function StoryHome() {
  return (
    <main id="top" className="v2">
      <HeroVideo />
      <Transform />
      <Story />
      <Products />
      <Ingredients />
      <Certs />
      <Reviews />
      <LiveWellV2 />
      <Consult />
      <ScrollFx />
    </main>
  );
}
