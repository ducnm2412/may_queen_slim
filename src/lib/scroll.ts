import type Lenis from "lenis";

/** Giữ một tham chiếu Lenis dùng chung để mọi thao tác cuộn bằng code đi qua Lenis. */
let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  instance = l;
};

/** Chiều cao thanh menu khi đã cuộn (thanh thông báo thu lại, chỉ còn menu). */
const navHeight = () => document.querySelector(".nav")?.getBoundingClientRect().height ?? 78;

/** Cuộn mượt tới phần tử (hoặc id, hoặc toạ độ), chừa chỗ cho thanh menu cố định. */
export function scrollToTarget(target: string | Element | number, opts: { immediate?: boolean } = {}) {
  const el = typeof target === "string" ? document.getElementById(target.replace(/^#/, "")) : target;
  if (el == null) return;
  // Tự tính toạ độ để không bị cộng thêm scroll-padding-top của CSS
  const top = typeof el === "number" ? el : Math.max(0, el.getBoundingClientRect().top + scrollY - navHeight() - 12);
  if (instance) {
    instance.scrollTo(top, { duration: 1.4, immediate: opts.immediate });
    return;
  }
  scrollTo({ top, behavior: opts.immediate ? "auto" : "smooth" });
}
