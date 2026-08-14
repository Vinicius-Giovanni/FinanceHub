import {
    createStart,
    createCsrfMiddleware,
    createMiddleware,
} from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

/**
 * Middleware responsável por tratar erros inesperados durante o processamento
 * das requisições do servidor.
 * 
 * Erros que já possuem um status HTTP são propagados para que o TanStack Start
 * possa tratá-los normalmente. Outros erros são registrados no console e
 * convertidos em uma resposta HTTP 500 contendo uma página de erro.
 */

const errorMiddleware = createMiddleware().server(async ({ next }) => {
    try {
        return await next();
    } catch (error) {
        if (error != null && typeof error === "object" && "statusCode" in error) {
            throw error;
        }
        console.error(error);
        return new Response(renderErrorPage(), {
            status: 500,
            headers: { 'content-type': 'text/html; charset=utf-8' },
        });
    }
});

/**
 * Start installs this automatically when src/start.ts is absent; defining the
 * file opts out, so re-add it explicitly to keep server functions protected
 * from cross-site requests.
 */
const csrfMiddleware = createCsrfMiddleware({
    filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
    requestMiddleware: [errorMiddleware, csrfMiddleware],
}));