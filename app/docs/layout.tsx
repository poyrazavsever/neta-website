import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsRightRail } from "@/components/docs/docs-right-rail";
import { getAllDocs } from "@/lib/docs";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const docs = getAllDocs();

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <DocsSidebar docs={docs} />
      <main className="min-h-dvh px-5 pb-10 pt-20 lg:py-8 lg:pl-72 lg:pr-8 xl:pr-10">
        <div className="grid w-full max-w-none gap-10 xl:grid-cols-[minmax(0,48rem)_18rem] 2xl:grid-cols-[minmax(0,54rem)_19rem]">
          <div className="min-w-0">{children}</div>
          <DocsRightRail />
        </div>
      </main>
    </div>
  );
}
