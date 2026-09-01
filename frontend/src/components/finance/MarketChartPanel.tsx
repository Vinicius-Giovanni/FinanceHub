import { useState } from "react";
import { getAsset } from "@/mock/assets";
import type { Range } from "@/mock/series";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { MarketChart } from "./MarketChart";
import { PriceChange } from "./PriceChange";
import { TimeRangeSelector } from "./TimeRangeSelector";

interface MarketChartPanelProps {
  title?: string;
  assetIds: string[];
  height?: number;
  defaultRange?: Range;
}

export function MarketChartPanel({
  title = "Market Performance",
  assetIds,
  height = 320,
  defaultRange = "1M",
}: MarketChartPanelProps) {
  const [activeId, setActiveId] = useState(assetIds[0] ?? "btc");
  const [range, setRange] = useState<Range>(defaultRange);
  const asset = getAsset(activeId);
  if (!asset) return null;

  return (
    <section className="panel p-4 sm:p-5">
      <header className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <span className="num text-2xl font-semibold text-foreground">
              {formatPrice(asset.price, asset.currency)}
            </span>
            <PriceChange value={asset.change24h} variant="pill" size="md" />
            <span className="text-xs text-muted-foreground">{asset.name}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="scrollbar-slim flex gap-1 overflow-x-auto rounded-full border border-border bg-surface/60 p-1">
            {assetIds.map((id) => {
              const item = getAsset(id);
              if (!item) return null;
              return (
                <button
                  key={id}
                  onClick={() => setActiveId(id)}
                  className={cn(
                    "num shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors",
                    activeId === id
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.symbol}
                </button>
              );
            })}
          </div>
          <TimeRangeSelector value={range} onChange={setRange} />
        </div>
      </header>

      <div className="mt-5">
        <MarketChart
          seriesKey={asset.id}
          price={asset.price}
          currency={asset.currency}
          range={range}
          up={asset.change24h >= 0}
          height={height}
        />
      </div>
    </section>
  );
}