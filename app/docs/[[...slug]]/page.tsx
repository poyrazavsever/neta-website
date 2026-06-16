import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsPager } from "@/components/docs/docs-pager";
import { MarkdownRenderer } from "@/components/docs/markdown-renderer";
import { getAllDocs, getDocBySlug } from "@/lib/docs";

type DocsPageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export async function generateStaticParams() {
  return getAllDocs().map((doc) => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({
  params,
}: DocsPageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    return {
      title: "Docs | Neta",
    };
  }

  return {
    title: `${doc.meta.title} | Neta Docs`,
    description: doc.meta.description,
  };
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { slug = [] } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const docs = getAllDocs();
  const currentIndex = docs.findIndex((item) => item.href === doc.href);
  const previous = currentIndex > 0 ? docs[currentIndex - 1] : undefined;
  const next =
    currentIndex >= 0 && currentIndex < docs.length - 1
      ? docs[currentIndex + 1]
      : undefined;

  return (
    <div className="min-w-0 pb-8">
      <MarkdownRenderer content={doc.content} />
      <DocsPager previous={previous} next={next} />
    </div>
  );
}
