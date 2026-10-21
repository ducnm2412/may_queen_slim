import type { Metadata } from "next";
import { PageHero, V2Page, Certs } from "@/components/story";

export const metadata: Metadata = {
  title: "Chứng nhận",
  description: "Giấy công bố, xác nhận quảng cáo và chứng nhận nhà máy của Mayqueen Slim.",
};

export default function Page() {
  return (
    <V2Page>
      <PageHero img="/img/duo-glass.jpg" crumb={["Chứng nhận", "Certificates"]} a={["Chứng nhận", "Certificates"]} b={["Minh bạch & an tâm", "Transparent & trusted"]} desc={["Hồ sơ pháp lý của sản phẩm và nhà máy.", "Product and factory legal documents."]} />
      <Certs />
    </V2Page>
  );
}
