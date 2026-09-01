import { ArrowUpRight } from "lucide-react";
import type { NewsItem } from "@/mock/types";
import { cn } from "@/lib/utils";

export function NewsCard({ item, featured = false }: { item: NewsItem; featured?: boolean }) {
  return (
    <article
      className={cn(
        "panel group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30",
        featured && "md:col-span-2 md:flex-row",
      )}
    >
      <div className={cn("relative overflow-hidden", featured ? "md:w-1/2" : "")}>
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          width={1024}
          height={640}
          className={cn(
            "w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]",
            featured ? "h-56 md:h-full" : "h-40",
          )}
        />
        <span className="absolute left-3 top-3 rounded-full border border-border bg-background/80 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-primary backdrop-blur">
          {item.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3
          className={cn(
            "font-semibold leading-snug text-foreground",
            featured ? "text-xl" : "text-base",
          )}
        >
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{item.summary}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <p className="text-xs text-muted-foreground">
            <span className="text-foreground/80">{item.source}</span> · {item.time}
          </p>
          <a
            href={item.url}
            className="inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-foreground"
          >
            Read
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}