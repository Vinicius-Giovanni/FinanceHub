import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Asset } from "@/mock/types";
import { formatCompact, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useWatchlist } from "@/lib/watchlist";
import { PriceChange } from "./PriceChange";
import { Sparkline } from "./Sparkline";

interface AssetTableProps {
  assets: Asset[];
  showRank?: boolean;
  show7d?: boolean;
  title?: string;
  description?: string;
}

export function AssetTable({
  assets,
  showRank = false,
  show7d = false,
  title,
  description,
}: AssetTableProps) {
  return (
    <section className="panel overflow-hidden">
      {(title || description) && (
        <header className="flex flex-wrap items-end justify-between gap-2 border-b border-border px-5 py-4">
          <div>
            {title && <h2 className="text-sm font-semibold text-foreground">{title}</h2>}
            {description && (
              <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          <span className="num text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {assets.length} assets
          </span>
        </header>
      )}

      <div className="scrollbar-slim overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              <th className="px-5 py-3 text-left font-medium">
                {showRank ? "Rank" : "#"}
              </th>
              <th className="px-3 py-3 text-left font-medium">Asset</th>
              <th className="px-3 py-3 text-right font-medium">Price</th>
              <th className="px-3 py-3 text-right font-medium">24h</th>
              {show7d && <th className="px-3 py-3 text-right font-medium">7d</th>}
              <th className="px-3 py-3 text-right font-medium">Market Cap</th>
              <th className="px-3 py-3 text-right font-medium">Volume</th>
              <th className="px-5 py-3 text-right font-medium">Chart</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <AssetRow
                key={asset.id}
                asset={asset}
                index={index + 1}
                showRank={showRank}
                show7d={show7d}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

interface AssetRowProps {
  asset: Asset;
  index: number;
  showRank?: boolean;
  show7d?: boolean;
}

export function AssetRow({ asset, index, showRank, show7d }: AssetRowProps) {
  const { has, toggle } = useWatchlist();
  const starred = has(asset.id);

  return (
    <tr className="group border-b border-border/60 transition-colors last:border-0 hover:bg-accent/40">
      <td className="px-5 py-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={starred ? "Remove from watchlist" : "Add to watchlist"}
            onClick={() => toggle(asset.id)}
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Star className={cn("size-3.5", starred && "fill-primary text-primary")} />
          </button>
          <span className="num text-xs text-muted-foreground">
            {showRank ? (asset.rank ?? index) : index}
          </span>
        </div>
      </td>
      <td className="px-3 py-3">
        <Link
          to="/asset/$symbol"
          params={{ symbol: asset.id }}
          className="flex min-w-0 items-center gap-3"
        >
          <span className="num grid size-8 shrink-0 place-items-center rounded-full border border-border bg-surface text-[10px] font-semibold text-primary">
            {asset.symbol.slice(0, 3)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium text-foreground group-hover:text-primary">
              {asset.name}
            </span>
            <span className="num block text-[11px] uppercase tracking-wider text-muted-foreground">
              {asset.symbol}
            </span>
          </span>
        </Link>
      </td>
      <td className="num px-3 py-3 text-right font-medium text-foreground">
        {formatPrice(asset.price, asset.currency)}
      </td>
      <td className="px-3 py-3 text-right">
        <PriceChange value={asset.change24h} className="justify-end" showIcon={false} />
      </td>
      {show7d && (
        <td className="px-3 py-3 text-right">
          <PriceChange value={asset.change7d ?? 0} className="justify-end" showIcon={false} />
        </td>
      )}
      <td className="num px-3 py-3 text-right text-muted-foreground">
        {formatCompact(asset.marketCap)}
      </td>
      <td className="num px-3 py-3 text-right text-muted-foreground">
        {formatCompact(asset.volume24h)}
      </td>
      <td className="px-5 py-3">
        <div className="ml-auto w-24">
          <Sparkline
            data={asset.spark}
            up={asset.change24h >= 0}
            id={asset.id}
            height={32}
            className="h-8"
          />
        </div>
      </td>
    </tr>
  );
}