"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "./providers";
import { Icon } from "./icons";
import { scrollToTarget } from "@/lib/scroll";
import { PRODUCTS, formatVnd } from "@/lib/products";

const DD_CATS = [
  { id: "cb30", vi: "Combo liệu trình", en: "Course combos", sub: ["Sáng Slim + tối Yodetox", "Slim by day + Yodetox by night"] },
  { id: "mq", vi: "Mayqueen Slim", en: "Mayqueen Slim", sub: ["Hỗ trợ chuyển hoá mỡ buổi sáng", "Morning fat-metabolism support"] },
  { id: "yd", vi: "Yodetox Extra", en: "Yodetox Extra", sub: ["Thanh lọc dịu nhẹ buổi tối", "Gentle evening cleanse"] },
] as const;
const DD_PRODUCTS = PRODUCTS.slice(0, 4);

const NAV = [
  { href: "/ve-chung-toi", vi: "Về chúng tôi", en: "About us" },
  { href: "/san-pham", vi: "Sản phẩm", en: "Products" },
  { href: "/#lieu-trinh", vi: "Liệu trình", en: "30-day plan" },
  { href: "/song-dep", vi: "Sống đẹp", en: "Live well" },
  { href: "/lien-he", vi: "Liên hệ", en: "Contact" },
];

export function Header() {
  const { t, lang, toggleLang, cartCount, openCart, wish, toast, bump, query, setQuery } = useStore();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [dd, setDd] = useState(false);

  useEffect(() => setDd(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className={`hdr${scrolled || !isHome ? " scrolled" : ""}`}>
      <div className="topbar">{t("Tuần lễ Combo: giảm 60K + freeship toàn quốc!", "Combo week: save 60k + free nationwide shipping!")}</div>
      <header className="nav">
        <div className="wrap">
          <nav className="nav-l" aria-label={t("Chính", "Main")}>
            {NAV.map((n) => n.href === "/san-pham" ? (
              <div key={n.href} className={`nav-dd${dd ? " open" : ""}`} onMouseEnter={() => setDd(true)} onMouseLeave={() => setDd(false)} onFocus={() => setDd(true)} onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setDd(false)}>
                <Link href={n.href} aria-expanded={dd} aria-haspopup="true">{t(n.vi, n.en)} <Icon name="chev" /></Link>
                <div className="dd-panel" onClick={() => setDd(false)}>
                  <div className="dd-inner">
                    <ul className="dd-cats">
                      {DD_CATS.map((c) => (
                        <li key={c.id}>
                          <Link href={`/san-pham/${c.id}`}><b>{t(c.vi, c.en)}</b><small>{t(c.sub[0], c.sub[1])}</small></Link>
                        </li>
                      ))}
                      <li><Link className="dd-all" href="/san-pham">{t("Xem tất cả sản phẩm →", "View all products →")}</Link></li>
                    </ul>
                    <div className="dd-grid">
                      {DD_PRODUCTS.map((p) => (
                        <Link key={p.id} className="dd-card" href={`/san-pham/${p.id}`}>
                          <span className="dd-ph"><Image src={p.img} alt="" width={320} height={320} sizes="200px" />{p.tag && <em>{t(p.tag, p.tagEn)}</em>}</span>
                          <b>{t(p.name, p.nameEn ?? p.name)}</b>
                          <small>{t(p.spec, p.specEn)}</small>
                          <span className="dd-pr">{formatVnd(p.price)}{p.old && <s>{formatVnd(p.old)}</s>}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link key={n.href} href={n.href}>{t(n.vi, n.en)}</Link>
            ))}
          </nav>
          <Link className="logo" href="/" aria-label="Mayqueen Slim">
            <b>Mayqueen<span>Slim</span></b>
            <small>B.O.T VIỆT NAM</small>
          </Link>
          <div className="nav-r">
            <label className="search">
              <Icon name="search" />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (!isHome) router.push("/#san-pham");
                }}
                onKeyDown={(e) => e.key === "Enter" && (isHome ? scrollToTarget("san-pham") : router.push("/#san-pham"))}
                placeholder={t("Tìm combo, sản phẩm…", "Search products…")}
                aria-label={t("Tìm sản phẩm", "Search products")}
              />
            </label>
            <button className="lang" type="button" onClick={toggleLang} aria-label="Đổi ngôn ngữ / Switch language">
              <svg className="flag" viewBox="0 0 30 20" aria-hidden="true">
                {lang === "vi" ? (
                  <>
                    <rect width="30" height="20" fill="#DA251D" />
                    <path d="M15 4.2l1.4 4.3h4.5l-3.6 2.7 1.4 4.3L15 12.8l-3.7 2.7 1.4-4.3-3.6-2.7h4.5z" fill="#FFCD00" />
                  </>
                ) : (
                  <>
                    <rect width="30" height="20" fill="#012169" />
                    <path d="M0 0l30 20M30 0L0 20" stroke="#fff" strokeWidth="4" />
                    <path d="M0 0l30 20M30 0L0 20" stroke="#C8102E" strokeWidth="1.6" />
                    <path d="M15 0v20M0 10h30" stroke="#fff" strokeWidth="6" />
                    <path d="M15 0v20M0 10h30" stroke="#C8102E" strokeWidth="3.4" />
                  </>
                )}
              </svg>
              <span>{lang.toUpperCase()}</span>
            </button>
            <Link className="icon-btn acct" href="/#lien-he" aria-label={t("Tài khoản", "Account")}><Icon name="user" /></Link>
            <Link className="icon-btn wishbtn" href="/yeu-thich" aria-label={t("Yêu thích", "Wishlist")}>
              <Icon name="heart" />
              {wish.size > 0 && <span className="badge">{wish.size}</span>}
            </Link>
            <button className="icon-btn" type="button" data-cart-target onClick={openCart} aria-label={t("Giỏ hàng", "Cart")}>
              <Icon name="cart" />
              <span key={bump} className={`badge${bump ? " bump" : ""}`}>{cartCount}</span>
            </button>
            <button className="icon-btn menu-btn" type="button" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>
      </div>
      <nav data-lenis-prevent className={`mob${menu ? " open" : ""}`} aria-label="Menu" aria-hidden={!menu}>
        <form
          className="search mob-search"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            setMenu(false);
            if (isHome) scrollToTarget("san-pham");
            else router.push("/#san-pham");
          }}
        >
          <Icon name="search" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("Tìm combo, sản phẩm…", "Search products…")}
            aria-label={t("Tìm sản phẩm", "Search products")}
            tabIndex={menu ? 0 : -1}
            enterKeyHint="search"
          />
        </form>
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1}>{t(n.vi, n.en)}</Link>
        ))}
        <Link href="/yeu-thich" onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1}>{t("Yêu thích", "Wishlist")}{wish.size > 0 && ` (${wish.size})`}</Link>
        <Link href="/gio-hang" onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1}>{t("Giỏ hàng", "Cart")}</Link>
      </nav>
    </>
  );
}
