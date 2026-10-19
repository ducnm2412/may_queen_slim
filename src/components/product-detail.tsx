"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PRODUCTS, PRODUCT_BY_ID, formatVnd, CONTACT } from "@/lib/products";
import { getDetail } from "@/lib/product-details";
import { useStore } from "./providers";
import { flyToCart } from "@/lib/motion";
import { Icon } from "./icons";
import { ProductCard } from "./product-card";

export function ProductDetail({ id }: { id: string }) {
  const p = PRODUCT_BY_ID[id];
  const { t, lang, add, openCart, wish, toggleWish, openImage } = useStore();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState<"usage" | "ingredients" | "notes">("usage");

  const d = getDetail(p.id, p.cat, p.img);
  const name = lang === "en" && p.nameEn ? p.nameEn : p.name;
  const liked = wish.has(p.id);
  const related = PRODUCTS.filter((x) => x.id !== p.id && (x.cat === p.cat || x.top)).slice(0, 4);
  const discount = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;

  const TABS = [
    { key: "usage" as const, label: t("Cách dùng", "How to use"), items: d.usage },
    { key: "ingredients" as const, label: t("Thành phần", "Ingredients"), items: d.ingredients },
    { key: "notes" as const, label: t("Lưu ý", "Good to know"), items: d.notes },
  ];

  return (
    <main className="page">
      <div className="wrap">
        <nav className="crumbs" aria-label={t("Đường dẫn", "Breadcrumb")}>
          <Link href="/">{t("Trang chủ", "Home")}</Link>
          <span aria-hidden="true">/</span>
          <Link href="/#san-pham">{t("Sản phẩm", "Products")}</Link>
          <span aria-hidden="true">/</span>
          <span>{name}</span>
        </nav>

        <div className="pdp">
          <div className="pdp-gallery">
            <button type="button" className="pdp-main zoomable" aria-label={t("Xem ảnh lớn", "View large image")} onClick={() => openImage(d.gallery[active], name)}>
              <Image key={d.gallery[active]} src={d.gallery[active]} alt={name} width={1200} height={1200} quality={90} priority sizes="(max-width: 1100px) 100vw, 55vw" />
              {discount > 0 && <span className="pdp-off">-{discount}%</span>}
              <span className="zoom-hint"><Icon name="search" size={16} />{t("Phóng to", "Zoom")}</span>
            </button>
            {d.gallery.length > 1 && (
              <div className="pdp-thumbs" role="tablist" aria-label={t("Ảnh sản phẩm", "Product photos")}>
                {d.gallery.map((src, i) => (
                  <button key={src} type="button" role="tab" aria-selected={i === active} className={i === active ? "on" : ""} onClick={() => setActive(i)}>
                    <Image src={src} alt="" width={200} height={200} sizes="90px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pdp-info">
            <span className="tag"><i />{lang === "en" ? p.tagEn : p.tag}</span>
            <h1>{name}</h1>
            <p className="sub">{lang === "en" ? p.specEn : p.spec}</p>
            <div className="pdp-price">
              <b>{formatVnd(p.price)}</b>
              {p.old && <s>{formatVnd(p.old)}</s>}
            </div>
            <p className="pdp-about">{t(...d.about)}</p>

            <div className="pdp-buy">
              <div className="qty">
                <button type="button" aria-label={t("Giảm", "Decrease")} onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <output>{qty}</output>
                <button type="button" aria-label={t("Tăng", "Increase")} onClick={() => setQty((q) => Math.min(20, q + 1))}>+</button>
              </div>
              <button className="btn btn-line pdp-add" type="button" onClick={() => { flyToCart(document.querySelector(".pdp-main")); add(p.id, qty); setTimeout(openCart, 650); }}>
                <Icon name="cart" size={18} />{t("Thêm vào giỏ", "Add to cart")}
              </button>
              <button className="btn btn-green pdp-now" type="button" onClick={() => { add(p.id, qty); router.push("/gio-hang"); }}>
                {t("Mua ngay", "Buy now")}
              </button>
              <button className={`icon-btn wish${liked ? " on" : ""}`} type="button" aria-pressed={liked} aria-label={t("Yêu thích", "Wishlist")} onClick={() => toggleWish(p.id)}>
                <Icon name="heart" />
              </button>
            </div>

            <ul className="pdp-perks">
              <li><Icon name="shield" />{t("Bảo chứng B.O.T Việt Nam, đủ hồ sơ công bố", "Guaranteed by B.O.T Vietnam, fully declared")}</li>
              <li><Icon name="truck" />{t("Giao toàn quốc 1–4 ngày, freeship đơn từ 700k", "Nationwide in 1–4 days, free shipping from 700k")}</li>
              <li><Icon name="check" />{t("COD, kiểm hàng rồi mới thanh toán", "COD, inspect before you pay")}</li>
            </ul>

            <div className="pdp-tabs">
              <div className="tablist" role="tablist">
                {TABS.map((tb) => (
                  <button key={tb.key} type="button" role="tab" aria-selected={tab === tb.key} className={tab === tb.key ? "on" : ""} onClick={() => setTab(tb.key)}>{tb.label}</button>
                ))}
              </div>
              <ul className="tabpanel" role="tabpanel">
                {TABS.find((tb) => tb.key === tab)!.items.map((it) => (
                  <li key={it[0]}>{t(...it)}</li>
                ))}
              </ul>
            </div>

            <p className="pdp-help">
              {t("Cần tư vấn liều dùng?", "Need dosage advice?")}{" "}
              <a href={CONTACT.zalo} target="_blank" rel="noopener">{t("Chat Zalo", "Chat on Zalo")}</a>
              {" · "}
              <a href={CONTACT.tel}>{CONTACT.phone}</a>
            </p>
          </div>
        </div>

        <section className="sec" style={{ paddingBottom: 0 }}>
          <div className="head">
            <div>
              <h2 className="h2">{t("Có thể bạn cũng thích", "You may also like")}</h2>
              <p className="sub">{t("Kết hợp để đủ liệu trình 30 ngày.", "Pair them for a full 30-day course.")}</p>
            </div>
            <Link className="btn btn-line" href="/#san-pham">{t("Tất cả sản phẩm", "All products")}</Link>
          </div>
          <div className="grid">{related.map((x) => <ProductCard key={x.id} p={x} />)}</div>
        </section>
      </div>
    </main>
  );
}
