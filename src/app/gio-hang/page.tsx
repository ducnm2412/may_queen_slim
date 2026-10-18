import type { Metadata } from "next";
import { CartPage } from "@/components/cart-page";

export const metadata: Metadata = {
  title: "Giỏ hàng",
  description: "Xem lại giỏ hàng và đặt hàng Mayqueen Slim, Yodetox Extra. COD hoặc chuyển khoản, freeship từ 700k.",
};

export default function Page() {
  return <CartPage />;
}
