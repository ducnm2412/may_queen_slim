"use client";

import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/products";
import { useStore } from "./providers";
import { Icon } from "./icons";

export function Footer() {
  const { t } = useStore();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="fgrid">
          <div>
            <div className="flogo">
              <Image className="bot" src="/img/bot-logo.png" alt="B.O.T Việt Nam" width={56} height={56} />
              <b>Mayqueen<span>Slim</span></b>
            </div>
            <p className="fd">{t("Thương hiệu wellness D2C của B.O.T Việt Nam. Giữ dáng và thanh lọc từ thảo mộc.", "A D2C wellness brand by B.O.T Vietnam. Herbal slimming and detox for a light, healthy body.")}</p>
            <div className="social">
              <a href={CONTACT.facebook} target="_blank" rel="noopener" aria-label="Facebook"><Icon name="fb" /></a>
              <a href="#tiktok" aria-label="TikTok"><Icon name="tt" /></a>
              <a href={CONTACT.zalo} target="_blank" rel="noopener" aria-label="Zalo"><Icon name="msg" /></a>
              <a href={CONTACT.tel} aria-label="Hotline"><Icon name="phone" /></a>
              <a href={CONTACT.maps} target="_blank" rel="noopener" aria-label="Google Maps"><Icon name="pin" /></a>
            </div>
          </div>
          <div>
            <h4>{t("Sản phẩm", "Products")}</h4>
            <ul>
              <li><Link href="/san-pham/cb30">{t("Combo Sáng – Tối", "Day–Night combo")}</Link></li>
              <li><Link href="/san-pham/mq">Mayqueen Slim</Link></li>
              <li><Link href="/san-pham/yd">Yodetox Extra</Link></li>
              <li><Link href="/san-pham">{t("Tất cả sản phẩm", "All products")}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t("Công ty", "Company")}</h4>
            <ul>
              <li><Link href="/ve-chung-toi">{t("Về chúng tôi", "About us")}</Link></li>
              <li><Link href="/song-dep">{t("Sống đẹp", "Live well")}</Link></li>
              <li><Link href="/lien-he">{t("Liên hệ", "Contact")}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t("Chính sách", "Policies")}</h4>
            <ul>
              <li><Link href="/chinh-sach/van-chuyen">{t("Vận chuyển", "Shipping")}</Link></li>
              <li><Link href="/chinh-sach/doi-tra">{t("Đổi trả", "Returns")}</Link></li>
              <li><Link href="/chinh-sach/bao-mat">{t("Bảo mật", "Privacy")}</Link></li>
              <li><Link href="/chinh-sach/dieu-khoan">{t("Điều khoản", "Terms")}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t("Thanh toán", "Payment")}</h4>
            <div className="paylogos"><span>COD</span><span>{t("Chuyển khoản", "Bank transfer")}</span></div>
            <h4 style={{ marginTop: 18 }}>{t("Vận chuyển", "Shipping")}</h4>
            <div className="paylogos"><span>{t("Toàn quốc", "Nationwide")}</span><span>{t("Freeship 700k", "Free from 700k")}</span></div>
          </div>
        </div>
        <div className="fbot">
          <p>
            © 2026 Mayqueen Slim · B.O.T Việt Nam · {CONTACT.address} ·{" "}
            <strong>{t("Thực phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.", "This product is not a medicine and does not replace medical treatment.")}</strong>
          </p>
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
