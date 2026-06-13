import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
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

  return (
    <div className="px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
      <div className="grid w-full gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start">
        <DocsSidebar docs={docs} activeHref={doc.href} />

        <div className="mx-auto min-w-0 w-full max-w-6xl rounded-4xl border border-border/70 bg-background/95 p-5 shadow-[0_18px_56px_rgba(16,24,40,0.08)] backdrop-blur-xl sm:p-8">
          <MarkdownRenderer content={doc.content} />
        </div>
      </div>
    </div>
  );
}
