import Link from "next/link";
import { Icon } from "@iconify/react";
import type { DocPage } from "@/lib/docs";

export function DocsPager({
  previous,
  next,
}: {
  previous?: DocPage;
  next?: DocPage;
}) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav className="mt-12 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
      {previous ? (
        <Link
          href={previous.href}
          className="group flex min-h-20 items-center gap-3 rounded-sm border border-border px-4 py-3 transition-colors hover:border-primary hover:bg-primary/5"
        >
          <Icon
            icon="mdi:arrow-left"
            className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary"
          />
          <span className="min-w-0">
            <span className="block text-xs font-semibold uppercase tracking-normal text-muted-foreground">
              Önceki
            </span>
            <span className="mt-1 block truncate text-sm font-semibold text-foreground">
              {previous.meta.title}
            </span>
          </span>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex min-h-20 items-center justify-end gap-3 rounded-sm border border-border px-4 py-3 text-right transition-colors hover:border-primary hover:bg-primary/5"
        >
          <span className="min-w-0">
            <span className="block text-xs font-semibold uppercase tracking-normal text-muted-foreground">
              Sonraki
            </span>
            <span className="mt-1 block truncate text-sm font-semibold text-foreground">
              {next.meta.title}
            </span>
          </span>
          <Icon
            icon="mdi:arrow-right"
            className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary"
          />
        </Link>
      ) : null}
    </nav>
  );
}
