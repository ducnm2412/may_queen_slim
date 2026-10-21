import type { Metadata } from "next";
import { PageHero, V2Page, Story, LiveWellV2 } from "@/components/story";

export const metadata: Metadata = {
  title: "Câu chuyện thương hiệu",
  description: "Câu chuyện Mayqueen: thon gọn từ bên trong, vẻ đẹp khởi nguồn từ thảo mộc.",
};

export default function Page() {
  return (
    <V2Page>
      <PageHero img="/img/hero/slide-2-mayqueen.jpg" crumb={["Câu chuyện", "Our story"]} a={["Hành trình", "The journey"]} b={["Từ thảo mộc Việt", "From Vietnamese botanicals"]} desc={["Triết lý chăm sóc chậm mà bền của B.O.T Việt Nam.", "Slow, lasting care by B.O.T Vietnam."]} />
      <Story />
      <LiveWellV2 />
    </V2Page>
  );
}
