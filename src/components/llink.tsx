"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useStore } from "./providers";
import { localize } from "@/lib/routes";

/** next/link tự đổi đường dẫn theo ngôn ngữ đang chọn (/chung-nhan ↔ /certificates). */
export default function Link({ href, ...rest }: ComponentProps<typeof NextLink>) {
  const { lang } = useStore();
  return <NextLink href={typeof href === "string" ? localize(href, lang) : href} {...rest} />;
}
