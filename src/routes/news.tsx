import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { NewsCard } from "@/components/finance/NewsCard";
import { EmptyState } from "@/components/state/States";
import { Skeleton } from "@/components/ui/skeleton";
import { newsCategories, newsItems } from "@/mock/news";
import { cn } from "@/lib/utils";

/**
 * Página de notícias financeiras do FinanceHub.
 * 
 * Apresenta manchetes relacionadas aos mercados financeiros, criptomoedas,
 * ações, economia e tecnologia, permitindo filtrar as notícias por categoria.
 * 
 * A página possui estados de carregamento e estado vazio para proporcionar
 * uma experiência consistente durante a atualização dos filtros ou quando
 * não existem notícias disponíveis na categoria selecionada.
 * 
 */

/**
 * Metadados utilizados pela página de notícias.
 * 
 * O título e a descrição são utilizados pelo navegador e por plataformas
 * de compartilhamento para identificar e descrever o conteúdo da página.
 */
const title = "Financial News — FinanceHub";
const description =
  "Curated market, crypto, stock, economy and technology headlines with category filters.";

  /**
   * Configuração da rota da notícias.
   * 
   * Define a rota `/news`, seus metadados para SEO e compartilhamento,
   * e associa a página ao componente `NewsPage`.
   */
export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: NewsPage,
});

/**
 * Renderiza a página de notícias financeiras.
 * 
 * Mantém o estado da categoria selecionada e controla um estado de
 * carregamento simulado para apresentar skeletons durante a atualização dos filtros.
 * 
 * As notícias são filtradas de acordo com a categoria selecionada.
 * Quando "All" está selecionado, todas as notícias disponiveis são exibidas.
 * 
 * A primeira notícia é destacada quando a categoria "All" está selecionada,
 * proporcionando maior destaque à notícia principal da página.
 * 
 * @returns Interface de notícias do FinaceHub, incluindo filtros,
 *  estado de carregamento, estado vazio e cards de notícias.
 */
function NewsPage() {
  const [category, setCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 420);
    return () => window.clearTimeout(timer);
  }, [category]);

  const items =
    category === "All" ? newsItems : newsItems.filter((n) => n.category === category);

  return (
    <>
      <PageHeader
        eyebrow="Newsroom"
        title="News"
        description="Headlines shaping today's session."
      />

      <div className="scrollbar-slim flex gap-2 overflow-x-auto pb-1">
        {["All", ...newsCategories].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setLoading(true);
              setCategory(cat);
            }}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
              category === cat
                ? "border-primary/40 bg-primary/15 text-primary"
                : "border-border bg-surface/60 text-muted-foreground hover:text-foreground",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="panel overflow-hidden">
              <Skeleton className="h-40 w-full rounded-none" />
              <div className="space-y-3 p-5">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          title="No stories in this category"
          description="Try another category — new headlines arrive throughout the session."
          action={{ label: "Show all news", onClick: () => setCategory("All") }}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, i) => (
            <NewsCard key={item.id} item={item} featured={i === 0 && category === "All"} />
          ))}
        </div>
      )}
    </>
  );
}