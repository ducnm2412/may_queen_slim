import type Lenis from "lenis";

/** Giữ một tham chiếu Lenis dùng chung để mọi thao tác cuộn bằng code đi qua Lenis. */
let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  instance = l;
};

/** Khoảng chừa cho thanh menu cố định. */
const headerOffset = () => {
  const h = document.querySelector(".hdr")?.getBoundingClientRect().height ?? 80;
  return -(h + 12);
};

/** Cuộn mượt tới phần tử (hoặc id), chừa chỗ cho thanh menu. */
export function scrollToTarget(target: string | Element | number, opts: { immediate?: boolean } = {}) {
  const el = typeof target === "string" ? document.getElementById(target.replace(/^#/, "")) : target;
  if (el == null) return;
  const offset = typeof el === "number" ? 0 : headerOffset();
  if (instance) {
    instance.scrollTo(el as Element | number, { offset, duration: 1.4, immediate: opts.immediate });
    return;
  }
  const top = typeof el === "number" ? el : el.getBoundingClientRect().top + scrollY + offset;
  scrollTo({ top, behavior: opts.immediate ? "auto" : "smooth" });
}
