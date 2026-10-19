/**
 * Chuyển động phản hồi thao tác người dùng. Mọi hàm đều tự tắt khi bật
 * "giảm chuyển động" trong hệ điều hành.
 */
const reduced = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Ảnh sản phẩm bay vào icon giỏ hàng: cho thấy hàng vừa được thêm đi đâu. */
export function flyToCart(from: Element | null | undefined) {
  if (!from || reduced()) return;
  const img = (from instanceof HTMLImageElement ? from : from.querySelector("img")) as HTMLImageElement | null;
  const target = document.querySelector("[data-cart-target]");
  if (!img || !target) return;
  const a = img.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  if (!a.width || !b.width) return;

  const ghost = img.cloneNode(true) as HTMLImageElement;
  ghost.removeAttribute("srcset");
  ghost.src = img.currentSrc || img.src;
  ghost.className = "fly-ghost";
  const size = Math.min(a.width, a.height, 160);
  Object.assign(ghost.style, {
    left: `${a.left + a.width / 2 - size / 2}px`,
    top: `${a.top + a.height / 2 - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
  });
  document.body.appendChild(ghost);

  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  // Đường cong: đi lên trước rồi rơi vào giỏ
  const anim = ghost.animate(
    [
      { transform: "translate(0,0) scale(1)", opacity: 1, borderRadius: "16px" },
      { transform: `translate(${dx * 0.55}px, ${dy * 0.55 - 70}px) scale(0.55)`, opacity: 1, borderRadius: "40%", offset: 0.55 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.12)`, opacity: 0.4, borderRadius: "50%" },
    ],
    { duration: 720, easing: "cubic-bezier(.45,.05,.25,1)" },
  );
  anim.onfinish = () => {
    ghost.remove();
    target.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.22) rotate(-8deg)" }, { transform: "scale(1)" }],
      { duration: 380, easing: "cubic-bezier(.3,1.6,.5,1)" },
    );
  };
}
