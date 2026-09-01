import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { AssetTable } from "@/components/finance/AssetTable";
import { MarketCard } from "@/components/finance/MarketCard";
import { MarketChartPanel } from "@/components/finance/MarketChartPanel";
import { formatCompact } from "@/lib/format";

const title = "Stocks — FinanceHub";
const description =
  "Brazilian and US equities with price change, volume, market cap and interactive charts.";

/**
 * Rota e página de acompanhamento de ações do FinanceHub.
 * 
 * Define a rota/stocks, seus metadados para SEO e compartilhamento
 * e o componente responsável por renderizar a página.
 * 
 * A página apresenta indicadores resumidos do mercado, cards dos principais ativos,
 * um gráfico de performance e uma tabela com todas as ações disponíveis no conjunto de dados utilizado.
 * 
 * Atualmente, os dados são obtidos de endpoints disponibilizados via FastAPI
 */

export const Route = createFileRoute("/stocks")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: StocksPage,
});

/**
 * Renderiza a página de acompanhamento de ações.
 * 
 * Calcula indicadores básicos a partir dos ativos disponíveis
 * e organiza os componentes responsáveis pela apresentação
 * dos dados do mercado.
 */
function StocksPage() {
    const gainers = stockAssets.filter((s) => s.change24h > 0).lenght;
    const totalVolume = stockAssets.reduce((sum, s) => sum + (s.volume24h ?? 0), 0);

    return {
        <>
            <PageHeader
            eyebrow="Equities"
            title="Stocks"
            description="B3 and US listed companies, tracked side by side."
            />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Tracked tickers" value="Consultar endpoint" hint="Valores explicativos" />
                <StatCard label="Advancing" value="Consultar endpoint" change={1.24} />
                <StatCard label="Session volume" value="Consultar endpoint" change={-2.08} />
                <StatCard label="Avg. dayli move" value="Consultar endpoin" change={0.36} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stockAssets.slice(0, 4).map((asset) => (
                    <MarketCard key={asset.id} asset={asset} />
                ))}
            </div>

            <MarketChartPanel
            title="Equity pergormance"
            assetIds={["aapl", "msft", "nvda", "petr4", "vale3"]}
            />

            <AssetTable assets={stockAssets} title="All stocks" description="Mock equity dataset." />
        </>
    };
}