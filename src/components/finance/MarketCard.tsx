import { Link } from "@tanstack/react-router";
import type { Asset } from "@/mock/types";
import { formatPrice } from "@/lib/format";
import { PriceChange } from "./PriceChange";
import { Sparkline } from "./Sparkline";

export function MarketCard({ asset }: { asset: Asset }) {
  const up = asset.change24h >= 0;
  return (
    <Link
      to="/asset/$symbol"
      params={{ symbol: asset.id }}
      className="panel group relative block overflow-hidden p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{asset.name}</p>
          <p className="num mt-0.5 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {asset.symbol}
          </p>
        </div>
        <PriceChange value={asset.change24h} variant="pill" />
      </div>
      <p className="num relative mt-4 text-2xl font-semibold text-foreground">
        {formatPrice(asset.price, asset.currency)}
      </p>
      <div className="relative mt-3 h-10">
        <Sparkline data={asset.spark} up={up} id={asset.id} />
      </div>
    </Link>
  );
}