import type { Metadata } from "next";
import { ContactPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Hotline, Zalo 039 5057 364. Tư vấn liệu trình 1:1 miễn phí, phản hồi trong 15 phút (8:00–21:00). Hà Đông, Hà Nội.",
};

export default function Page() {
  return <ContactPage />;
}
