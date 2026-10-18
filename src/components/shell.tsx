"use client";

import type { ReactNode } from "react";
import { Header } from "./header";
import { Fab, Footer, Toast } from "./footer";
import { CartDrawer } from "./cart-drawer";
import { RevealObserver } from "./reveal";
import { Lightbox } from "./lightbox";

/** Khung dùng chung cho mọi trang: header nổi, footer, giỏ hàng trượt, nút nổi, toast. */
export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <Fab />
      <Toast />
      <CartDrawer />
      <Lightbox />
      <RevealObserver />
    </>
  );
}
