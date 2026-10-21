"use client";

import Image from "next/image";
import Link from "./llink";
import { useState, type FormEvent } from "react";
import { CONTACT, FREESHIP_FROM, PRODUCTS, PRODUCT_BY_ID, formatVnd } from "@/lib/products";
import { useStore } from "./providers";
import { Icon } from "./icons";
import { ProductCard } from "./product-card";
import { scrollToTarget } from "@/lib/scroll";

const SHIP_FEE = 30000;

export function CartPage() {
  const { t, lang, cart, cartTotal, cartCount, setQty, clearCart, add } = useStore();
  const [placed, setPlaced] = useState<null | { code: string; total: number; pay: string }>(null);
  const [pay, setPay] = useState<"cod" | "bank">("cod");

  const ids = Object.keys(cart).filter((k) => cart[k] > 0 && PRODUCT_BY_ID[k]);
  const ship = cartTotal === 0 || cartTotal >= FREESHIP_FROM ? 0 : SHIP_FEE;
  const total = cartTotal + ship;
  const left = FREESHIP_FROM - cartTotal;
  const suggestions = PRODUCTS.filter((p) => !cart[p.id] && p.top).slice(0, 4);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!f.checkValidity()) {
      f.reportValidity();
      return;
    }
    // TODO trước khi go-live: gửi đơn về Google Sheet / CRM / Zalo OA
    const code = "MQ" + Date.now().toString().slice(-6);
    setPlaced({ code, total, pay });
    clearCart();
    scrollToTarget(0);
  };

  if (placed) {
    return (
      <main className="page">
        <div className="wrap">
          <div className="order-done rv in">
            <div className="done-ic"><Icon name="check" size={28} /></div>
            <h1 className="h2">{t("Đặt hàng thành công!", "Order received!")}</h1>
            <p className="sub">
              {t("Mã đơn", "Order code")} <b>{placed.code}</b> · {formatVnd(placed.total)} · {placed.pay === "cod" ? t("Thanh toán khi nhận hàng", "Cash on delivery") : t("Chuyển khoản", "Bank transfer")}
            </p>
            <p className="sub">{t("Mayqueen sẽ gọi xác nhận trong 15 phút (8:00–21:00). Giao toàn quốc 1–4 ngày.", "We'll call to confirm within 15 minutes (8:00–21:00). Nationwide delivery in 1–4 days.")}</p>
            {placed.pay === "bank" && (
              <div className="bank-box">
                <b>{t("Thông tin chuyển khoản", "Bank transfer details")}</b>
                <p>{t("Ngân hàng và số tài khoản sẽ được gửi qua Zalo khi xác nhận đơn.", "Bank and account number will be sent via Zalo when we confirm the order.")}</p>
                <p className="sub">{t("Nội dung: ", "Reference: ")}<b>{placed.code}</b></p>
              </div>
            )}
            <div className="direct" style={{ justifyContent: "center" }}>
              <a className="btn btn-green" href={CONTACT.zalo} target="_blank" rel="noopener">{t("Theo dõi đơn qua Zalo", "Track on Zalo")}</a>
              <Link className="btn btn-line" href="/">{t("Tiếp tục mua sắm", "Continue shopping")}</Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="wrap">
        <nav className="crumbs" aria-label={t("Đường dẫn", "Breadcrumb")}>
          <Link href="/">{t("Trang chủ", "Home")}</Link>
          <span aria-hidden="true">/</span>
          <span>{t("Giỏ hàng", "Cart")}</span>
        </nav>
        <div className="head">
          <div>
            <h1 className="h2">{t("Giỏ hàng", "Your cart")}</h1>
            <p className="sub">{cartCount ? t(`${cartCount} sản phẩm`, `${cartCount} item${cartCount > 1 ? "s" : ""}`) : t("Chưa có sản phẩm nào.", "Nothing here yet.")}</p>
          </div>
          {ids.length > 0 && (
            <button className="rm" type="button" onClick={clearCart}>{t("Xoá tất cả", "Clear cart")}</button>
          )}
        </div>

        {ids.length === 0 ? (
          <div className="cart-empty">
            <p>{t("Giỏ hàng đang trống. Bắt đầu với Combo Sáng – Tối để đủ liệu trình 30 ngày.", "Your cart is empty. Start with the Day–Night combo for a full 30-day course.")}</p>
            <div className="direct">
              <button className="btn btn-dark" type="button" onClick={() => add("cb30")}>{t("Thêm Combo Sáng – Tối", "Add Day–Night combo")}</button>
              <Link className="btn btn-line" href="/#san-pham">{t("Xem tất cả sản phẩm", "Browse products")}</Link>
            </div>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-list">
              {ids.map((k) => {
                const p = PRODUCT_BY_ID[k];
                const name = lang === "en" && p.nameEn ? p.nameEn : p.name;
                return (
                  <article className="cart-row" key={k}>
                    <Link href={`/san-pham/${p.id}`} className="cart-img"><Image src={p.img} alt={name} width={240} height={240} sizes="120px" /></Link>
                    <div className="cart-body">
                      <Link href={`/san-pham/${p.id}`}><h3>{name}</h3></Link>
                      <p className="sub">{lang === "en" ? p.specEn : p.spec}</p>
                      <div className="cart-ctrl">
                        <div className="qty">
                          <button type="button" aria-label={t("Giảm", "Decrease")} onClick={() => setQty(k, cart[k] - 1)}>−</button>
                          <output>{cart[k]}</output>
                          <button type="button" aria-label={t("Tăng", "Increase")} onClick={() => setQty(k, cart[k] + 1)}>+</button>
                        </div>
                        <button className="rm" type="button" onClick={() => setQty(k, 0)}>{t("Xoá", "Remove")}</button>
                      </div>
                    </div>
                    <div className="cart-price">
                      <b>{formatVnd(p.price * cart[k])}</b>
                      {cart[k] > 1 && <small className="sub">{formatVnd(p.price)} × {cart[k]}</small>}
                    </div>
                  </article>
                );
              })}

              <div className="freeship-note">
                <div className="freebar"><i style={{ width: `${Math.min(100, (cartTotal / FREESHIP_FROM) * 100)}%` }} /></div>
                <p className="d-ship">{left > 0 ? t(`Thêm ${formatVnd(left)} để được freeship toàn quốc`, `${formatVnd(left)} more for free nationwide shipping`) : t("Bạn được miễn phí vận chuyển", "Free shipping unlocked")}</p>
              </div>
            </div>

            <aside className="cart-side">
              <form className="cf checkout-form" onSubmit={submit} noValidate>
                <h2>{t("Thông tin nhận hàng", "Delivery details")}</h2>
                <label className="field"><span>{t("Họ tên", "Full name")}</span><input name="name" required autoComplete="name" /></label>
                <label className="field"><span>{t("Số điện thoại", "Phone")}</span><input name="phone" required inputMode="tel" autoComplete="tel" pattern="[0-9 +]{9,13}" /></label>
                <label className="field"><span>{t("Địa chỉ nhận hàng", "Delivery address")}</span><textarea name="addr" rows={2} required autoComplete="street-address" /></label>
                <label className="field"><span>{t("Ghi chú (tuỳ chọn)", "Note (optional)")}</span><input name="note" placeholder={t("Giờ giao, gọi trước khi đến…", "Delivery time, call before arriving…")} /></label>

                <fieldset className="pay-opts">
                  <legend>{t("Thanh toán", "Payment")}</legend>
                  <label className={pay === "cod" ? "on" : ""}>
                    <input type="radio" name="pay" value="cod" checked={pay === "cod"} onChange={() => setPay("cod")} />
                    <span><b>{t("Thanh toán khi nhận hàng (COD)", "Cash on delivery (COD)")}</b><small>{t("Kiểm hàng rồi mới trả tiền", "Inspect before you pay")}</small></span>
                  </label>
                  <label className={pay === "bank" ? "on" : ""}>
                    <input type="radio" name="pay" value="bank" checked={pay === "bank"} onChange={() => setPay("bank")} />
                    <span><b>{t("Chuyển khoản", "Bank transfer")}</b><small>{t("Nhận thông tin tài khoản qua Zalo", "Account details sent via Zalo")}</small></span>
                  </label>
                </fieldset>

                <dl className="summary">
                  <div><dt>{t("Tạm tính", "Subtotal")}</dt><dd>{formatVnd(cartTotal)}</dd></div>
                  <div><dt>{t("Phí vận chuyển", "Shipping")}</dt><dd>{ship === 0 ? t("Miễn phí", "Free") : formatVnd(ship)}</dd></div>
                  <div className="total"><dt>{t("Tổng cộng", "Total")}</dt><dd>{formatVnd(total)}</dd></div>
                </dl>
                <button className="btn btn-green" type="submit" style={{ width: "100%" }}>{t("Xác nhận đặt hàng", "Place order")}</button>
                <p className="sub" style={{ fontSize: 12.5 }}>{t("Bấm đặt hàng là bạn đồng ý với điều khoản và chính sách đổi trả trong 7 ngày.", "By placing the order you agree to our terms and 7-day return policy.")}</p>
              </form>
            </aside>
          </div>
        )}

        {suggestions.length > 0 && (
          <section className="sec" style={{ paddingBottom: 0 }}>
            <div className="head">
              <div>
                <h2 className="h2">{ids.length ? t("Thêm cho đủ liệu trình", "Complete your course") : t("Sản phẩm nổi bật", "Top picks")}</h2>
              </div>
            </div>
            <div className="grid">{suggestions.map((p) => <ProductCard key={p.id} p={p} />)}</div>
          </section>
        )}
      </div>
    </main>
  );
}
