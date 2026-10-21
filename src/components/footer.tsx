"use client";

import Image from "next/image";
import Link from "./llink";
import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/products";
import { scrollToTarget } from "@/lib/scroll";
import { useStore } from "./providers";
import { Icon } from "./icons";

export function Footer() {
  const { t } = useStore();
  return (
    <footer className="footer ft2">
      <div className="wrap">
        <div className="ft2-grid">
          <div className="ft2-brand">
            <div className="flogo">
              <Image className="bot" src="/img/bot-logo.png" alt="B.O.T Việt Nam" width={56} height={56} />
              <b>Mayqueen<span> Slim</span></b>
            </div>
            <dl className="ft2-legal">
              <div><dt>{t("Đơn vị", "Company")}</dt><dd>{CONTACT.company}</dd></div>
              <div><dt>{t("Địa chỉ", "Address")}</dt><dd><a href={CONTACT.maps} target="_blank" rel="noopener">{CONTACT.address}</a></dd></div>
              <div><dt>{t("Liên hệ", "Contact")}</dt><dd>{CONTACT.person}</dd></div>
              <div><dt>Hotline</dt><dd><a href={CONTACT.tel}>{CONTACT.phone}</a></dd></div>
            </dl>
            <div className="social">
              <a href={CONTACT.facebook} target="_blank" rel="noopener" aria-label="Facebook"><Icon name="fb" /></a>
              <a href={CONTACT.zalo} target="_blank" rel="noopener" aria-label="Zalo" className="zl">Zalo</a>
            </div>
          </div>
          <div>
            <h4>{t("Sản phẩm", "Products")}</h4>
            <ul>
              <li><Link href="/san-pham/cb30">{t("Combo Sáng – Tối", "Day–Night combo")}</Link></li>
              <li><Link href="/san-pham/mq">Mayqueen Slim</Link></li>
              <li><Link href="/san-pham/yd">Yodetox Extra</Link></li>
              <li><Link href="/san-pham">{t("Cửa hàng", "Shop")}</Link></li>
              <li><Link href="/song-dep">{t("Sống đẹp cùng Mayqueen", "Live well")}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t("Chính sách", "Policies")}</h4>
            <ul>
              <li><Link href="/chinh-sach/doi-tra">{t("Đổi trả", "Returns")}</Link></li>
              <li><Link href="/chinh-sach/van-chuyen">{t("Giao hàng", "Shipping")}</Link></li>
              <li><Link href="/chinh-sach/bao-mat">{t("Bảo mật", "Privacy")}</Link></li>
              <li><Link href="/chinh-sach/thanh-toan">{t("Thanh toán", "Payment")}</Link></li>
            </ul>
          </div>
          <div className="ft2-map">
            <iframe title={t("Bản đồ trụ sở", "Head office map")} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={CONTACT.mapEmbed} />
          </div>
        </div>
        <div className="fbot">
          <p>© 2026 Mayqueen Slim · B.O.T Việt Nam</p>
          <nav>
            <Link href="/chinh-sach/bao-mat">{t("Chính sách bảo mật", "Privacy policy")}</Link>
            <Link href="/chinh-sach/dieu-khoan">{t("Điều khoản", "Terms")}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export function Fab() {
  const { t } = useStore();
  const [up, setUp] = useState(false);
  useEffect(() => {
    const on = () => setUp(scrollY > 600);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <div className="fab">
      <button type="button" className={`top${up ? " on" : ""}`} aria-label={t("Lên đầu trang", "Back to top")} tabIndex={up ? 0 : -1} onClick={() => scrollToTarget(0)}>
        <svg viewBox="0 0 24 24" className="ic"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
      </button>
      <a className="z" href={CONTACT.zalo} target="_blank" rel="noopener" aria-label="Chat Zalo">Zalo</a>
      <a className="m" href={CONTACT.facebook} target="_blank" rel="noopener" aria-label="Messenger"><Icon name="msg" /></a>
      <a className="c" href={CONTACT.tel} aria-label={t("Gọi hotline", "Call hotline")}><Icon name="phone" /></a>
    </div>
  );
}

export function Toast() {
  const { toastMsg, toastShown } = useStore();
  return <div className={`toast${toastShown ? " show" : ""}`} role="status">{toastMsg}</div>;
}
