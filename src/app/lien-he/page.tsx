import type { Metadata } from "next";
import { PageHero, V2Page, Consult } from "@/components/story";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Tư vấn liệu trình 1:1 miễn phí qua hotline, Zalo 039 5057 364 (8:00–21:00).",
};

export default function Page() {
  return (
    <V2Page>
      <PageHero img="/img/v2/company.jpg" pos="20% 35%" crumb={["Liên hệ", "Contact"]} a={["Liên hệ", "Contact"]} b={["Tư vấn miễn phí", "Free consultation"]} desc={["Chuyên viên phản hồi trong 15 phút (8:00–21:00).", "A consultant replies within 15 minutes (8:00–21:00)."]} />
      <Consult />
    </V2Page>
  );
}
