import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { AssetTable } from "@/components/finance/AssetTable";
import { MarketCard } from "@/components/finance/MarketCard";
import { MarketChartPanel } from "@/components/finance/MarketChartPanel";
import { MoversPanel } from "@/components/finance/MarketMovers";
import { StatCard } from "@/components/finance/StatCard";
import { allAssets } from "@/mock/assets";
import { indexAssets, marketStats, topGainers, topLosers } from "@/mock/market";

/**
 * Página de mercados globais do FinanceHub.
 * 
 * Apresenta uma visão consolidada dos principais índices e indicadores
 * de mercado, permitindo acompanhar desempenho, movimentações e dados
 * de diferentes classes de ativos em uma única interface.
 * 
 * A página reúne índices globais, gráfico de desempenho, estatísticas
 * gerais, maiores altas e baixas e uma tabela com todos os instrumentos
 * financeiros monitorados pela aplicação.
 * 
 */

/**
 * Metadados utilizados pela página de mercados.
 * 
 * O título e a descrição são utilizados pelo navegador e por plataformas
 * de compartilhamento para identificar e descrever o conteúdo da página.
 */
const title = "Markets — FinanceHub";
const description =
  "Global indices, movers and cross-asset performance in a single professional market view.";

  /**
   * Configuração da rota de mercados.
   * 
   * Define a rota `/markets`, seus metadados para SEO e compartilhamento,
   * e associa a página ao componente `MarketsPage`.
   */
export const Route = createFileRoute("/markets")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: MarketsPage,
});

/**
 * Renderiza a página de mercados globais.
 * 
 * Exibe cards com os principais índices, um gráfico comparativo de
 * desempenho, estatísticas gerais do mercado, maiores altas e baixas
 * e uma tabela contendo todos os ativos monitorados.
 * 
 * O gráfico de desempenho utiliza os índices S&P 500, Ibovespa e Nasdaq
 * como referência para comparação entre diferentes mercados.
 * 
 * @returns Interface de mercados globais do FinanceHub.
 */
function MarketsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Global"
        title="Markets"
        description="Indices, breadth and cross-asset momentum."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {indexAssets.map((asset) => (
          <MarketCard key={asset.id} asset={asset} />
        ))}
      </div>

      <MarketChartPanel
        title="Index Performance"
        assetIds={["spx", "ibov", "nasdaq"]}
        height={340}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {marketStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} change={stat.change} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <MoversPanel title="Top Gainers" items={topGainers} direction="up" />
        <MoversPanel title="Top Losers" items={topLosers} direction="down" />
      </div>

      <AssetTable
        assets={allAssets}
        show7d
        title="Cross-asset board"
        description="Every tracked instrument in one table."
      />
    </>
  );
}