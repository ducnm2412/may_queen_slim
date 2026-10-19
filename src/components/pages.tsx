"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CONTACT, PRODUCT_BY_ID, formatVnd } from "@/lib/products";
import { POSTS, POST_BY_SLUG, type L } from "@/lib/posts";
import { POLICIES, POLICY_BY_SLUG } from "@/lib/policies";
import { useStore } from "./providers";
import { Icon } from "./icons";
import { PageHead } from "./page-head";
import { AllProducts, BannerFeature, Journey, Personas, Why, type Filter } from "./sections";
import { Contact } from "./contact";

/* ======================= Sản phẩm ======================= */
export function ShopPage() {
  const { query } = useStore();
  const [cat, setCat] = useState<Filter>("all");
  return (
    <main className="page">
      <PageHead
        crumbs={[{ label: ["Sản phẩm", "Products"] }]}
        title={["Sản phẩm Mayqueen", "Mayqueen products"]}
        sub={["Thảo mộc lành tính, đủ hồ sơ công bố, bảo chứng bởi B.O.T Việt Nam. Freeship đơn từ 700k.", "Gentle herbs, fully declared, guaranteed by B.O.T Vietnam. Free shipping from 700k."]}
      />
      <AllProducts head={false} cat={cat} onCat={setCat} query={query} showAll onShowAll={() => {}} />
      <TrustStrip />
      <BannerFeature />
    </main>
  );
}

function TrustStrip() {
  const { t } = useStore();
  const items: { icon: string; h: L; p: L }[] = [
    { icon: "shield", h: ["Bảo chứng B.O.T", "B.O.T guaranteed"], p: ["Đủ hồ sơ công bố an toàn", "Fully safety-declared"] },
    { icon: "truck", h: ["Giao 1–4 ngày", "1–4 day delivery"], p: ["Freeship đơn từ 700k", "Free from 700k"] },
    { icon: "check", h: ["Kiểm hàng rồi trả tiền", "Inspect, then pay"], p: ["COD hoặc chuyển khoản", "COD or bank transfer"] },
    { icon: "msg", h: ["Tư vấn 1:1 qua Zalo", "1:1 Zalo advice"], p: ["8:00–21:00 mỗi ngày", "8:00–21:00 daily"] },
  ];
  return (
    <section className="wrap trust">
      {items.map((it) => (
        <div key={it.icon} className="trust-item">
          <span className="fi"><Icon name={it.icon} /></span>
          <div><b>{t(...it.h)}</b><span>{t(...it.p)}</span></div>
        </div>
      ))}
    </section>
  );
}

/* ======================= Về chúng tôi ======================= */
export function AboutPage() {
  const { t } = useStore();
  return (
    <main className="page">
      <PageHead
        crumbs={[{ label: ["Về chúng tôi", "About us"] }]}
        title={["Câu chuyện Mayqueen", "The Mayqueen story"]}
        sub={["Thương hiệu wellness D2C của B.O.T Việt Nam, giúp người Việt giữ dáng nhẹ nhàng và bền vững từ thảo mộc.", "A D2C wellness brand by B.O.T Vietnam, helping people stay in shape gently and sustainably with herbs."]}
      />
      <section className="wrap story">
        <div className="story-ph">
          <Image src="/img/nguoi-khoe-dang-xinh.jpg" alt={t("Lọ Mayqueen Slim giữa lá trà xanh", "A Mayqueen Slim bottle among green tea leaves")} width={900} height={900} quality={90} sizes="(max-width: 1100px) 100vw, 45vw" priority />
        </div>
        <div className="story-txt">
          <h2 className="h2">{t("Đẹp từ bên trong, không phải bằng mọi giá", "Beauty from within, not at any cost")}</h2>
          <p>{t("Mayqueen ra đời từ một điều chúng tôi thấy quá thường xuyên: người trẻ nhịn ăn, uống thuốc xả cấp tốc, giảm được vài cân rồi tăng lại nhanh hơn, kèm theo mệt mỏi và mất tự tin.", "Mayqueen was born from something we saw too often: young people starving themselves or taking harsh flush products, losing a few kilos and regaining them faster, along with fatigue and lost confidence.")}</p>
          <p>{t("Chúng tôi chọn một hướng khác: hai bước thảo mộc mỗi ngày. Buổi sáng Mayqueen Slim hỗ trợ chuyển hoá mỡ và kiểm soát cơn thèm ăn. Buổi tối Yodetox Extra thanh lọc dịu nhẹ. Đi cùng là thực đơn eat clean và người đồng hành qua Zalo.", "We chose a different path: two herbal steps a day. In the morning Mayqueen Slim supports fat metabolism and curbs cravings. At night Yodetox Extra gently cleanses. Alongside come an eat-clean menu and a Zalo coach.")}</p>
          <p>{t("Sản phẩm do B.O.T Việt Nam sản xuất, nguồn gốc rõ ràng và có đầy đủ hồ sơ công bố an toàn theo quy chuẩn y tế.", "Products are made by B.O.T Vietnam with clear origin and full safety declarations under health regulations.")}</p>
          <dl className="story-facts">
            <div><dt>30</dt><dd>{t("ngày mỗi liệu trình", "days per course")}</dd></div>
            <div><dt>2</dt><dd>{t("bước thảo mộc mỗi ngày", "herbal steps a day")}</dd></div>
            <div><dt>0</dt><dd>{t("ngày phải nhịn đói", "days of starving")}</dd></div>
          </dl>
        </div>
      </section>
      <Why />
      <Personas />
      <Journey />
      <section className="wrap">
        <div className="cta-band">
          <div>
            <h2>{t("Bắt đầu liệu trình 30 ngày", "Start your 30-day course")}</h2>
            <p>{t("Chưa chắc chọn sản phẩm nào? Chuyên viên tư vấn miễn phí qua Zalo trong 15 phút.", "Not sure where to start? Get free advice on Zalo within 15 minutes.")}</p>
          </div>
          <div className="cta-band-btns">
            <Link className="btn btn-white" href="/san-pham/cb30">{t("Xem Combo Sáng – Tối", "See the Day–Night combo")}</Link>
            <Link className="btn btn-ghost" href="/lien-he">{t("Nhận tư vấn", "Get advice")}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ======================= Sống đẹp ======================= */
export function BlogIndex() {
  const { t, lang } = useStore();
  const cats = Array.from(new Map(POSTS.map((p) => [p.cat[0], p.cat])).values());
  const [cat, setCat] = useState<string>("all");
  const list = cat === "all" ? POSTS : POSTS.filter((p) => p.cat[0] === cat);
  return (
    <main className="page">
      <PageHead
        crumbs={[{ label: ["Sống đẹp", "Live well"] }]}
        title={["Sống đẹp cùng Mayqueen", "Live well with Mayqueen"]}
        sub={["Cẩm nang lifestyle, thực đơn eat clean và bí quyết giữ dáng an toàn, dễ áp dụng mỗi ngày.", "Lifestyle tips, eat-clean menus and safe, everyday ways to keep in shape."]}
      >
        <div className="filter-cats blog-cats" role="group" aria-label={t("Chủ đề", "Topics")}>
          <button type="button" className="fchip" aria-pressed={cat === "all"} onClick={() => setCat("all")}>{t("Tất cả", "All")}<span className="fcount">{POSTS.length}</span></button>
          {cats.map((c) => (
            <button key={c[0]} type="button" className="fchip" aria-pressed={cat === c[0]} onClick={() => setCat(c[0])}>
              {lang === "en" ? c[1] : c[0]}
              <span className="fcount">{POSTS.filter((p) => p.cat[0] === c[0]).length}</span>
            </button>
          ))}
        </div>
      </PageHead>
      <section className="wrap">
        <div className="post-grid">
          {list.map((p, i) => <PostCard key={p.slug} slug={p.slug} big={i === 0 && cat === "all"} />)}
        </div>
      </section>
    </main>
  );
}

function PostCard({ slug, big = false }: { slug: string; big?: boolean }) {
  const { t } = useStore();
  const p = POST_BY_SLUG[slug];
  return (
    <Link className={`post-card${big ? " big" : ""}`} href={`/song-dep/${p.slug}`}>
      <div className="ph"><Image src={p.img} alt="" width={900} height={900} quality={big ? 90 : 75} sizes={big ? "(max-width: 760px) 100vw, 60vw" : "(max-width: 760px) 100vw, 33vw"} /></div>
      <div className="post-card-body">
        <span className="k">{t(...p.cat)} · {p.minutes} {t("phút đọc", "min read")}</span>
        <h3>{t(...p.title)}</h3>
        <p>{t(...p.excerpt)}</p>
      </div>
    </Link>
  );
}

export function BlogArticle({ slug }: { slug: string }) {
  const { t, add, openCart, openImage } = useStore();
  const p = POST_BY_SLUG[slug];
  const combo = PRODUCT_BY_ID.cb30;
  const related = POSTS.filter((x) => x.slug !== slug).slice(0, 3);
  return (
    <main className="page">
      <article className="article wrap">
        <nav className="crumbs" aria-label={t("Đường dẫn", "Breadcrumb")}>
          <Link href="/">{t("Trang chủ", "Home")}</Link>
          <span aria-hidden="true">/</span>
          <Link href="/song-dep">{t("Sống đẹp", "Live well")}</Link>
        </nav>
        <span className="k">{t(...p.cat)} · {p.minutes} {t("phút đọc", "min read")}</span>
        <h1 className="article-title">{t(...p.title)}</h1>
        <p className="article-lead">{t(...p.excerpt)}</p>
        <button type="button" className="article-ph zoomable" aria-label={t("Xem ảnh lớn", "View large image")} onClick={() => openImage(p.img, t(...p.title))}>
          <Image src={p.img} alt="" width={1200} height={1200} quality={90} priority sizes="(max-width: 860px) 100vw, 780px" />
        </button>
        <div className="article-body">
          {p.body.map((para) => {
            const text = t(...para);
            return text.startsWith("## ") ? <h2 key={para[0]}>{text.slice(3)}</h2> : <p key={para[0]}>{text}</p>;
          })}
        </div>
        <aside className="article-cta">
          <div>
            <span className="k">{t("Gợi ý cho bạn", "Our pick for you")}</span>
            <b>{t("Combo Sáng – Tối", "Day–Night Combo")}</b>
            <p>{t("Sáng Mayqueen Slim, tối Yodetox Extra. Liệu trình 30 ngày, tặng thực đơn eat clean.", "Mayqueen Slim by day, Yodetox Extra by night. A 30-day course with an eat-clean menu.")}</p>
          </div>
          <div className="article-cta-buy">
            <span className="pr">{formatVnd(combo.price)}{combo.old && <s>{formatVnd(combo.old)}</s>}</span>
            <button type="button" className="btn btn-dark" onClick={() => { add(combo.id); openCart(); }}>{t("Thêm vào giỏ", "Add to cart")}</button>
          </div>
        </aside>
        <p className="article-note">{t("Bài viết mang tính tham khảo, không thay thế lời khuyên của bác sĩ. Thực phẩm bảo vệ sức khoẻ không phải là thuốc.", "For reference only; not a substitute for medical advice. Supplements are not medicines.")}</p>
      </article>
      <section className="sec" style={{ paddingBottom: 0 }}>
        <div className="wrap">
        <div className="head"><h2 className="h2">{t("Bài viết khác", "More articles")}</h2><Link className="btn btn-line" href="/song-dep">{t("Tất cả bài viết", "All articles")}</Link></div>
        <div className="post-grid three">
          {related.map((r) => <PostCard key={r.slug} slug={r.slug} />)}
        </div>
        </div>
      </section>
    </main>
  );
}

/* ======================= Liên hệ ======================= */
export function ContactPage() {
  const { t } = useStore();
  const channels: { icon: string; h: L; v: string; href: string; ext?: boolean }[] = [
    { icon: "phone", h: ["Hotline", "Hotline"], v: CONTACT.phone, href: CONTACT.tel },
    { icon: "msg", h: ["Chat Zalo", "Zalo chat"], v: CONTACT.phone, href: CONTACT.zalo, ext: true },
    { icon: "fb", h: ["Fanpage Facebook", "Facebook page"], v: "MayqueenSlim Official", href: CONTACT.facebook, ext: true },
    { icon: "pin", h: ["Địa chỉ", "Address"], v: CONTACT.address, href: CONTACT.maps, ext: true },
  ];
  return (
    <main className="page">
      <PageHead
        crumbs={[{ label: ["Liên hệ", "Contact"] }]}
        title={["Liên hệ Mayqueen", "Contact Mayqueen"]}
        sub={["Phản hồi trong 15 phút từ 8:00 đến 21:00 mỗi ngày. Liên hệ: Phan Tiến Đại.", "We reply within 15 minutes, 8:00–21:00 daily. Contact: Phan Tiến Đại."]}
      />
      <section className="wrap channels">
        {channels.map((c) => (
          <a key={c.icon} className="channel" href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener" } : {})}>
            <span className="fi"><Icon name={c.icon} /></span>
            <span><small>{t(...c.h)}</small><b>{c.v}</b></span>
          </a>
        ))}
      </section>
      <div className="sec" style={{ paddingTop: 28 }}>
        <Contact />
      </div>
    </main>
  );
}

/* ======================= Chính sách ======================= */
export function PolicyPage({ slug }: { slug: string }) {
  const { t } = useStore();
  const p = POLICY_BY_SLUG[slug];
  return (
    <main className="page">
      <PageHead crumbs={[{ label: ["Chính sách", "Policies"] }]} title={p.title} sub={p.intro} />
      <section className="wrap policy">
        <nav className="policy-nav" aria-label={t("Các chính sách", "Policies")}>
          {POLICIES.map((x) => (
            <Link key={x.slug} href={`/chinh-sach/${x.slug}`} aria-current={x.slug === slug ? "page" : undefined}>{t(...x.title)}</Link>
          ))}
        </nav>
        <div className="policy-body">
          {p.sections.map((s) => (
            <div key={s.h[0]}>
              <h2>{t(...s.h)}</h2>
              <ul>{s.items.map((it) => <li key={it[0]}>{t(...it)}</li>)}</ul>
            </div>
          ))}
          <p className="sub">{t("Cần hỗ trợ thêm? Gọi", "Need more help? Call")} <a href={CONTACT.tel}>{CONTACT.phone}</a> {t("hoặc", "or")} <a href={CONTACT.zalo} target="_blank" rel="noopener">{t("chat Zalo", "chat on Zalo")}</a>.</p>
        </div>
      </section>
    </main>
  );
}
