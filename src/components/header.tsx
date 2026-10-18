"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "./providers";
import { Icon } from "./icons";

const NAV = [
  { href: "/#ve-chung-toi", vi: "Về chúng tôi", en: "About us" },
  { href: "/#san-pham", vi: "Sản phẩm", en: "Products" },
  { href: "/#lieu-trinh", vi: "Liệu trình", en: "30-day plan" },
  { href: "/#song-dep", vi: "Sống đẹp", en: "Live well" },
  { href: "/#hoi-dap", vi: "Hỏi đáp", en: "FAQs" },
  { href: "/#lien-he", vi: "Liên hệ", en: "Contact" },
];

export function Header() {
  const { t, lang, toggleLang, cartCount, openCart, wish, toast, bump, query, setQuery } = useStore();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

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
            {NAV.map((n) => (
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
                onKeyDown={(e) => e.key === "Enter" && (isHome ? document.getElementById("san-pham")?.scrollIntoView({ behavior: "smooth" }) : router.push("/#san-pham"))}
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
            <button
              className="icon-btn wishbtn"
              type="button"
              aria-label={t("Yêu thích", "Wishlist")}
              onClick={() => toast(wish.size ? t(`${wish.size} sản phẩm yêu thích`, `${wish.size} in wishlist`) : t("Chưa có sản phẩm yêu thích", "Wishlist is empty"))}
            >
              <Icon name="heart" />
              {wish.size > 0 && <span className="badge">{wish.size}</span>}
            </button>
            <button className="icon-btn" type="button" onClick={openCart} aria-label={t("Giỏ hàng", "Cart")}>
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
      <nav className={`mob${menu ? " open" : ""}`} aria-label="Menu" aria-hidden={!menu}>
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1}>{t(n.vi, n.en)}</Link>
        ))}
        <Link href="/gio-hang" onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1}>{t("Giỏ hàng", "Cart")}</Link>
      </nav>
    </>
  );
}
