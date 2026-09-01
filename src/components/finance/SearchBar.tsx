import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Search } from "lucide-react";
import { searchAssets } from "@/mock/assets";
import type { Asset } from "@/mock/types";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { PriceChange } from "./PriceChange";
import { NoResultsState } from "@/components/states/States";

export function SearchBar({ className }: { className?: string }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Asset[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    // Simulated network latency — swap for the real API call later.
    const timer = window.setTimeout(() => {
      setResults(searchAssets(query));
      setLoading(false);
    }, 260);
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function select(asset: Asset) {
    setOpen(false);
    setQuery("");
    navigate({ to: "/asset/$symbol", params: { symbol: asset.id } });
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="flex h-10 items-center gap-2 rounded-xl border border-border bg-surface/70 px-3 transition-colors focus-within:border-primary/50">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search assets — BTC, PETR4, Apple…"
          className="w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          aria-label="Search assets"
        />
        {loading && <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" />}
      </div>

      {open && query.trim() && (
        <div className="panel absolute left-0 right-0 top-12 z-50 max-h-96 overflow-y-auto p-1.5">
          {loading ? (
            <div className="space-y-1.5 p-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-11 animate-pulse rounded-lg bg-accent/60" />
              ))}
            </div>
          ) : results.length === 0 ? (
            <NoResultsState query={query} />
          ) : (
            <ul>
              {results.map((asset) => (
                <li key={asset.id}>
                  <button
                    type="button"
                    onClick={() => select(asset)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-accent"
                  >
                    <span className="num w-16 shrink-0 text-xs font-semibold text-primary">
                      {asset.symbol}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                      {asset.name}
                    </span>
                    <span className="num hidden text-xs text-muted-foreground sm:block">
                      {formatPrice(asset.price, asset.currency)}
                    </span>
                    <PriceChange value={asset.change24h} showIcon={false} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}