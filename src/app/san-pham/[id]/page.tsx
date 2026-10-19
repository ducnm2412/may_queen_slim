import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PRODUCTS, PRODUCT_BY_ID } from "@/lib/products";
import { ProductDetail } from "@/components/product-detail";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const p = PRODUCT_BY_ID[id];
  if (!p) return { title: "Không tìm thấy sản phẩm" };
  return {
    title: p.name,
    description: p.spec,
    openGraph: { images: [p.img] },
  };
}

/**
 * Đọc `params` bên trong <Suspense> để khi chuyển trang, khung trang hiện ngay
 * và nội dung sản phẩm đổ vào sau (theo hướng dẫn instant navigation của Next 16).
 */
export default function Page({ params }: { params: Params }) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductById params={params} />
    </Suspense>
  );
}

async function ProductById({ params }: { params: Params }) {
  const { id } = await params;
  if (!PRODUCT_BY_ID[id]) notFound();
  return <ProductDetail id={id} />;
}

/** Khung chờ cùng bố cục với trang chi tiết để không nháy layout. */
function ProductSkeleton() {
  return (
    <main className="page" aria-busy="true" aria-label="Đang tải sản phẩm">
      <div className="wrap">
        <div className="sk sk-line" style={{ width: 220, marginBottom: 22 }} />
        <div className="pdp">
          <div className="pdp-gallery">
            <div className="sk" style={{ aspectRatio: "1 / 1", borderRadius: "var(--r-lg)" }} />
          </div>
          <div className="pdp-info" style={{ display: "grid", gap: 14 }}>
            <div className="sk sk-line" style={{ width: 110 }} />
            <div className="sk" style={{ height: 44, width: "70%" }} />
            <div className="sk sk-line" style={{ width: "50%" }} />
            <div className="sk" style={{ height: 34, width: 180, marginTop: 8 }} />
            <div className="sk sk-line" />
            <div className="sk sk-line" style={{ width: "85%" }} />
            <div className="sk" style={{ height: 48, width: "90%", marginTop: 12, borderRadius: 99 }} />
          </div>
        </div>
      </div>
    </main>
  );
}
