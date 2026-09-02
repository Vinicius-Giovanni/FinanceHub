import type { Asset } from "./types";
const spark = (base: number) => [base * .94, base * .97, base * .96, base * 1.01, base];
export const allAssets: Asset[] = [
  { id: "btc", symbol: "BTC", name: "Bitcoin", kind: "crypto", price: 68240, currency: "USD", change24h: 2.4, change7d: 5.7, marketCap: 1.35e12, volume24h: 28e9, spark: spark(68240), rank: 1, high24h: 69100, low24h: 66200, ath: 73750, circulatingSupply: 19.7e6, supplyUnit: "BTC" },
  { id: "eth", symbol: "ETH", name: "Ethereum", kind: "crypto", price: 3450, currency: "USD", change24h: 1.1, change7d: 3.4, marketCap: 415e9, volume24h: 15e9, spark: spark(3450), rank: 2 },
  { id: "sol", symbol: "SOL", name: "Solana", kind: "crypto", price: 145, currency: "USD", change24h: -0.8, change7d: 2.1, marketCap: 68e9, volume24h: 3e9, spark: spark(145), rank: 5 },
  { id: "aapl", symbol: "AAPL", name: "Apple", kind: "stock", price: 212.4, currency: "USD", change24h: 0.7, change7d: 1.9, marketCap: 3.2e12, volume24h: 55e6, spark: spark(212.4) },
  { id: "msft", symbol: "MSFT", name: "Microsoft", kind: "stock", price: 428.2, currency: "USD", change24h: 1.2, change7d: 2.8, marketCap: 3.1e12, volume24h: 21e6, spark: spark(428.2) },
  { id: "nvda", symbol: "NVDA", name: "NVIDIA", kind: "stock", price: 121.3, currency: "USD", change24h: -1.1, change7d: 4.2, marketCap: 2.95e12, volume24h: 180e6, spark: spark(121.3) },
  { id: "petr4", symbol: "PETR4", name: "Petrobras", kind: "stock", price: 37.8, currency: "BRL", change24h: 0.5, change7d: -0.3, marketCap: 490e9, volume24h: 680e6, spark: spark(37.8) },
  { id: "vale3", symbol: "VALE3", name: "Vale", kind: "stock", price: 59.5, currency: "BRL", change24h: -0.4, change7d: 1.5, marketCap: 270e9, volume24h: 410e6, spark: spark(59.5) },
  { id: "usdbrl", symbol: "USD/BRL", name: "US Dollar / Real", kind: "currency", price: 5.42, currency: "BRL", change24h: 0.2, change7d: -0.4, marketCap: 0, volume24h: 0, spark: spark(5.42), high24h: 5.45, low24h: 5.39 },
  { id: "eurbrl", symbol: "EUR/BRL", name: "Euro / Real", kind: "currency", price: 5.88, currency: "BRL", change24h: -0.1, change7d: 0.7, marketCap: 0, volume24h: 0, spark: spark(5.88) },
  { id: "spx", symbol: "S&P 500", name: "S&P 500", kind: "index", price: 5250, currency: "USD", change24h: 0.4, change7d: 1.1, marketCap: 0, volume24h: 0, spark: spark(5250) },
  { id: "ibov", symbol: "IBOV", name: "Ibovespa", kind: "index", price: 128300, currency: "BRL", change24h: -0.2, change7d: 0.8, marketCap: 0, volume24h: 0, spark: spark(128300) },
  { id: "nasdaq", symbol: "NASDAQ", name: "Nasdaq Composite", kind: "index", price: 16800, currency: "USD", change24h: 0.6, change7d: 1.6, marketCap: 0, volume24h: 0, spark: spark(16800) },
];
export const overviewIds = ["btc", "eth", "aapl", "petr4"];
export const chartAssetIds = ["btc", "eth", "aapl"];
export const defaultWatchlist = ["btc", "aapl", "petr4"];
export const getAsset = (id: string) => allAssets.find((asset) => asset.id === id);
export const searchAssets = (query: string) => { const value = query.trim().toLowerCase(); return allAssets.filter((asset) => asset.name.toLowerCase().includes(value) || asset.symbol.toLowerCase().includes(value)); };
