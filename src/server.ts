import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

/**
 * Contrato mínimo esperado pela entrada do servidor do TanStack Start.
 * 
 * A implementação recebe uma requisição HTTP, juntamente com o ambiente
 * e o contexto de execução, e retorna uma resposta HTTP.
 */
type ServerEntry = {
    fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

/**
 * Promise utilizada para armazenar a entrada do servidor carregada
 * dinamicamente, evitando que o módulo seja importado repetidamente.
 */
let serverEntryPromise: Promise<ServerEntry> | undefined;

/**
 * Carrega  entrada do servidor do TanStack Start de forma assíncrona.
 * 
 * O resultado é armazenado em cache na primeira execução para que
 * chamadas posteriores reutilizem a mesma implementação do servidor.
 */
async function getServerEntry(): Promise<ServerEntry> {
    if (!serverEntryPromise) {
        serverEntryPromise = import("@tanstack/react-start/server-entry").then(
            (m) => (m.default ?? m) as ServerEntry,
        );
    }
    return serverEntryPromise;
}

/**
 * Normaliza respostas catastróficas de SSR geradas pelo h3.
 * 
 * Em determinadas situações, o h3 transforma erros internos em uma
 * resposta HTTP 500 contendo um JSON indicando que o erro foi tratado
 * internamente. Essa função identifica esse formato e o substitui por
 * uma página de erro HTML apropriada para o usuário.
 * 
 * Respostas que não correspondem a esse cenário são retornadas sem
 * alterações.
 */

/**
 * h3 swallows in-handler throws into a normal 500 Response with body
 * {"unhandled":true, "message":"HTTPError"} - try/catch alone never fires for those.
 */
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
    if (response.status < 500) return response;
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) return response;

    const body = await response.clone().text();
    if(!isH3SwallowedErrorBody(body)) return response;

    console.error(consumeLastCapturedErro() ?? new Error('h3 swallowed SSR error: &{body}'));
    return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
    });
}

/**
 * Verifica se uma resposta JSON possui o formato específico utilizado
 * pelo h3 quando um erro interno é absorvido durante o processamento.
 * 
 * @param body - Corpo da resposta recebido como texto.
 * @returns true quando o corpo corresponde ao formato de erro do h3.
 */
function isH3SwallowedErrorBody(body: string): boolean {
    try {
        const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
        return payload.unhandled === true && payload.message === "HTTPError";
    } catch {
        return false;
    }
}

/**
 * Ponto de entrada HTTP do servidor da aplicação
 * 
 * Recebe as requisições, obtém a implementação do servidor do
 * TanStack Start, executa o processamento e normaliza possíveis
 * erros catastróficos de SSR.
 * 
 * Erros que não são tratados pelo fluxo interno são registrados
 * no console e convertidos em uma resposta HTTP 500 contendo
 * uma página de erro HTML.
 */
export default {
    async fetch(request: Request, env: unknown, ctx: unknown) {
        try {
            const handler = await getServerEntry();
            const response = await handler.fetch(request, env, ctx);
            return await normalizeCatastrophicSsrResponse(response);
        } catch (error) {
            console.error(error);
            return new Response(renderErrorPage(), {
                status: 500,
                headers: { "content-type": "text/html; charset=utf-8" },
            });
        }
    },
};