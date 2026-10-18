"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { PRODUCTS, CONTACT, normalize, type Category } from "@/lib/products";
import { useStore } from "./providers";
import { Icon } from "./icons";
import { ProductCard } from "./product-card";

export type Filter = Category | "all";

/* ---------- Quick access ---------- */
const CATS: { key: Filter; img: string; vi: string; en: string }[] = [
  { key: "all", img: "/img/combo-open.jpg", vi: "Tất cả", en: "All products" },
  { key: "combo", img: "/img/duo-podium.jpg", vi: "Combo", en: "Combo" },
  { key: "mq", img: "/img/nguoi-khoe-dang-xinh.jpg", vi: "Mayqueen Slim", en: "Mayqueen Slim" },
  { key: "yd", img: "/img/yodetox-da.jpg", vi: "Yodetox Extra", en: "Yodetox Extra" },
];

export function QuickAccess({ cat, onCat }: { cat: Filter; onCat: (c: Filter) => void }) {
  const { t } = useStore();
  return (
    <nav className="cats" aria-label={t("Danh mục nhanh", "Quick access")}>
      {CATS.map((c) => (
        <button
          key={c.key}
          type="button"
          className="cat"
          aria-pressed={cat === c.key}
          onClick={() => {
            onCat(c.key);
            document.getElementById("san-pham")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="tile"><Image src={c.img} alt="" width={320} height={214} sizes="160px" /></span>
          <span>{t(c.vi, c.en)}</span>
        </button>
      ))}
      <a className="cat" href="#song-dep">
        <span className="tile"><Image src="/img/smoothie-bowl.jpg" alt="" width={320} height={214} sizes="160px" /></span>
        <span>{t("Sống đẹp", "Live well")}</span>
      </a>
    </nav>
  );
}

/* ---------- Top products carousel ---------- */
export function TopProducts() {
  const { t } = useStore();
  const track = useRef<HTMLDivElement>(null);
  const by = (d: number) => track.current?.scrollBy({ left: d, behavior: "smooth" });
  return (
    <section className="sec soft">
      <div className="wrap">
        <div className="head">
          <div>
            <h2 className="h2 rv">{t("Sản phẩm nổi bật", "Our top picks")}</h2>
            <p className="sub rv">{t("Được chọn nhiều nhất", "Most loved")}</p>
          </div>
          <div className="arrows">
            <button type="button" aria-label={t("Trước", "Previous")} onClick={() => by(-360)}><Icon name="left" /></button>
            <button type="button" aria-label={t("Sau", "Next")} onClick={() => by(360)}><Icon name="right" /></button>
          </div>
        </div>
        <div className="track" ref={track}>
          {PRODUCTS.filter((p) => p.top).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------- All products ---------- */
export function AllProducts({ cat, query, showAll, onShowAll }: { cat: Filter; query: string; showAll: boolean; onShowAll: () => void }) {
  const { t } = useStore();
  const q = normalize(query);
  // Mọi từ khoá đều phải có mặt (không phân biệt dấu, thứ tự)
  const words = q ? q.split(" ") : [];
  let list = PRODUCTS.filter((p) => {
    if (cat !== "all" && p.cat !== cat) return false;
    if (!words.length) return true;
    const hay = normalize(`${p.name} ${p.nameEn ?? ""} ${p.spec} ${p.specEn} ${p.tag} ${p.tagEn}`);
    return words.every((w) => hay.includes(w));
  });
  const truncated = !showAll && !q && cat === "all" && list.length > 8;
  if (truncated) list = list.slice(0, 8);
  return (
    <section className="sec" id="san-pham">
      <div className="wrap">
        <div className="center" style={{ marginBottom: 36 }}>
          <h2 className="h2 rv">{t("Tất cả sản phẩm", "Our products")}</h2>
          <p className="sub rv">{t("Thảo mộc lành tính, đủ hồ sơ công bố, bảo chứng bởi B.O.T Việt Nam.", "Herbal, declared safe, guaranteed by B.O.T Vietnam.")}</p>
        </div>
        {list.length ? (
          <div className="grid">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        ) : (
          <p className="sub center">{t("Không tìm thấy sản phẩm phù hợp. Thử từ khoá khác hoặc chọn danh mục.", "No matching product. Try another keyword or pick a category.")}</p>
        )}
        {truncated && (
          <div className="more">
            <button className="btn btn-line" type="button" onClick={onShowAll}>{t("Xem tất cả sản phẩm", "View all products")}</button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- Banners ---------- */
export function BannerCombo() {
  const { t, add, openCart } = useStore();
  return (
    <section className="sec" style={{ paddingBottom: 0 }}>
      <div className="banner b1 rv">
        <Image className="bgimg" src="/img/noi-long-vong-eo.jpg" alt="" width={900} height={900} sizes="40vw" />
        <div className="mid">
          <h2>{t("Combo Sáng – Tối", "Day–Night combo")}<br /><span className="accent">{t("Tiết kiệm 60K", "Save 60k")}</span></h2>
          <p>{t("Tặng thực đơn eat clean + coach Zalo 30 ngày", "Plus a free eat-clean menu and a 30-day Zalo coach")}</p>
          <button className="btn btn-white" type="button" onClick={() => { add("cb30"); openCart(); }}>{t("Mua ngay", "Get it now")}</button>
        </div>
        <div className="prod"><Image src="/img/combo-open.jpg" alt={t("Hộp quà combo", "Combo gift box")} width={600} height={600} sizes="300px" /></div>
      </div>
    </section>
  );
}

export function BannerFreeship() {
  const { t } = useStore();
  return (
    <section className="sec" style={{ paddingBottom: 0 }}>
      {/* Banner sáng: ảnh key visual Mayqueen Slim hiển thị trọn, chỉ thêm nhãn freeship + nút */}
      <div className="banner-light rv">
        <Image className="kv" src="/img/banner-mayqueen.jpg" alt={t("Key visual Mayqueen Slim: hộp, lọ và lá trà xanh", "Mayqueen Slim key visual: box, bottle and green tea leaves")} width={3148} height={1332} quality={90} sizes="(max-width: 760px) 100vw, 95vw" />
        <div className="kv-cta">
          <span className="kv-chip">{t("Freeship đơn từ 700k · toàn quốc", "Free shipping from 700k · nationwide")}</span>
          <a className="btn btn-dark" href="#san-pham">{t("Mua Mayqueen Slim · 450k", "Buy Mayqueen Slim · 450k")}</a>
        </div>
      </div>
    </section>
  );
}

export function BannerFeature() {
  const { t, add, openCart } = useStore();
  return (
    <section style={{ paddingBottom: "clamp(56px,6vw,96px)" }}>
      <div className="banner b3 rv">
        <Image className="bgimg" src="/img/giai-doan-3.jpg" alt="" width={900} height={900} sizes="45vw" />
        <div className="center-prod">
          <div className="prod"><Image src="/img/30-ngay-cung.jpg" alt="" width={300} height={400} sizes="150px" /></div>
          <div className="prod"><Image src="/img/gio-qua-tet.jpg" alt="" width={300} height={400} sizes="150px" /></div>
          <div className="prod"><Image src="/img/yodetox-da.jpg" alt="" width={300} height={400} sizes="150px" /></div>
        </div>
        <div className="r">
          <h2>{t("Combo", "Day–Night")}<br />{t("Sáng – Tối", "Combo")}</h2>
          <p>{t("Hai bước thảo mộc mỗi ngày, cho cơ thể nhẹ từ bên trong.", "Two herbal steps a day, for a lighter body from the inside out.")}</p>
          <button className="btn btn-white" type="button" onClick={() => { add("cb30"); openCart(); }}>{t("Mua ngay", "Save now")}</button>
        </div>
        <div className="pills">
          <div><Icon name="leaf" /><span>{t("Thảo mộc", "Herbal")}<small>{t("Thành phần lành tính", "Gentle ingredients")}</small></span></div>
          <div><Icon name="shield" /><span>B.O.T<small>{t("Đủ hồ sơ công bố", "Declared safe")}</small></span></div>
          <div><Icon name="sun" /><span>{t("Sáng", "Morning")}<small>Mayqueen Slim</small></span></div>
          <div><Icon name="moon" /><span>{t("Tối", "Night")}<small>Yodetox Extra</small></span></div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why ---------- */
const FEATS = [
  { icon: "shield", vi: ["Bảo chứng B.O.T Việt Nam", "Nguồn gốc rõ ràng, đầy đủ hồ sơ công bố an toàn theo quy chuẩn y tế."], en: ["B.O.T guaranteed", "Clear origin and full product safety declarations under health regulations."] },
  { icon: "leaf", vi: ["Thảo mộc lành tính", "Thành phần tự nhiên, không nhịn ăn, không “xả” cấp tốc."], en: ["Gentle herbs", "Natural ingredients, no starving, no laxative shock."] },
  { icon: "layers", vi: ["Tác động kép", "Sáng đốt mỡ, tối thải độc. Dáng gọn đi cùng sức khoẻ bền vững."], en: ["Two-way action", "Burn by day, cleanse by night, for a slim shape with lasting health."] },
  { icon: "truck", vi: ["Giao nhanh, kín đáo", "Toàn quốc 1–4 ngày, COD, kiểm hàng rồi trả tiền."], en: ["Fast & discreet", "1–4 days nationwide, COD, inspect before you pay."] },
];

export function Why() {
  const { t, lang } = useStore();
  return (
    <section className="sec soft" id="ve-chung-toi" style={{ marginTop: "clamp(56px,6vw,96px)" }}>
      <div className="wrap why">
        <div className="ph rv"><Image quality={90} src="/img/noi-long-vong-eo.jpg" alt={t("Cô gái cầm lọ Mayqueen Slim trong bếp", "Woman holding a Mayqueen Slim bottle in the kitchen")} width={900} height={900} sizes="(max-width: 1100px) 100vw, 50vw" /></div>
        <div>
          <h2 className="h2 rv">{t("Vì sao chọn Mayqueen?", "Why Mayqueen?")}</h2>
          <p className="sub rv">{t("Thương hiệu wellness D2C theo tinh thần The Beauty Chef: mua sắm tiện lợi, câu chuyện ấm áp, cảm hứng sống đẹp mỗi ngày.", "A D2C wellness brand in the spirit of The Beauty Chef: easy shopping, a warm brand story and inspiration for living well.")}</p>
          <div className="feats">
            {FEATS.map((f) => {
              const [h, p] = lang === "en" ? f.en : f.vi;
              return (
                <div className="feat rv" key={f.icon}>
                  <div className="fi"><Icon name={f.icon} /></div>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Community (bài thật từ fanpage) ---------- */
const POSTS = [
  { img: "/img/che-ngu-con-doi-gia.jpg", vi: ["Bí quyết chế ngự “cơn đói giả”", "Khát hay đói? Phân biệt thế nào."], en: ["Taming false hunger", "Thirsty or hungry? Tell the difference."] },
  { img: "/img/noi-khong-tang-can.jpg", vi: ["Nói KHÔNG với “tăng cân lại”", "Giữ dáng sau liệu trình thế nào."], en: ["Say no to rebound weight", "How to keep your shape after the course."] },
  { img: "/img/30-ngay-lay-lai.jpg", vi: ["30 ngày lấy lại vóc dáng", "Liệu trình 30 ngày hoạt động thế nào."], en: ["30 days to get your shape back", "The 30-day course, explained."] },
  { img: "/img/con-doi-ao.jpg", vi: ["Tạm biệt cơn đói ảo", "Ổn định đường huyết, kiểm soát thèm ăn."], en: ["Goodbye phantom hunger", "Steady blood sugar, fewer cravings."] },
  { img: "/img/nguoi-khoe-dang-xinh.jpg", vi: ["Người khoẻ, dáng xinh", "Đẹp bền từ bên trong."], en: ["Healthy body, pretty shape", "Lasting beauty from the inside."] },
  { img: "/img/kiem-soat-them-an.jpg", vi: ["Kiểm soát cơn thèm ăn khoa học", "0,5–1 kg mỗi tuần là tốc độ an toàn."], en: ["Manage cravings scientifically", "0.5–1 kg a week is a safe pace."] },
  { img: "/img/bo-ba-quyen-luc.jpg", vi: ["Bộ ba “quyền lực” thay đổi vóc dáng", "Kiểm soát đầu vào, hạn chế tích mỡ, đốt mỡ tự thân."], en: ["The power trio for your shape", "Control intake, limit fat storage, burn fat."] },
  { img: "/img/3-tin-hieu.jpg", vi: ["3 tín hiệu cảnh báo giữ dáng sai", "Nhận ra sớm để điều chỉnh kịp."], en: ["3 warning signs you're doing it wrong", "Spot them early and adjust."] },
  { img: "/img/giam-ki-giam-mo.jpg", vi: ["Giảm “kí” ≠ giảm mỡ", "Vì sao cái cân hay “nói dối”."], en: ["Losing kilos ≠ losing fat", "Why the scale can lie."] },
];

const COMM_MOBILE_LIMIT = 3;

export function Community() {
  const { t, lang } = useStore();
  const [open, setOpen] = useState(false);
  return (
    <section className="sec soft">
      <div className="wrap center">
        <h2 className="h2 rv">{t("Mới trên Facebook Mayqueen", "On our Facebook")}</h2>
        <p className="sub rv">{t("Mẹo hay và câu chuyện từ fanpage Mayqueen.", "Tips and stories from the Mayqueen page.")}</p>
        <div className={`comm${open ? " open" : ""}`} id="comm-list">
          {POSTS.map((p, i) => {
            const [h, d] = lang === "en" ? p.en : p.vi;
            return (
              <a className={`post rv${i >= COMM_MOBILE_LIMIT ? " more-item" : ""}`} key={p.img} href={CONTACT.facebook} target="_blank" rel="noopener">
                <Image src={p.img} alt="" width={240} height={240} sizes="96px" />
                <div>
                  <h3>{h}</h3>
                  <p>{d}</p>
                  <span className="src"><Icon name="fb" size={14} />Facebook</span>
                </div>
              </a>
            );
          })}
        </div>
        {/* Chỉ hiện trên mobile: rút gọn còn 3 bài */}
        <button type="button" className="btn btn-line comm-more" aria-expanded={open} aria-controls="comm-list" onClick={() => setOpen((o) => !o)}>
          {open ? t("Thu gọn", "Show less") : t(`Xem thêm ${POSTS.length - COMM_MOBILE_LIMIT} bài`, `Show ${POSTS.length - COMM_MOBILE_LIMIT} more`)}
          <Icon name="down" size={16} className={`ic${open ? " flip" : ""}`} />
        </button>
      </div>
    </section>
  );
}

/* ---------- Live well ---------- */
export function LiveWell() {
  const { t } = useStore();
  return (
    <section className="sec" id="song-dep">
      <div className="wrap">
        <div className="head">
          <div>
            <h2 className="h2 rv">{t("Sống đẹp cùng Mayqueen", "Live well with Mayqueen")}</h2>
            <p className="sub rv">{t("Cẩm nang lifestyle, thực đơn eat clean và bí quyết giữ dáng.", "Lifestyle tips, eat-clean menus and ways to keep in shape.")}</p>
          </div>
          <a className="btn btn-dark rv" href={CONTACT.facebook} target="_blank" rel="noopener">{t("Tất cả bài viết", "All articles")}</a>
        </div>
        <div className="blog">
          <a className="bcard big rv" href={CONTACT.facebook} target="_blank" rel="noopener">
            <div className="ph"><Image quality={90} src="/img/lay-lai-voc-dang.jpg" alt={t("Bữa ăn cá hồi, gạo lứt", "Salmon and brown rice meal")} width={900} height={900} sizes="(max-width: 1100px) 100vw, 40vw" /></div>
            <span className="k">{t("Thực đơn eat clean", "Eat-clean menu")}</span>
            <h3>{t("Lấy lại vóc dáng không mệt mỏi", "Get your shape back, stress-free")}</h3>
          </a>
          <a className="bcard rv" href={CONTACT.facebook} target="_blank" rel="noopener">
            <div className="ph"><Image src="/img/vua-an-xong-doi.jpg" alt="" width={900} height={900} sizes="(max-width: 760px) 100vw, 28vw" /></div>
            <span className="k">{t("Kiến thức", "Knowledge")}</span>
            <h3>{t("Vừa ăn xong lại thấy đói?", "Hungry right after eating?")}</h3>
          </a>
          <a className="bcard rv" href={CONTACT.facebook} target="_blank" rel="noopener">
            <div className="ph"><Image src="/img/tam-biet-bua-xa.jpg" alt="" width={900} height={900} sizes="(max-width: 760px) 100vw, 28vw" /></div>
            <span className="k">Detox</span>
            <h3>{t("Tạm biệt bữa ăn “xả”", "Goodbye cheat meals")}</h3>
          </a>
          <a className="bcard rv" href={CONTACT.facebook} target="_blank" rel="noopener">
            <div className="ph"><Image src="/img/an-qua-it.jpg" alt="" width={900} height={900} sizes="(max-width: 760px) 100vw, 28vw" /></div>
            <span className="k">{t("Kiến thức", "Knowledge")}</span>
            <h3>{t("Ăn quá ít có giúp giảm mỡ?", "Does eating too little burn fat?")}</h3>
          </a>
          <a className="bcard rv" href={CONTACT.facebook} target="_blank" rel="noopener">
            <div className="ph"><Image src="/img/sau-tuoi-30.jpg" alt="" width={900} height={900} sizes="(max-width: 760px) 100vw, 28vw" /></div>
            <span className="k">{t("Kiến thức", "Knowledge")}</span>
            <h3>{t("Vì sao sau tuổi 30 cân nặng khó kiểm soát?", "Why is weight harder to control after 30?")}</h3>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Liệu trình 30 ngày (3 giai đoạn, nội dung từ tư liệu B.O.T) ---------- */
const STAGES = [
  { img: "/img/giai-doan-1.jpg", days: ["0–15 ngày", "Days 0–15"], vi: ["Giai đoạn 1", "Cảm giác thèm đồ ngọt, ăn vặt dịu lại. Giấc ngủ sâu hơn, dễ vào giấc hơn."], en: ["Stage 1", "Sweet cravings and snacking ease off. Deeper, easier sleep."] },
  { img: "/img/giai-doan-2.jpg", days: ["15–30 ngày", "Days 15–30"], vi: ["Giai đoạn 2", "Cơn đói “ảo” do cảm xúc giảm rõ. Vòng bụng bắt đầu nhỏ và săn hơn, tinh thần tỉnh táo."], en: ["Stage 2", "Emotional hunger fades. The waist starts to firm up, the mind feels clearer."] },
  { img: "/img/giai-doan-3.jpg", days: ["Từ ngày 30", "From day 30"], vi: ["Giai đoạn 3", "Khuôn mặt, thân hình gọn gàng hơn. Quần áo rộng hơn ở vòng eo, tâm trạng tích cực."], en: ["Stage 3", "A leaner face and body. Clothes feel looser at the waist, mood lifts."] },
];

export function Journey() {
  const { t, lang, openImage } = useStore();
  return (
    <section className="sec" id="lieu-trinh">
      <div className="wrap">
        <div className="head">
          <div>
            <h2 className="h2 rv">{t("30 ngày cùng Mayqueen diễn ra thế nào?", "What 30 days with Mayqueen look like")}</h2>
            <p className="sub rv">{t("Ba giai đoạn cơ thể thay đổi khi dùng đều mỗi sáng. Hiệu quả tuỳ cơ địa.", "Three stages your body goes through with a daily morning routine. Results vary.")}</p>
          </div>
        </div>
        <ol className="stages">
          {STAGES.map((st, i) => {
            const [h, d] = lang === "en" ? st.en : st.vi;
            return (
              <li className="stage rv" key={st.img}>
                <button type="button" className="ph zoomable" aria-label={t("Xem ảnh lớn", "View large image")} onClick={() => openImage(st.img, h)}>
                  <Image src={st.img} alt="" width={900} height={900} quality={90} sizes="(max-width: 760px) 100vw, 33vw" />
                </button>
                <div className="stage-body">
                  <span className="stage-n">{i + 1}</span>
                  <div>
                    <span className="k">{t(st.days[0], st.days[1])}</span>
                    <h3>{h}</h3>
                    <p>{d}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Dải ảnh lifestyle chạy ngang ---------- */
const GALLERY = [
  "/img/life-tui-xach.jpg", "/img/life-dot-calo.jpg", "/img/life-cham-soc.jpg", "/img/life-tet-dien-mao.jpg",
  "/img/30-ngay-cung.jpg", "/img/life-dep-ben-ngoai.jpg", "/img/life-ao-dai.jpg", "/img/cai-thien-ben-vung.jpg",
  "/img/life-don-nha.jpg", "/img/life-banh-chung.jpg", "/img/life-tu-thuong.jpg", "/img/life-giam-beo-tet.jpg",
];

export function Gallery() {
  const { t, openImage } = useStore();
  const items = [...GALLERY, ...GALLERY];
  return (
    <section className="gallery" aria-label={t("Mayqueen trong đời sống", "Mayqueen in daily life")}>
      <div className="wrap center">
        <h2 className="h2 rv">{t("Mayqueen trong đời sống", "Mayqueen in daily life")}</h2>
        <p className="sub rv">{t("Trong túi xách, trên bàn ăn, dịp Tết hay buổi tập. Theo dõi fanpage để xem thêm.", "In your bag, on the table, at Tết or at the gym. Follow the page for more.")}</p>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {items.map((src, i) => (
            <button type="button" className="zoomable" key={i} aria-label={t("Xem ảnh lớn", "View large image")} tabIndex={i < GALLERY.length ? 0 : -1} aria-hidden={i >= GALLERY.length} onClick={() => openImage(src)}>
              <Image src={src} alt="" width={600} height={600} sizes="260px" loading="eager" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
