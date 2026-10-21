import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond, Dancing_Script } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import "./v2.css";
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

const script = Dancing_Script({ subsets: ["vietnamese", "latin"], weight: ["600", "700"], variable: "--font-script", display: "swap" });

const serif = Cormorant_Garamond({ subsets: ["vietnamese", "latin"], weight: ["500", "600", "700"], variable: "--font-serif", display: "swap" });

const bricolage = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "./fonts/bricolage-grotesque-vietnamese-600-normal.woff2", weight: "600" },
    { path: "./fonts/bricolage-grotesque-latin-600-normal.woff2", weight: "600" },
    { path: "./fonts/bricolage-grotesque-latin-ext-600-normal.woff2", weight: "600" },
    { path: "./fonts/bricolage-grotesque-vietnamese-800-normal.woff2", weight: "800" },
    { path: "./fonts/bricolage-grotesque-latin-800-normal.woff2", weight: "800" },
    { path: "./fonts/bricolage-grotesque-latin-ext-800-normal.woff2", weight: "800" },
  ],
});


export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://may-queen-slim.vercel.app"),
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
  themeColor: "#1F2E22",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${beVietnam.variable} ${bricolage.variable} ${script.variable} ${serif.variable}`}>
      <body>
        <Icons />
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  );
}
