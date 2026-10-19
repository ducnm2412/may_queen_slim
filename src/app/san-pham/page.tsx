import type { Metadata } from "next";
import { ShopPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Sản phẩm",
  description: "Mayqueen Slim, Yodetox Extra và các combo liệu trình 30, 60, 90 ngày. Freeship từ 700k, COD toàn quốc.",
};

export default function Page() {
  return <ShopPage />;
}
