import type { Metadata } from "next";
import { BlogIndex } from "@/components/pages";

export const metadata: Metadata = {
  title: "Sống đẹp",
  description: "Cẩm nang lifestyle, thực đơn eat clean và bí quyết giữ dáng an toàn cùng Mayqueen.",
};

export default function Page() {
  return <BlogIndex />;
}
