/**
 * Utilitários para captura, descrição e recuperação de erros no servidor..
 * 
 * Intercepta erros registrados pelo `console.error` e eventos globais de erro,
 * preservando temporariamente a exceção original para que outras camadas da
 * aplicação possam recuperá-la mesmo quando o framework já tenha convertido
 * o erro em uma resposta HTTP genérica.
 * 
 * Também fornece uma representação detalhada de erros para logging, incluindo
 * stack trace, status HTTP e a cadeia de causas (`cause`).
 * 
 */

// Captures the original Error out-of-band so server.ts can recover the stack
// when h3 has already swallowed the throw into a generic 500 Response.

let lastCapturedError: { error: unknown; at: number } | undefined;
const TTL_MS = 5_000;

/**
 * Registra temporariamente um erro capturado.
 * 
 * O erro é armazenado juntamente com o instante em que foi capturado,
 * permitindo que ele seja recuperado posteriormente dentro do período
 * definido por `TTL_MS`.
 * 
 * @param error - Erro ou valor desconhecido capturado pela aplicação.
 */
function record(error: unknown) {
  lastCapturedError = { error, at: Date.now() };
}

// h3's HTTPError serializes to {"status":500,"unhandled":true,"message":"HTTPError"} —
// no stack, no cause — so a plain console.error(error) reaches the log pipeline with
// the failure detail stripped. Expand Error-like args into a string that keeps the
// message, stack, and the full cause chain.
const CAUSE_DEPTH_LIMIT = 5;
const DESCRIPTION_LENGTH_LIMIT = 8_000;

/**
 * Formata um erro em uma representação textual detalhada.
 * 
 * Percorre a cadeia de causas do erro (`cause`), incluindo stack trace,
 * mensagem, nome do erro e status HTTP quando disponíveis. Para valores
 * que não são instâncias de `Error`, utiliza uma serialização segura.
 * 
 * A quantidade de níveis da cadeia de causas e o tamanho final da descrição
 * são limitados para evitar logs excessivamente grandes ou recursões
 * descontroladas.
 * 
 * @param error - Erro ou valor desconhecido a ser descrito.
 * @returns Representação textual do erro, incluindo suas possíveis causas.
 */
export function describeError(error: unknown): string {
  const parts: string[] = [];
  let current: unknown = error;
  for (let depth = 0; depth < CAUSE_DEPTH_LIMIT && current != null; depth++) {
    if (!(current instanceof Error)) {
      parts.push(typeof current === "string" ? current : safeStringify(current));
      break;
    }
    const label = depth === 0 ? "" : "caused by: ";
    const status = describeStatus(current);
    parts.push(`${label}${current.stack ?? `${current.name}: ${current.message}`}${status}`);
    current = current.cause;
  }
  return parts.join("\n").slice(0, DESCRIPTION_LENGTH_LIMIT);
}

/**
 * Extrai o status HTTP associado a um erro, quando disponível.
 * 
 * Verifica as propriedades `status` e `statusCode`, utilizando a primeira
 * que contenha um valor numérico. Essa informação é adicionada À descrição
 * textual do erro para facilitar  identificação de falhas HTTP nos logs.
 * 
 * @param error - Erro que pode conter informações de status HTTP.
 * @returns Status HTTP formatado ou uma string vazia quando não disponível.
 */
function describeStatus(error: Error): string {
  const { status, statusCode } = error as { status?: unknown; statusCode?: unknown };
  const value = status ?? statusCode;
  return typeof value === "number" ? ` (status ${value})` : "";
}

/**
 * Serializa um valor de forma segura para utilização em logs.
 * 
 * Tenta utilizar `JSON.stringify` para representar objetos e valores
 * estruturados. Caso a serialização falhe, utilize `String`como fallback,
 * evitando que um erro durante o processo de logging cause uma nova exceção.
 * 
 * @param value - Valor desconhecido a ser serializado.
 * @returns Representação textual segura do valor.
 */
function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
}

/**
 * Verifica se um valor é uma instância de `Error`.
 * 
 * Atua como type guard do Typescript, permitindo que o valor seja tratado
 * como `Error` com segurança após a verificação.
 * 
 * @param value - Valor desconhecido a ser verificado.
 * @returns `true` quando o valor é uma instância de `Error`.
 */
function isErrorLike(value: unknown): value is Error {
  return value instanceof Error;
}

// Wrap console.error so errors logged by any layer — including h3's internal
// unhandled-error logging, which this file cannot hook directly — are both
// recorded for consumeLastCapturedError and expanded before serialization.
const originalConsoleError = console.error.bind(console);
console.error = (...args: unknown[]) => {
  const expanded = args.map((arg) => {
    if (!isErrorLike(arg)) return arg;
    record(arg);
    return describeError(arg);
  });
  originalConsoleError(...expanded);
};

if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
  globalThis.addEventListener("unhandledrejection", (event) =>
    record((event as PromiseRejectionEvent).reason),
  );
}

/**
 * Recupera e remove o último erro capturado, desde que ainda esteja dentro
 * do período de validade definido.
 * 
 * O erro é descartado automaticamente quando ultrapassa o TTL configurado.
 * Após uma recuperação bem-sucedida, o registro também é removido, evitando
 * que o mesmo erro seja consumido novamente.
 * 
 * @returns O erro capturado ou `undefined` quando não existe um erro válido.
 */
export function consumeLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  const { error } = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}
