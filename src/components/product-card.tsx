"use client";

import Image from "next/image";
import Link from "next/link";
import { formatVnd, type Product } from "@/lib/products";
import { useStore } from "./providers";
import { flyToCart } from "@/lib/motion";
import { Icon } from "./icons";

export function ProductCard({ p }: { p: Product }) {
  const { t, lang, add, wish, toggleWish } = useStore();
  const name = lang === "en" && p.nameEn ? p.nameEn : p.name;
  const liked = wish.has(p.id);
  return (
    <article className="card" data-id={p.id}>
      <h3><Link href={`/san-pham/${p.id}`}>{name}</Link></h3>
      <p className="spec">{lang === "en" ? p.specEn : p.spec}</p>
      <div className="tools">
        <button type="button" className={liked ? "on" : ""} aria-pressed={liked} aria-label={t("Yêu thích", "Wishlist")} onClick={() => toggleWish(p.id)}>
          <Icon name="heart" />
        </button>
        <Link className="view" href={`/san-pham/${p.id}`} aria-label={t("Xem chi tiết", "View details")} style={{ width: 30, height: 30, borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center" }}>
          <Icon name="eye" size={15} />
        </Link>
      </div>
      <Link className="ph" href={`/san-pham/${p.id}`} tabIndex={-1} aria-hidden="true">
        <Image src={p.img} alt={name} width={900} height={900} quality={90} sizes="(max-width: 760px) 80vw, (max-width: 1100px) 33vw, 25vw" />
      </Link>
      <div className="meta">
        <div>
          <span className="tag"><i />{lang === "en" ? p.tagEn : p.tag}</span>
          <div className="pr">
            {formatVnd(p.price)}
            {p.old && <s>{formatVnd(p.old)}</s>}
          </div>
        </div>
        <span className="hot">{t("Chính hãng", "Genuine")}</span>
      </div>
      <button type="button" className="atc" onClick={(e) => { flyToCart(e.currentTarget.closest(".card")?.querySelector(".ph")); add(p.id); }}>
        {t("Thêm vào giỏ", "Add to cart")}
        <Icon name="cart" size={16} />
      </button>
    </article>
  );
}
