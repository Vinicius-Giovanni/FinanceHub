import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Star, X } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AssetTable } from "@/components/finance/AssetTable";
import { MarketCard } from "@/components/finance/MarketCard";
import { EmptyState } from "@/components/state/States";
import { getAsset } from "@/mock/assets";
import { useWatchlist } from "@/lib/watchlist";
import { Button } from "@/components/ui/button";

/**
 * Página de watchlist do FinanceHub.
 *
 * Apresenta os ativos marcados como favoritos pelo usuário, permitindo
 * acompanhar diferentes classes de ativos em um único local.
 *
 * A watchlist é armazenada localmente através do `useWatchlist`, não
 * necessitando de uma conta ou persistência em servidor.
 *
 * A página disponibiliza cards dos ativos acompanhados, uma lista compacta
 * de favoritos com opção de remoção individual e uma tabela contendo todos
 * os ativos monitorados.
 *
 * Quando a watchlist está vazia, apresenta um estado vazio com uma ação
 * para navegar até a página de criptomoedas e adicionar ativos.
 */

/**
 * Metadados utilizados pela página de watchlist.
 *
 * O título e a descrição são utilizados pelo navegador e por plataformas
 * de compartilhamento para identificar e descrever o conteúdo da página.
 */
const title = "Watchlist — FinanceHub";
const description = "Your starred assets across crypto, equities and currencies in one place.";

/**
 * Configuração da rota de watchlist.
 *
 * Define a rota `/watchlist`, seus metadados para SEO e compartilhamento,
 * e associa a página ao componente `WatchlistPage`.
 */
export const Route = createFileRoute("/watchlist")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: WatchlistPage,
});

/**
 * Renderiza a página de ativos favoritos.
 *
 * Recupera os identificadores armazenados na watchlist e resolve cada um
 * para o ativo correspondente através de `getAsset`. Identificadores que
 * não possuem um ativo correspondente são ignorados.
 *
 * Quando existem ativos na watchlist, exibe até quatro deles em cards,
 * uma lista compacta com opção de remoção individual e uma tabela com
 * todos os ativos acompanhados.
 *
 * A ação "Clear all" permite remover todos os ativos de uma única vez.
 * Quando não existem ativos, um `EmptyState` é exibido com uma ação para
 * navegar até a página de criptomoedas.
 *
 * @returns Interface da watchlist ou estado vazio quando nenhum ativo
 *          está sendo acompanhado.
 */
function WatchlistPage() {
  const { ids, remove, clear } = useWatchlist();
  const navigate = useNavigate();
  const assets = ids.map((id) => getAsset(id)).filter((a) => a !== undefined);

  return (
    <>
      <PageHeader
        eyebrow="Favorites"
        title="Watchlist"
        description="Local, mock-backed favorites — no account needed."
        actions={
          assets.length > 0 ? (
            <Button variant="outline" size="sm" onClick={clear}>
              Clear all
            </Button>
          ) : undefined
        }
      />

      {assets.length === 0 ? (
        <EmptyState
          title="Your watchlist is empty"
          description="Star any asset from the tables to keep an eye on it here."
          action={{ label: "Browse crypto", onClick: () => navigate({ to: "/crypto" }) }}
        />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {assets.slice(0, 4).map((asset) => (
              <MarketCard key={asset.id} asset={asset} />
            ))}
          </div>

          <ul className="flex flex-wrap gap-2">
            {assets.map((asset) => (
              <li
                key={asset.id}
                className="flex items-center gap-2 rounded-full border border-border bg-surface/60 py-1.5 pl-3 pr-2 text-xs"
              >
                <Star className="size-3 fill-primary text-primary" />
                <span className="text-foreground">{asset.name}</span>
                <button
                  onClick={() => remove(asset.id)}
                  aria-label={`Remove ${asset.name}`}
                  className="text-muted-foreground transition-colors hover:text-down"
                >
                  <X className="size-3.5" />
                </button>
              </li>
            ))}
          </ul>

          <AssetTable
            assets={assets}
            show7d
            title="Tracked assets"
            description="Everything you starred, side by side."
          />
        </>
      )}
    </>
  );
}