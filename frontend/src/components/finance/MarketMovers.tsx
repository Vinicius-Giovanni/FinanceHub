import { Link } from "@tanstack/react-router";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { MoverItem } from "@/mock/market";
import { formatPrice } from "@/lib/format";
import { PriceChange } from "./PriceChange";
import { cn } from "@/lib/utils";

interface MoversPanelProps {
  title: string;
  items: MoverItem[];
  direction: "up" | "down";
}

export function MoversPanel({ title, items, direction }: MoversPanelProps) {
  const Icon = direction === "up" ? TrendingUp : TrendingDown;
  const maxAbs = Math.max(...items.map((i) => Math.abs(i.change)), 1);

  return (
    <section className="panel p-5">
      <header className="flex items-center gap-2">
        <span
          className={cn(
            "grid size-7 place-items-center rounded-lg",
            direction === "up"
              ? "bg-[color-mix(in_oklab,var(--up)_16%,transparent)] text-up"
              : "bg-[color-mix(in_oklab,var(--down)_16%,transparent)] text-down",
          )}
        >
          <Icon className="size-4" />
        </span>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </header>

      <ul className="mt-4 space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              to="/asset/$symbol"
              params={{ symbol: item.id }}
              className="group relative flex items-center gap-3 overflow-hidden rounded-lg px-3 py-2.5 transition-colors hover:bg-accent/60"
            >
              <span
                aria-hidden
                className={cn(
                  "absolute inset-y-0 left-0 opacity-15 transition-all duration-500",
                  direction === "up" ? "bg-up" : "bg-down",
                )}
                style={{ width: `${(Math.abs(item.change) / maxAbs) * 100}%` }}
              />
              <span className="num relative w-16 shrink-0 text-sm font-semibold text-foreground">
                {item.symbol}
              </span>
              <span className="relative min-w-0 flex-1 truncate text-xs text-muted-foreground">
                {item.name}
              </span>
              <span className="num relative hidden text-xs text-muted-foreground sm:block">
                {formatPrice(item.price)}
              </span>
              <PriceChange value={item.change} className="relative" size="md" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}