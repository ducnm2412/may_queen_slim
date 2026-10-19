"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useStore } from "./providers";

/** Đầu trang con: đường dẫn, tiêu đề, mô tả ngắn. */
export function PageHead({
  crumbs,
  title,
  sub,
  children,
}: {
  crumbs: { href?: string; label: [string, string] }[];
  title: [string, string];
  sub?: [string, string];
  children?: ReactNode;
}) {
  const { t } = useStore();
  return (
    <header className="page-head wrap">
      <nav className="crumbs" aria-label={t("Đường dẫn", "Breadcrumb")}>
        <Link href="/">{t("Trang chủ", "Home")}</Link>
        {crumbs.map((c) => (
          <span key={c.label[0]} style={{ display: "contents" }}>
            <span aria-hidden="true">/</span>
            {c.href ? <Link href={c.href}>{t(...c.label)}</Link> : <span>{t(...c.label)}</span>}
          </span>
        ))}
      </nav>
      <h1 className="page-title">{t(...title)}</h1>
      {sub && <p className="sub page-sub">{t(...sub)}</p>}
      {children}
    </header>
  );
}
