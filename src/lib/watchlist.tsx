import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Contexto e hook para gerenciament oda watchlist de ativos do FinanceHub.
 * 
 * Centraliza o estado dos ativos acompanhados pelo usuário e disponibiliza
 * operações para consultar, adicionar, remover e limpar ativos da watchlist.
 * 
 * Os dados são persistidos no `localstorage` do navegador, permitindo que a
 * seleção do usuário seja mantida entre diferentes sessões  aplicação.
 * 
 * Quando não eiste uma watchlist previamente armazenada, os valores
 * definidos em `defaultWatchlist` são utilizados como estado inicial.
 */

const STORAGE_KEY = "financehub:watchlist";

/**
 * Define as operações e dados disponibilizados pelo WatchlistContext.
 * 
 * @property ids - Identificadores dos ativos atualmente presentes na watchilist.
 * @property has - Verifica se um determinado ativo está presente na watchlist.
 * @property toggle - Adiciona o ativo caso não esteja presente ou remove caso esteja.
 * @property remove - Remove um ativo específico da watchlist.
 * @property clear - Remove todos os ativos da watchlist.
 */
interface WatchlistValue {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const WatchlistContext = createContext<WatchlistValue | null>(null);

/**
 * Disponibiliza o estado e as operações da watchlist para os componentes
 * descendentes da aplicação.
 * 
 * Inicializa a watchlist utilizando `defaultWatchlist` e posteriormente
 * tenta recuperar os dados persistidos no `localStorage`. Sempre que o
 * estado da watchlist é alterado, os novos dados são persistidos
 * automaticamente no armazenamento local do navegador.
 * 
 * @param children - Componentes React que terão acesso ao contexto da watchlist.
 * @returns Provider responsável por disponibilizar o WatchlistContext.
 */
export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) as string[] : defaultWatchlist;
    } catch {
      return defaultWatchlist;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* ignore */
    }
  }, [ids]);

  const toggle = useCallback((id: string) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const remove = useCallback((id: string) => {
    setIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const value = useMemo<WatchlistValue>(
    () => ({
      ids,
      has: (id: string) => ids.includes(id),
      toggle,
      remove,
      clear: () => setIds([]),
    }),
    [ids, toggle, remove],
  );

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

/**
 * Hook para acessar o contexto da watchlist.
 * 
 * Permite que componentes consumidores consultem os ativos acompanhados
 * e executem operações como adicionar, remover, alternar ou limpar ativos.
 * 
 * O hook exige que o componente esteja dentro de um `WatchlistProvider`.
 * Caso contrário, lança um erro indicando a configuração incorreta
 * da árvore de componentes.
 * 
 * @returns Dados e operações disponíveis no WatchlistContext.
 * @throws Error quando utilizado fora de um `WatchlistProvider`.
 */
export function useWatchlist(): WatchlistValue {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be used within WatchlistProvider");
  return ctx;
}