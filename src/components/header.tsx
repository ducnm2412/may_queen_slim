"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "./providers";
import { Icon } from "./icons";
import { PRODUCTS, formatVnd } from "@/lib/products";

const DD_CATS = [
  { id: "cb30", vi: "Combo liệu trình", en: "Course combos", sub: ["Sáng Slim + tối Yodetox", "Slim by day + Yodetox by night"] },
  { id: "mq", vi: "Mayqueen Slim", en: "Mayqueen Slim", sub: ["Hỗ trợ chuyển hoá mỡ buổi sáng", "Morning fat-metabolism support"] },
  { id: "yd", vi: "Yodetox Extra", en: "Yodetox Extra", sub: ["Thanh lọc dịu nhẹ buổi tối", "Gentle evening cleanse"] },
] as const;
const DD_PRODUCTS = PRODUCTS.slice(0, 4);

/** Trang có banner tối đầu trang: header trong suốt khi chưa cuộn. */
const OVERLAY = ["/", "/san-pham", "/cau-chuyen", "/chung-nhan", "/cam-nhan", "/lien-he"];

const NAV = [
  { href: "/", vi: "Trang chủ", en: "Home" },
  { href: "/san-pham", vi: "Sản phẩm", en: "Products" },
  { href: "/cau-chuyen", vi: "Câu chuyện", en: "Story" },
  { href: "/chung-nhan", vi: "Chứng nhận", en: "Certificates" },
  { href: "/cam-nhan", vi: "Cảm nhận", en: "Reviews" },
  { href: "/lien-he", vi: "Liên hệ", en: "Contact" },
];

export function Header() {
  const { t, lang, toggleLang, cartCount, openCart, wish, toast, bump, query, setQuery } = useStore();
  const pathname = usePathname();
  const router = useRouter();
  const overlay = OVERLAY.includes(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [dd, setDd] = useState(false);
  const [mobDd, setMobDd] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
      <div className={`hdr${scrolled || !overlay ? " scrolled" : ""}`}>
      <header className="nav">
        <div className="wrap">
          <nav className="nav-l" aria-label={t("Chính", "Main")}>
            {NAV.slice(0, 4).map((n) => n.href === "/san-pham" ? (
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
              <Link key={n.href} href={n.href} aria-current={pathname === n.href ? "page" : undefined}>{t(n.vi, n.en)}</Link>
            ))}
          </nav>
          <Link className="logo" href="/" aria-label="Mayqueen Slim">
            <b>Mayqueen<span> Slim</span></b>
            <small>B.O.T VIỆT NAM</small>
          </Link>
          <div className="nav-r">
            <nav className="nav-l nav-l2" aria-label={t("Phụ", "Secondary")}>
              {NAV.slice(4).map((n) => (
                <Link key={n.href} href={n.href} aria-current={pathname === n.href ? "page" : undefined}>{t(n.vi, n.en)}</Link>
              ))}
            </nav>
            <label className={`search${searchOpen ? " open" : ""}`}>
              <button type="button" className="search-btn" aria-label={t("Tìm kiếm", "Search")} aria-expanded={searchOpen} onClick={() => setSearchOpen((o) => !o)}><Icon name="search" /></button>
              <input
                type="search"
                value={query}
                onBlur={() => !query && setSearchOpen(false)}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (pathname !== "/san-pham") router.push("/san-pham");
                }}
                onKeyDown={(e) => e.key === "Enter" && router.push("/san-pham")}
                placeholder={t("Tìm combo, sản phẩm…", "Search products…")}
                aria-label={t("Tìm sản phẩm", "Search products")}
              />
            </label>
            <div className="lang" role="group" aria-label="Ngôn ngữ / Language">
              <button type="button" aria-pressed={lang === "vi"} onClick={() => lang !== "vi" && toggleLang()}>VI</button>
              <i aria-hidden="true">|</i>
              <button type="button" aria-pressed={lang === "en"} onClick={() => lang !== "en" && toggleLang()}>EN</button>
            </div>
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
            router.push("/san-pham");
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
        {NAV.map((n) => n.href === "/san-pham" ? (
          <div key={n.href} className={`mob-dd${mobDd ? " open" : ""}`}>
            <button type="button" className="mob-dd-btn" aria-expanded={mobDd} onClick={() => setMobDd((v) => !v)} tabIndex={menu ? 0 : -1}>
              {t(n.vi, n.en)} <Icon name="chev" />
            </button>
            <div className="mob-dd-list">
              <div>
                {PRODUCTS.map((p) => (
                  <Link key={p.id} className="mob-prod" href={`/san-pham/${p.id}`} onClick={() => setMenu(false)} tabIndex={menu && mobDd ? 0 : -1}>
                    <Image src={p.img} alt="" width={96} height={96} sizes="48px" />
                    <span><b>{t(p.name, p.nameEn ?? p.name)}</b><small>{formatVnd(p.price)}</small></span>
                  </Link>
                ))}
                <Link className="mob-all" href="/san-pham" onClick={() => setMenu(false)} tabIndex={menu && mobDd ? 0 : -1}>{t("Xem tất cả sản phẩm →", "View all products →")}</Link>
              </div>
            </div>
          </div>
        ) : (
          <Link key={n.href} href={n.href} onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1}>{t(n.vi, n.en)}</Link>
        ))}
        <Link href="/yeu-thich" onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1}>{t("Yêu thích", "Wishlist")}{wish.size > 0 && ` (${wish.size})`}</Link>
        <Link href="/gio-hang" onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1}>{t("Giỏ hàng", "Cart")}</Link>
      </nav>
    </>
  );
}
