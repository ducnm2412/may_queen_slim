import type { Metadata } from "next";
import { WishlistPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Sản phẩm yêu thích",
  robots: { index: false },
};

export default function Page() {
  return <WishlistPage />;
}
