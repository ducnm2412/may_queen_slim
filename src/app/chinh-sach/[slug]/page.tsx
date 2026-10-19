import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { POLICIES, POLICY_BY_SLUG } from "@/lib/policies";
import { PolicyPage } from "@/components/pages";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return POLICIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = POLICY_BY_SLUG[slug];
  return p ? { title: p.title[0], description: p.intro[0] } : { title: "Không tìm thấy trang" };
}

export default function Page({ params }: { params: Params }) {
  return (
    <Suspense fallback={<main className="page" aria-busy="true" />}>
      <PolicyBySlug params={params} />
    </Suspense>
  );
}

async function PolicyBySlug({ params }: { params: Params }) {
  const { slug } = await params;
  if (!POLICY_BY_SLUG[slug]) notFound();
  return <PolicyPage slug={slug} />;
}
