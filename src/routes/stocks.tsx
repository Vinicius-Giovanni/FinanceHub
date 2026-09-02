import { createFileRoute } from "@tanstack/react-router";
import { AssetTable } from "@/components/finance/AssetTable";
import { MarketCard } from "@/components/finance/MarketCard";
import { MarketChartPanel } from "@/components/finance/MarketChartPanel";
import { StatCard } from "@/components/finance/StatCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatCompact } from "@/lib/format";
import { stockAssets } from "@/mock/stocks";

const title = "Stocks — FinanceHub";
const description = "Brazilian and US equities with price change, volume, market cap and interactive charts.";

export const Route = createFileRoute("/stocks")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }] }),
  component: StocksPage,
});

function StocksPage() {
  const gainers = stockAssets.filter((asset) => asset.change24h > 0).length;
  const totalVolume = stockAssets.reduce((sum, asset) => sum + asset.volume24h, 0);
  const averageMove = stockAssets.reduce((sum, asset) => sum + asset.change24h, 0) / stockAssets.length;

  return (
    <>
      <PageHeader eyebrow="Equities" title="Stocks" description="B3 and US listed companies, tracked side by side." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Tracked tickers" value={stockAssets.length} hint="B3 and US equities" />
        <StatCard label="Advancing" value={`${gainers}/${stockAssets.length}`} change={(gainers / stockAssets.length) * 100} />
        <StatCard label="Session volume" value={formatCompact(totalVolume)} />
        <StatCard label="Average daily move" value={`${averageMove.toFixed(2)}%`} change={averageMove} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stockAssets.slice(0, 4).map((asset) => <MarketCard key={asset.id} asset={asset} />)}
      </div>
      <MarketChartPanel title="Equity performance" assetIds={["aapl", "msft", "nvda", "petr4", "vale3"]} />
      <AssetTable assets={stockAssets} title="All stocks" description="Equity dataset." />
    </>
  );
}
