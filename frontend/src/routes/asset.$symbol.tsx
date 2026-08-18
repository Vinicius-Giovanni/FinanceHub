import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { MarketChart } from "@/components/finance/MarketChart";
import { PriceChange } from "@/components/finance/PriceChange";
import { StatCard } from "@/components/finance/StatCard";
import { TimeRangeSelector } from "@/components/finance/TimeRangeSelector";
import { ErrorState } from "@/components/states/States";
import { Button } from "@/components/ui/button";
import { getAsset } from "@/mock/assets";
import type { Range } from "@/mock/series";
import { formatCompact, formatNumber, formatPrice } from "@/lib/format";
import { useWatchlist } from "@/lib/watchlist";
import { cn } from "@/lib/utils";

/**
 * Página de detalhes de um ativo financeiro
 * 
 * Exibe informações detalhadas do ativo selecionado, incluindo preço atual,
 * variação de 24 hroas, indicadores de mercado, gráfico histórico e
 * desempenho em diferentes períodos.
 * 
 * A página também permite adicionar ou remover o ativo da watchlist e
 * disponibiliza seleção de diferentes intervalos para visualização do
 * histórico de preços.
 * 
 * Quando o símbolo informado na rota não corresponde a um ativo disponível
 * no dataset, uma tela de erro é exibida com uma ação para retornar ao
 * dashboard.
 */

/**
 * Configuração da rota de detalhes da um ativo.
 * 
 * Define a estrutura da rota dinâmica `/asset/$symbol`, configura os
 * metadados utilizados para SEO e compartilhamento e associa a rota ao
 * componente `AssetDetailPage`.
 * 
 * O título e a descrição da página são gerados dinamicamente com base
 * no ativo identificado pelo símbolo recebido nos parâmetros da rota.
 */
export const Route = createFileRoute("/asset/$symbol")({
  head: ({ params }) => {
    const asset = getAsset(params.symbol);
    const title = asset
      ? `${asset.name} (${asset.symbol}) Price & Chart — FinanceHub`
      : "Asset — FinanceHub";
    const description = asset
      ? `${asset.name} trading at ${formatPrice(asset.price, asset.currency)} with statistics, historical chart and performance breakdown.`
      : "Asset details and historical performance on FinanceHub.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: AssetDetailPage,
});

/**
 * Renderiza a página de detalhes de um ativo financeiro.
 * 
 * Recupera o símbolo do ativo a partir dos parâmetros da rota e utiliza
 * os dados correspondentes para montar os indicadores, gráfico histórico,
 * desempenho e informações gerais do ativo.
 * 
 * O componente mantém localmente o intervalo selecionado para o gráfico
 * e utiliza o contexto da watchlist para consultar e alterar o estado de
 * acompanhamento do ativo.
 * 
 * Quanto o ativo não é encontrado, renderiza `ErrorState` com uma opção
 * para retornar ao ddashboard.
 * 
 * @returns Interface de detalhes do ativo financeiro ou uma tela de erro
 * quando o ativo não é encontrado.
 */
function AssetDetailPage() {
  const { symbol } = Route.useParams();
  const navigate = useNavigate();
  const [range, setRange] = useState<Range>("1M");
  const { has, toggle } = useWatchlist();
  const asset = getAsset(symbol);

  if (!asset) {
    return (
      <ErrorState
        title={`We couldn't find "${symbol}"`}
        description="This ticker isn't part of the mock dataset yet."
        action={{ label: "Back to dashboard", onClick: () => navigate({ to: "/" }) }}
      />
    );
  }

  const starred = has(asset.id);
  const up = asset.change24h >= 0;
  const performance =
    asset.performance ??
    [
      { label: "1 Day", value: asset.change24h },
      { label: "1 Week", value: asset.change7d ?? asset.change24h * 1.8 },
      { label: "1 Month", value: asset.change24h * 3.2 },
      { label: "3 Months", value: asset.change24h * 5.1 },
      { label: "1 Year", value: asset.change24h * 9.4 },
    ];

  return (
    <>
      <PageHeader
        eyebrow={asset.kind.toUpperCase()}
        title={asset.name}
        description={asset.symbol}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggle(asset.id)}
            className={cn(starred && "border-primary/40 text-primary")}
          >
            <Star className={cn("size-4", starred && "fill-primary")} />
            {starred ? "In watchlist" : "Add to watchlist"}
          </Button>
        }
      />

      <section className="panel flex flex-wrap items-end gap-x-6 gap-y-3 p-5">
        <span className="num text-3xl font-semibold text-foreground sm:text-4xl">
          {formatPrice(asset.price, asset.currency)}
        </span>
        <PriceChange value={asset.change24h} variant="pill" size="lg" />
        <span className="text-xs text-muted-foreground">
          24h range {formatPrice(asset.low24h ?? asset.price, asset.currency)} –{" "}
          {formatPrice(asset.high24h ?? asset.price, asset.currency)}
        </span>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Market Cap" value={formatCompact(asset.marketCap)} />
        <StatCard label="Volume 24h" value={formatCompact(asset.volume24h)} />
        <StatCard label="24h High" value={formatPrice(asset.high24h ?? 0, asset.currency)} />
        <StatCard label="24h Low" value={formatPrice(asset.low24h ?? 0, asset.currency)} />
        <StatCard label="All Time High" value={formatPrice(asset.ath ?? 0, asset.currency)} />
        <StatCard
          label="Circulating Supply"
          value={
            asset.circulatingSupply
              ? `${formatNumber(asset.circulatingSupply)} ${asset.supplyUnit ?? ""}`
              : "—"
          }
        />
      </section>

      <section className="panel p-4 sm:p-5">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-foreground">Historical Chart</h2>
          <TimeRangeSelector value={range} onChange={setRange} />
        </header>
        <div className="mt-5">
          <MarketChart
            seriesKey={asset.id}
            price={asset.price}
            currency={asset.currency}
            range={range}
            up={up}
            height={360}
          />
        </div>
      </section>

      <section className="panel p-5">
        <h2 className="text-base font-semibold text-foreground">Performance</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-5">
          {performance.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-border bg-surface/50 px-4 py-3"
            >
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {item.label}
              </p>
              <PriceChange value={item.value} size="md" className="mt-1.5" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}