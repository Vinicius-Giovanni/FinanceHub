import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AppLayout } from "@/components/layout/AppLayout";

/**
 * Configuração da rota raiz da aplicação FinanceHub.
 * 
 * Define a estrutura global da aplicação, incluindo o gerencimento do
 * `QueryClient`, layout principal, metadados da página, estilos globais,
 * tratamento de páginas não encontradas e tratamento de erros em nível raiz.
 * 
 * Também configura o HTML base da aplicação e disponibiliza o `Outlet`
 * utilizado pelo TanStack Router para renderizar as rotas filhas.
 * 
 * @returns 
 */

/**
 * Renderiza a página exibida quando uma rota não é encontrada.
 * 
 * Apresenta uma mensagem de erro 404 e disponibiliza um link para retornar
 * à página inicial do FinanceHub.
 * 
 * @returns Interface de erro 404 para rotas inexistentes.
 */
function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Renderiza a interface exibida quando ocorre um erro em uma rota da aplicação.
 * 
 * Registra o erro no console e envia as informações para o mecanismo de
 * monitoramento de erros. O usuário pode tentar novamente invalidando a
 * rota atual ou retornar diretamente à página inicial.
 * 
 * @param error - Erro capturado pelo boundary de erros do TanStack Router.
 * @param reset - Função utilizada para resetar o estado do error boundary.
 * @returns Interface de erro com opções para tentar novamente ou retornar
 * ao dashboard.
 */
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Configuração principal da rota raiz do FinanceHub.
 * 
 * Define o contexto global da aplicação, metadados utilizados pelo navegador
 * e mecanismos de compartilhamento, estilos e fontesexternas, favicon,
 * layout raiz e componentes responsáveis pelo conteúdo, páginas 404 e
 * tratamento de erros.
 * 
 * O `QueryClient` é disponibilizado através do contexto da rota para permitir
 * que as rotas e componentes da aplicação utilizem o TanStack Query.
 * 
 */
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FinanceHub — Markets, Crypto & Investment Tracking" },
      {
        name: "description",
        content:
          "FinanceHub is a modern dashboard for markets, crypto, stocks and currencies.",
      },
      { name: "author", content: "FinanceHub" },
      { property: "og:title", content: "FinanceHub — Markets, Crypto & Investment Tracking" },
      {
        property: "og:description",
        content:
          "FinanceHub is a modern dashboard for markets, crypto, stocks and currencies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

/**
 * Renderiza a estrutura HTML base de aplicação.
 * 
 * Define os elementos fundamentais do documento HTML, incluindo a tag
 * `<head>` gerenciada pelo TanStack Router e os scripts necessários para
 * inicialização e funcionamento da aplicação.
 * 
 * O conteúdo recebido é renderizado dentro do `<body>`.
 * 
 * @param children - Contéudo principal da aplicação.
 * @returns Estrutura HTML raiz do FinanceHub.
 */
function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Renderiza o conteúdo principal da aplicação dentro do layout global.
 * 
 * Recupera o `QueryClient` configurado no contexto da rota raiz e o utiliza
 * para disponibilizar o `QueryClientProvider`. O `AppLayout` fornece a
 * estrutura visual compartilhada entre as páginas, enquanto o `Outlet`
 * renderiza a rota filha atualmente selecionada.
 * 
 * @returns Estrutura principal d aplicação com gerenciamento de estado
 * do TanStack Query e renderização das rotas filhas.
 */
function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </AppLayout>
    </QueryClientProvider>
  );
}
