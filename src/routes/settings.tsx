import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

/**
 * Página de configurações do FinanceHub.
 * 
 * Apresenta as preferências disponíveis para personalização da experiência
 * do usuário, incluindo opções relacionadas à interface, densidade das
 * tabelas, alertas de preço e resumo de notícias.
 * 
 * Também exibe informações básicas do perfil atualmente utilizado na
 * demonstração da aplicação.
 * 
 * As configurações são atualmente apenas visuais e locais à demonstração.
 */

/**
 * Metadados utilizados pela página de configurações.
 * 
 * O título e a decrição são utilizados pelo navegador e por plataformas
 * de compartilhamento para identificar e descrever o conteúdo da página.
 */
const title = "Settings — FinanceHub";
const description = "Preferences for theme, currency, alerts and profile display.";

/**
 * Configuração da rota de configurações.
 * 
 * Define a rota `/settings`, seus metadados para SEO e compartilhamento,
 * e associa a página ao componente `SettingsPage`.
 */
export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: SettingsPage,
});

/**
 * Define as opções de configuração exibidas na página.
 * 
 * Cada item contém um identificador, um rótulo apresentado ao usuário
 * e uma descrição complementar explicando o comportamento da configuração.
 */
const toggles = [
  { id: "dark", label: "Dark interface", hint: "FinanceHub is optimised for dark mode." },
  { id: "compact", label: "Compact tables", hint: "Tighter row density on data grids." },
  { id: "alerts", label: "Price alerts", hint: "Notify me on 5% intraday moves." },
  { id: "news", label: "News digest", hint: "Daily summary of market headlines." },
];

/**
 * Renderiza a página de configurações do FinanceHub.
 * 
 * Apresenta as opções de preferências definidas em `toggles` através de
 * controles `Switch`, permitindo ao usuário ativar ou desativar cada opção.
 * 
 * Também exibe uma seção de perfil contendo o identificador visual, nome
 * e plano do perfil utilizado na demonstração.
 * 
 * Os switches são inicializados com todos os valores ativos, exceto a opção
 * de tabelas compactas.
 * 
 * @returns Interface de configurações e perfil do FinanceHub.
 */
function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Preferences"
        title="Settings"
        description="Interface options. Values are local to this demo."
      />

      <section className="panel divide-y divide-border">
        {toggles.map((item, i) => (
          <div key={item.id} className="flex items-center justify-between gap-4 p-5">
            <div className="min-w-0">
              <Label htmlFor={item.id} className="text-sm font-medium text-foreground">
                {item.label}
              </Label>
              <p className="mt-1 text-xs text-muted-foreground">{item.hint}</p>
            </div>
            <Switch id={item.id} defaultChecked={i !== 1} />
          </div>
        ))}
      </section>

      <section className="panel p-5">
        <h2 className="text-sm font-semibold text-foreground">Profile</h2>
        <div className="mt-4 flex items-center gap-4">
          <span className="num grid size-12 place-items-center rounded-2xl border border-border bg-primary/15 text-sm font-semibold text-primary">
            LG
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">Lucas Gomes</p>
            <p className="truncate text-xs text-muted-foreground">Demo profile · Free plan</p>
          </div>
        </div>
      </section>
    </>
  );
}