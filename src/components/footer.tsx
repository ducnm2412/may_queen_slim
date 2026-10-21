"use client";

import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/products";
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
            {/* Thông tin pháp lý: chờ sale gửi, giữ dạng [ … ] */}
            <dl className="ft2-legal">
              <div><dt>{t("Công ty", "Company")}</dt><dd>[{t("Tên công ty", "Company name")}]</dd></div>
              <div><dt>{t("Trụ sở", "Head office")}</dt><dd>[{t("Địa chỉ", "Address")}]</dd></div>
              <div><dt>MST</dt><dd>[MST]</dd></div>
              <div><dt>Hotline</dt><dd><a href={CONTACT.tel}>{CONTACT.phone}</a></dd></div>
              <div><dt>Email</dt><dd>[Email]</dd></div>
            </dl>
            <div className="social">
              <a href={CONTACT.facebook} target="_blank" rel="noopener" aria-label="Facebook"><Icon name="fb" /></a>
              <a href="#tiktok" aria-label="TikTok"><Icon name="tt" /></a>
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
        <p className="ft2-disc">{t("Thực phẩm này không phải là thuốc, không có tác dụng thay thế thuốc chữa bệnh.", "This product is not a medicine and does not replace medical treatment.")}</p>
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
  return (
    <div className="fab">
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
