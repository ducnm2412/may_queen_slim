import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { POSTS, POST_BY_SLUG } from "@/lib/posts";
import { BlogArticle } from "@/components/pages";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = POST_BY_SLUG[slug];
  if (!p) return { title: "Không tìm thấy bài viết" };
  return { title: p.title[0], description: p.excerpt[0], openGraph: { images: [p.img] } };
}

export default function Page({ params }: { params: Params }) {
  return (
    <Suspense fallback={<main className="page" aria-busy="true" />}>
      <ArticleBySlug params={params} />
    </Suspense>
  );
}

async function ArticleBySlug({ params }: { params: Params }) {
  const { slug } = await params;
  if (!POST_BY_SLUG[slug]) notFound();
  return <BlogArticle slug={slug} />;
}
