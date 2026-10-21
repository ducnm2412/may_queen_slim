/** Đường dẫn song ngữ: phần đầu URL tiếng Việt ↔ tiếng Anh. Trang thật nằm ở slug tiếng Việt, slug tiếng Anh được rewrite trong next.config. */
export const SLUGS: [vi: string, en: string][] = [
  ["san-pham", "products"],
  ["cau-chuyen", "our-story"],
  ["chung-nhan", "certificates"],
  ["cam-nhan", "reviews"],
  ["lien-he", "contact"],
  ["song-dep", "live-well"],
  ["chinh-sach", "policies"],
  ["gio-hang", "cart"],
  ["yeu-thich", "wishlist"],
  ["ve-chung-toi", "about"],
];

const toEn = new Map(SLUGS.map(([v, e]) => [v, e]));
const toVi = new Map(SLUGS.map(([v, e]) => [e, v]));

/** Đổi đường dẫn nội bộ sang ngôn ngữ cần (giữ nguyên phần sau và #hash). Link ngoài giữ nguyên. */
export function localize(href: string, lang: "vi" | "en"): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const m = href.match(/^\/([^/?#]+)(.*)$/);
  if (!m) return href;
  const map = lang === "en" ? toEn : toVi;
  const next = map.get(m[1]);
  return next ? `/${next}${m[2]}` : href;
}

/** Đường dẫn gốc tiếng Việt (để so sánh trang hiện tại). */
export const canonical = (path: string) => localize(path, "vi");

/** URL đang ở slug tiếng Anh? */
export const isEnPath = (path: string) => {
  const seg = path.split("/")[1];
  return !!seg && toVi.has(seg);
};
