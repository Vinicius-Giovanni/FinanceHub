import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

/**
 * Cria e configura o Router principal da aplicação.
 * 
 * Utiliza a árvore de rotas gerada pelo TanStack Router e
 * disponíbiliza uma instância do QueryClient no contexto das
 * rotas para gerenciamento de dados e cache através do
 * TanStack Query.
 * 
 * Também configura recursos de navegação, como restauração
 * da posição de scroll e comportamento de preload das rotas.
 * 
 * @returns Uma instância configurada do TanStack Router.
 */

export const getRouter = () => {
    const queryClient = new QueryClient();

    const router = createRouter({
        routeTree,
        context: { queryClient },
        scrollRestoration: true,
        defaultPreloadStaleTime: 0,
    });

    return router;
};