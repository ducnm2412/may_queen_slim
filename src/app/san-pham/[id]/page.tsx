import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, PRODUCT_BY_ID } from "@/lib/products";
import { ProductDetail } from "@/components/product-detail";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = PRODUCT_BY_ID[id];
  if (!p) return { title: "Không tìm thấy sản phẩm" };
  return {
    title: p.name,
    description: p.spec,
    openGraph: { images: [p.img] },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  if (!PRODUCT_BY_ID[id]) notFound();
  return <ProductDetail id={id} />;
}
