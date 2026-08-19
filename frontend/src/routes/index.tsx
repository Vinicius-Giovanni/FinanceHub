import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { MarketCard } from "@/components/finance/MarketCard";
import { MarketChartPanel } from "@/components/finance/MarketChartPanel";
import { MoversPanel } from "@/components/finance/MarketMovers";
import { AssetTable } from "@/components/finance/AssetTable";
import { StatCard } from "@/components/finance/StatCard";
import { NewsCard } from "@/components/finance/NewsCard";
import { chartAssetIds, getAsset, overviewIds } from "@/mock/assets";
import { cryptoAssets } from "@/mock/crypto";
import { marketStats, topGainers, topLosers } from "@/mock/market";
import { newsItems } from "@/mock/news";

/**
 * Página principal do FinanceHub.
 * 
 * Apresenta uma visão consolidada dos principais mercados monitorados pela
 * aplicação, reunindo ativos financeiros, gráficos de desempenho, maiores
 * altas e baixas, indicadores de mercado, criptomoedas e notícias recentes.
 * 
 */

/**
 * Metadados utilizados pela página principal.
 * 
 * O título e a descrição são utilizados pelo navegador e por plataformas
 * de compartilhamento para identificar e descrever o conteúdo do dashboard.
 */
const title = "FinanceHub — Live Market, Crypto & Stock Dashboard";
const description =
  "Track crypto, stocks, indices and currencies in one elegant dashboard with charts, movers and market news.";

  /**
   * Configuração da rota principal do FinanceHub.
   * 
   * Define a rota `/`, seus metadados para SEO e compartilhamento,
   * e associa a página ao componente `Dashboard`.
   */
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Dashboard,
});

/**
 * Renderiza o dashboard principal do FinanceHub.
 * 
 * Consolida diferentes fontes de dados para apresentar uma visão geral
 * do mercado. Exibe os ativos de destaque, gráficos de desempenho, maiores
 * altas e baixas, indicadores gerais, principais criptomoedas e notícias
 * recentes.
 * 
 * Os ativos apresentados na seção de visão geral são obtidos a partir dos
 * identificadores definidos em `overviewIds`. Apenas ativos encontrados
 * no dataset são renderizados.
 * 
 * @returns Interface principal do dashboard do FinanceHub.
 */
function Dashboard() {
  const overview = overviewIds.map((id) => getAsset(id)).filter(Boolean);

  return (
    <>
      <PageHeader
        eyebrow="Market Overview"
        title="Dashboard"
        description="A consolidated view of global markets, updated with mock data."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overview.map((asset) => (
          <MarketCard key={asset!.id} asset={asset!} />
        ))}
      </div>

      <MarketChartPanel assetIds={chartAssetIds} height={340} />

      <div className="grid gap-4 lg:grid-cols-2">
        <MoversPanel title="Top Gainers" items={topGainers} direction="up" />
        <MoversPanel title="Top Losers" items={topLosers} direction="down" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {marketStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} change={stat.change} />
        ))}
      </div>

      <AssetTable
        assets={cryptoAssets.slice(0, 5)}
        showRank
        show7d
        title="Cryptocurrency"
        description="Top assets by market capitalization"
      />

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-lg font-semibold text-foreground">Latest news</h2>
          <Link
            to="/news"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-foreground"
          >
            All news <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {newsItems.slice(0, 3).map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}