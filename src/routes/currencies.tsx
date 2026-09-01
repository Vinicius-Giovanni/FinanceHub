import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { AssetTable } from "@/components/finance/AssetTable";
import { MarketCard } from "@/components/finance/MarketCard";
import { MarketChartPanel } from "@/components/finance/MarketChartPanel";
import { StatCard } from "@/components/finance/StatCard";
import { currencyAssets } from "@/mock/currencies";
import { formatPrice } from "@/lib/format";

/**
 * Página de moedas e mercado do câmbio do FinanceHub.
 * 
 * Apresenta cotações de pares de moedas, indicadores de mercado,
 * desempenho histórico e uma tabela com os pares de câmbio disponíveis.
 * 
 * A página utiliza atualmente `currencyAssets` como fonte de dados mockados,
 * incluindo pares como USD/BR, EUR/BRL e BTC/USD, permitindo que a estrutura
 * visual seja desenvolvida antes da integração com dados reais de mercado.
 */

/**
 * Metadados utilizados pela página de moedas e câmbio.
 * 
 * O título e a descrição são utilizados pelo navegador e por plataformas
 * de compartilhamento para identificar e descrever o conteúdo da página.
 */
const title = "Currencies & FX — FinanceHub";
const description =
  "Foreign exchange pairs including USD/BRL, EUR/BRL and BTC/USD with historical charts.";

  /**
   * Configuração da rota de moedas e câmbio.
   * 
   * Define a rota `/currencies`, seus metadados para SEO e compartilhamento,
   * e associa a página ao componente `CurrenciesPage`.
   */
export const Route = createFileRoute("/currencies")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: CurrenciesPage,
});

/**
 * Renderiza a página de moedas e mercado de câmbio.
 * 
 * Exibe indicadores relacionados ao par USD/BRL, incluindo cotação atual,
 * máxima e mínima de 24 horas e o índice DXY. Também apresenta cards com
 * os principais pares disponíveis, um gráfico de desempenho histórico e
 * uma tabela contendo todos os pares de moedas do dataset.
 * 
 * O gráfico utiliza inicialmente o intervalo de três meses para facilitar
 * a análise do comportamento histórico dos pares de câmbio.
 * 
 * @returns Interface do mercado de moedas e câmbio do FinanceHub.
 */
function CurrenciesPage() {
  const usd = currencyAssets[0]!;

  return (
    <>
      <PageHeader
        eyebrow="Foreign Exchange"
        title="Currencies"
        description="Spot rates and historical behaviour of the pairs you follow."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="USD/BRL spot"
          value={formatPrice(usd.price, usd.currency)}
          change={usd.change24h}
        />
        <StatCard label="24h high" value={formatPrice(usd.high24h ?? 0, "BRL")} hint="USD/BRL" />
        <StatCard label="24h low" value={formatPrice(usd.low24h ?? 0, "BRL")} hint="USD/BRL" />
        <StatCard label="DXY Index" value="98.42" change={-0.18} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {currencyAssets.slice(0, 4).map((asset) => (
          <MarketCard key={asset.id} asset={asset} />
        ))}
      </div>

      <MarketChartPanel
        title="FX Performance"
        assetIds={currencyAssets.map((c) => c.id)}
        defaultRange="3M"
      />

      <AssetTable
        assets={currencyAssets}
        show7d
        title="Currency pairs"
        description="Mock FX dataset."
      />
    </>
  );
}