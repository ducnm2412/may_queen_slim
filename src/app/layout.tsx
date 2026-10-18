import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Icons } from "@/components/icons";
import { Shell } from "@/components/shell";

const beVietnam = localFont({
  variable: "--font-body",
  display: "swap",
  src: [
    { path: "./fonts/be-vietnam-pro-vietnamese-400-normal.woff2", weight: "400" },
    { path: "./fonts/be-vietnam-pro-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/be-vietnam-pro-vietnamese-500-normal.woff2", weight: "500" },
    { path: "./fonts/be-vietnam-pro-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/be-vietnam-pro-vietnamese-700-normal.woff2", weight: "700" },
    { path: "./fonts/be-vietnam-pro-latin-700-normal.woff2", weight: "700" },
  ],
});


export const metadata: Metadata = {
  title: { default: "Mayqueen Slim · Sáng đốt mỡ, tối thanh lọc", template: "%s · Mayqueen Slim" },
  description:
    "Mayqueen Slim & Yodetox Extra từ B.O.T Việt Nam. Combo Sáng – Tối 30 ngày, thảo mộc lành tính, giao toàn quốc.",
  openGraph: {
    title: "Mayqueen Slim Official",
    description: "Combo Sáng – Tối: Mayqueen Slim hỗ trợ chuyển hoá mỡ, Yodetox Extra thanh lọc dịu nhẹ.",
    images: ["/img/combo-open.jpg"],
    locale: "vi_VN",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F1F15",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={beVietnam.variable}>
      <body>
        <Icons />
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  );
}
