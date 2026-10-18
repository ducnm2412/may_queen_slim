"use client";

import { useState, type FormEvent } from "react";
import { CONTACT } from "@/lib/products";
import { useStore } from "./providers";

const GOALS = [
  { id: "g1", vi: "Mỡ bụng dưới", en: "Belly fat" },
  { id: "g2", vi: "Hay thèm ăn", en: "Cravings" },
  { id: "g3", vi: "Đầy bụng, nóng trong", en: "Bloating" },
  { id: "g4", vi: "Giữ dáng", en: "Keep shape" },
];

export function Contact() {
  const { t } = useStore();
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!f.checkValidity()) {
      f.reportValidity();
      return;
    }
    // TODO trước khi go-live: nối form tư vấn về CRM / Google Sheet / Zalo OA
    setSent(true);
  };

  return (
    <section className="wrap contact" id="lien-he">
      <div className="cbox rv">
        <h2 className="h2">{t("Tư vấn liệu trình 1:1", "Free 1:1 consultation")}</h2>
        <p className="sub">{t("Chuyên viên nhắn Zalo cho bạn trong 15 phút (8:00–21:00).", "A consultant will text you on Zalo within 15 minutes (8:00–21:00).")}</p>
        <form className="cf" onSubmit={submit} noValidate>
          <div className="row2">
            <label className="field"><span>{t("Họ tên", "Name")}</span><input name="name" required autoComplete="name" /></label>
            <label className="field"><span>{t("SĐT / Zalo", "Phone / Zalo")}</span><input name="phone" required inputMode="tel" autoComplete="tel" pattern="[0-9 +]{9,13}" /></label>
          </div>
          <div className="row2">
            <label className="field"><span>{t("Chiều cao (cm)", "Height (cm)")}</span><input name="h" inputMode="numeric" /></label>
            <label className="field"><span>{t("Cân nặng (kg)", "Weight (kg)")}</span><input name="w" inputMode="numeric" /></label>
          </div>
          <div className="goals" role="radiogroup" aria-label={t("Mục tiêu", "Goal")}>
            {GOALS.map((g, i) => (
              <span key={g.id}>
                <input type="radio" name="g" id={g.id} defaultChecked={i === 0} value={g.vi} />
                <label htmlFor={g.id}>{t(g.vi, g.en)}</label>
              </span>
            ))}
          </div>
          {sent ? (
            <p className="ok-msg" role="status">{t("Đã nhận! Chuyên viên sẽ nhắn Zalo cho bạn ngay.", "Got it! We'll text you on Zalo shortly.")}</p>
          ) : (
            <div><button className="btn btn-dark" type="submit">{t("Nhận liệu trình", "Get my plan")}</button></div>
          )}
        </form>
        <div className="direct">
          <a className="btn btn-green" href={CONTACT.tel}>{t("Gọi ", "Call ")}{CONTACT.phone}</a>
          <a className="btn btn-line" href={CONTACT.zalo} target="_blank" rel="noopener">Chat Zalo</a>
          <a className="btn btn-line" href={CONTACT.facebook} target="_blank" rel="noopener">Messenger</a>
        </div>
      </div>
      <div className="mapbox rv">
        <iframe title={t("Bản đồ Mayqueen Slim, Hà Đông, Hà Nội", "Map of Mayqueen Slim, Ha Dong, Hanoi")} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={CONTACT.mapEmbed} />
        <div className="mapinfo">
          <div><small>{t("Địa chỉ", "Address")}</small><b><a href={CONTACT.maps} target="_blank" rel="noopener">{CONTACT.address}</a></b></div>
          <div><small>Hotline / Zalo</small><b><a href={CONTACT.tel}>{CONTACT.phone}</a></b></div>
          <div><small>{t("Giờ làm việc", "Hours")}</small><b>{CONTACT.hours}</b></div>
        </div>
      </div>
    </section>
  );
}
