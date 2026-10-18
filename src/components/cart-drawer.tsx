"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CONTACT, FREESHIP_FROM, PRODUCT_BY_ID, formatVnd } from "@/lib/products";
import { useStore } from "./providers";

type Step = "cart" | "checkout" | "done";

export function CartDrawer() {
  const { t, lang, cart, cartTotal, setQty, clearCart, cartOpen, closeCart } = useStore();
  const [step, setStep] = useState<Step>("cart");
  const closeBtn = useRef<HTMLButtonElement>(null);
  const firstInput = useRef<HTMLInputElement>(null);

  const ids = Object.keys(cart).filter((k) => cart[k] > 0 && PRODUCT_BY_ID[k]);

  const close = () => {
    setStep("cart");
    closeCart();
  };

  useEffect(() => {
    if (cartOpen) closeBtn.current?.focus();
  }, [cartOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setStep("cart");
        closeCart();
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [closeCart]);

  const left = FREESHIP_FROM - cartTotal;
  const shipMsg =
    cartTotal === 0
      ? t(`Freeship cho đơn từ ${formatVnd(FREESHIP_FROM)}`, `Free shipping from ${formatVnd(FREESHIP_FROM)}`)
      : left > 0
        ? t(`Thêm ${formatVnd(left)} để được freeship`, `${formatVnd(left)} more for free shipping`)
        : t("Bạn được miễn phí vận chuyển", "Free shipping unlocked");

  const placeOrder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!f.checkValidity()) {
      f.reportValidity();
      return;
    }
    // TODO trước khi go-live: gửi đơn về Google Sheet / CRM / Zalo OA
    setStep("done");
    clearCart();
  };

  return (
    <>
      <div className="scrim" onClick={close} aria-hidden="true" />
      <aside className="drawer" aria-label={t("Giỏ hàng", "Cart")} aria-hidden={!cartOpen}>
        <div className="d-head">
          <h3>{t("Giỏ hàng", "Your cart")}</h3>
          <button className="x" type="button" ref={closeBtn} onClick={close} aria-label={t("Đóng", "Close")}>×</button>
        </div>
        <div className="d-body">
          {step === "done" ? (
            <div className="done">
              <h3>{t("Đặt hàng thành công!", "Order received!")}</h3>
              <p className="sub" style={{ marginTop: 6 }}>{t("Mayqueen sẽ gọi xác nhận trong 15 phút.", "We'll call within 15 minutes to confirm.")}</p>
              <a className="btn btn-green" style={{ marginTop: 14 }} href={CONTACT.zalo} target="_blank" rel="noopener">{t("Theo dõi đơn qua Zalo", "Track on Zalo")}</a>
            </div>
          ) : (
            <>
              {ids.length ? (
                ids.map((k) => {
                  const p = PRODUCT_BY_ID[k];
                  const name = lang === "en" && p.nameEn ? p.nameEn : p.name;
                  return (
                    <div className="c-item" key={k}>
                      <Image src={p.img} alt="" width={70} height={70} />
                      <div>
                        <h5>{name}</h5>
                        <div className="sub" style={{ fontSize: 13 }}>{formatVnd(p.price)}</div>
                        <div className="qty">
                          <button type="button" aria-label={t("Giảm", "Decrease")} onClick={() => setQty(k, cart[k] - 1)}>−</button>
                          <output>{cart[k]}</output>
                          <button type="button" aria-label={t("Tăng", "Increase")} onClick={() => setQty(k, cart[k] + 1)}>+</button>
                        </div>
                      </div>
                      <button className="rm" type="button" onClick={() => setQty(k, 0)}>{t("Xoá", "Remove")}</button>
                    </div>
                  );
                })
              ) : (
                <p className="c-empty">{t("Giỏ hàng đang trống. Chọn một combo ở mục Sản phẩm để bắt đầu.", "Your cart is empty. Pick a combo under Products to get started.")}</p>
              )}
              {step === "checkout" && (
                <form className="checkout" id="checkout" onSubmit={placeOrder} noValidate>
                  <h3>{t("Thông tin nhận hàng", "Delivery details")}</h3>
                  <label className="field"><span>{t("Họ tên", "Full name")}</span><input ref={firstInput} name="name" required autoComplete="name" /></label>
                  <label className="field"><span>{t("Số điện thoại", "Phone")}</span><input name="phone" required inputMode="tel" autoComplete="tel" /></label>
                  <label className="field"><span>{t("Địa chỉ", "Address")}</span><textarea name="addr" rows={2} required autoComplete="street-address" /></label>
                  <label className="field">
                    <span>{t("Thanh toán", "Payment")}</span>
                    <select name="pay" defaultValue="cod">
                      <option value="cod">{t("Thanh toán khi nhận hàng (COD)", "Cash on delivery (COD)")}</option>
                      <option value="bank">{t("Chuyển khoản", "Bank transfer")}</option>
                    </select>
                  </label>
                </form>
              )}
            </>
          )}
        </div>
        {step !== "done" && (
          <div className="d-foot">
            <div className="d-total"><span>{t("Tạm tính", "Subtotal")}</span><span>{formatVnd(cartTotal)}</span></div>
            <div className="freebar"><i style={{ width: `${Math.min(100, (cartTotal / FREESHIP_FROM) * 100)}%` }} /></div>
            <p className="d-ship">{shipMsg}</p>
            {step === "cart" ? (
              <>
                <button
                  className="btn btn-dark"
                  type="button"
                  disabled={!ids.length}
                  onClick={() => {
                    setStep("checkout");
                    setTimeout(() => firstInput.current?.focus(), 50);
                  }}
                >
                  {t("Đặt hàng nhanh", "Quick checkout")}
                </button>
                <Link className="btn btn-line" href="/gio-hang" onClick={close}>{t("Xem chi tiết giỏ hàng", "View full cart")}</Link>
              </>
            ) : (
              <button className="btn btn-green" type="submit" form="checkout">{t("Xác nhận đặt hàng", "Confirm order")}</button>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
