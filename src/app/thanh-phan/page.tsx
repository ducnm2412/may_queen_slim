import type { Metadata } from "next";
import { PageHero, V2Page, Ingredients, Products } from "@/components/story";

export const metadata: Metadata = {
  title: "Thành phần",
  description: "Thành phần Mayqueen Slim (buổi sáng) và Yodetox Extra (buổi tối).",
};

export default function Page() {
  return (
    <V2Page>
      <PageHero img="/img/v2/story-herbs.jpg" crumb={["Thành phần", "Ingredients"]} a={["Thành phần", "Ingredients"]} b={["Tinh tuý thảo mộc", "Botanical essence"]} desc={["Từng lớp thành phần trong nghi thức Sáng – Tối.", "Every layer of the day–night ritual."]} />
      <Ingredients />
      <Products />
    </V2Page>
  );
}
