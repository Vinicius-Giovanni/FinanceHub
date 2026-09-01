import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { AssetTable } from "@/components/finance/AssetTable";
import { MarketCard } from "@/components/finance/MarketCard";
import { MarketChartPanel } from "@/components/finance/MarketChartPanel";
import { cryptoAssets } from "@/mock/crypto";

/**
 * Página de mercado de criptomoedas do FinanceHub.
 * 
 * Apresenta os principais ativos digitais classificados por capitalização
 * de mercado, incluindo informações de preço, variações, volume e gráficos
 * de desempenho.
 * 
 * A página utiliza atualmente um dataset de criptomoedas mockado, estruturado
 * para facilitar a substituição futura por dados proveninentes de uma API.
 */

/**
 * Metadados utilizados pela página de mercado de criptomoedas.
 * 
 * O título e a descrição são utilizados pelo navegador e pelas plataformas
 * de compartilhamento para identificar e descrever o conteúdo da página.
 */
const title = "Crypto Market — FinanceHub";
const description =
  "Live-style crypto rankings with price, 24h and 7d change, market cap, volume and mini charts.";

  /**
   * Configuração da rota de criptomoedas.
   * 
   * Define a rota `/crypto`, seus metadados para SEO e compartilhamento,
   * e associa a página ao componente `CryptoPage`.
   */
export const Route = createFileRoute("/crypto")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: CryptoPage,
});

/**
 * Renderiza a página de mercado de criptomoedas.
 * 
 * Exibe os principais ativos em cards, um painel com o desempenho dos
 * principais ativos selecionados e uma tabela contendo todas as
 * criptomoeddas disponíveis no dataset.
 * 
 * Atualmente utiliza `cryptoAssets` como fonte de dados mockados,
 * permitindo que a estrutura visual seja desenvolvida independentemente
 * da integração com uma API de mercado.
 * 
 * @returns Interface do mercado de criptomoedas do FinanceHub.
 */
function CryptoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cryptocurrency"
        title="Crypto"
        description="Ranked digital assets by market capitalization."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cryptoAssets.slice(0, 4).map((asset) => (
          <MarketCard key={asset.id} asset={asset} />
        ))}
      </div>
      <MarketChartPanel title="Crypto Performance" assetIds={["btc", "eth", "sol", "bnb"]} />
      <AssetTable
        assets={cryptoAssets}
        showRank
        show7d
        title="All cryptocurrencies"
        description="Mock dataset ready to be swapped for a live API."
      />
    </>
  );
}