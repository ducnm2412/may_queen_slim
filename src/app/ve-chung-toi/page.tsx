import type { Metadata } from "next";
import { AboutPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Về chúng tôi",
  description: "Câu chuyện Mayqueen: thương hiệu wellness D2C của B.O.T Việt Nam, giữ dáng nhẹ nhàng và bền vững từ thảo mộc.",
};

export default function Page() {
  return <AboutPage />;
}
