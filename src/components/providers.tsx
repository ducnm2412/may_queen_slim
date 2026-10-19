"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { PRODUCT_BY_ID } from "@/lib/products";

export type Lang = "vi" | "en";
type Cart = Record<string, number>;

type Store = {
  lang: Lang;
  toggleLang: () => void;
  /** Chọn chuỗi theo ngôn ngữ hiện tại. */
  t: (vi: string, en: string) => string;
  cart: Cart;
  cartCount: number;
  cartTotal: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  wish: Set<string>;
  toggleWish: (id: string) => void;
  toast: (msg: string) => void;
  toastMsg: string;
  toastShown: boolean;
  bump: number;
  query: string;
  setQuery: (q: string) => void;
  lightbox: { src: string; alt: string } | null;
  openImage: (src: string, alt?: string) => void;
  closeImage: () => void;
};

const Ctx = createContext<Store | null>(null);

const CART_KEY = "mq-cart";
const WISH_KEY = "mq-wish";

export function Providers({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("vi");
  const [cart, setCart] = useState<Cart>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [wish, setWish] = useState<Set<string>>(() => new Set());
  const [toastMsg, setToastMsg] = useState("");
  const [toastShown, setToastShown] = useState(false);
  const [bump, setBump] = useState(0);
  const [query, setQuery] = useState("");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const openImage = useCallback((src: string, alt = "") => setLightbox({ src, alt }), []);
  const closeImage = useCallback(() => setLightbox(null), []);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    // Đọc giỏ hàng đã lưu sau khi hydrate để không lệch HTML server/client.
    queueMicrotask(() => {
      try {
        const raw = localStorage.getItem(CART_KEY);
        if (raw) setCart(JSON.parse(raw));
        const w = localStorage.getItem(WISH_KEY);
        if (w) setWish(new Set(JSON.parse(w)));
      } catch {}
      hydrated.current = true;
    });
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(WISH_KEY, JSON.stringify([...wish]));
    } catch {}
  }, [wish]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    document.body.classList.toggle("cart-open", cartOpen);
  }, [cartOpen]);

  const t = useCallback((vi: string, en: string) => (lang === "en" ? en : vi), [lang]);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastShown(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastShown(false), 1800);
  }, []);

  const add = useCallback(
    (id: string, qty = 1) => {
      const p = PRODUCT_BY_ID[id];
      if (!p) return;
      setCart((c) => ({ ...c, [id]: (c[id] || 0) + qty }));
      setBump((b) => b + 1);
      toast(t("Đã thêm ", "Added ") + (lang === "en" && p.nameEn ? p.nameEn : p.name));
    },
    [lang, t, toast],
  );

  const setQty = useCallback((id: string, qty: number) => {
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  }, []);

  const toggleWish = useCallback(
    (id: string) => {
      setWish((w) => {
        const n = new Set(w);
        if (n.has(id)) {
          n.delete(id);
          toast(t("Đã bỏ yêu thích", "Removed from wishlist"));
        } else {
          n.add(id);
          toast(t("Đã thêm vào yêu thích", "Added to wishlist"));
        }
        return n;
      });
    },
    [t, toast],
  );

  const { cartCount, cartTotal } = useMemo(() => {
    let n = 0;
    let total = 0;
    for (const [id, q] of Object.entries(cart)) {
      const p = PRODUCT_BY_ID[id];
      if (!p || q <= 0) continue;
      n += q;
      total += q * p.price;
    }
    return { cartCount: n, cartTotal: total };
  }, [cart]);

  const value: Store = {
    lang,
    toggleLang: () => setLang((l) => (l === "vi" ? "en" : "vi")),
    t,
    cart,
    cartCount,
    cartTotal,
    add,
    setQty,
    clearCart: () => setCart({}),
    cartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    wish,
    toggleWish,
    toast,
    toastMsg,
    toastShown,
    bump,
    query,
    setQuery,
    lightbox,
    openImage,
    closeImage,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore must be used inside <Providers>");
  return s;
}
