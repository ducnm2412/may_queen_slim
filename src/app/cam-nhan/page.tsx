import type { Metadata } from "next";
import { PageHero, V2Page, Reviews, LiveWellV2 } from "@/components/story";

export const metadata: Metadata = {
  title: "Cảm nhận khách hàng",
  description: "Cảm nhận của khách hàng dùng Mayqueen Slim và Yodetox Extra.",
};

export default function Page() {
  return (
    <V2Page>
      <PageHero img="/img/v2/tvc-3-tu-tin.jpg" crumb={["Cảm nhận", "Reviews"]} a={["Cảm nhận", "Reviews"]} b={["Từ khách hàng", "From our customers"]} desc={["Những chia sẻ sau hành trình Sáng – Tối.", "Stories after the day–night ritual."]} />
      <Reviews />
      <LiveWellV2 />
    </V2Page>
  );
}
