import { allAssets } from "./assets";
export interface MoverItem { id: string; symbol: string; name: string; price: number; change: number; }
export const indexAssets = allAssets.filter((asset) => asset.kind === "index");
const movers = allAssets.map(({ id, symbol, name, price, change24h }) => ({ id, symbol, name, price, change: change24h }));
export const topGainers = [...movers].sort((a, b) => b.change - a.change).slice(0, 4);
export const topLosers = [...movers].sort((a, b) => a.change - b.change).slice(0, 4);
export const marketStats = [{ label: "Market cap", value: "$2.6T", change: 1.2 }, { label: "24h volume", value: "$96B", change: -0.8 }, { label: "BTC dominance", value: "52.1%", change: 0.3 }, { label: "Fear & greed", value: "68", change: 2.4 }];
export const marketSession = { isOpen: true, label: "Markets open", closesAt: "16:00 ET" };
