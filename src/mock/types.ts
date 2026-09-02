export interface Asset {
  id: string; symbol: string; name: string; kind: "crypto" | "stock" | "currency" | "index";
  price: number; currency: string; change24h: number; change7d?: number; marketCap: number; volume24h: number;
  spark: number[]; rank?: number; high24h?: number; low24h?: number; ath?: number;
  circulatingSupply?: number; supplyUnit?: string; performance?: { label: string; value: number }[];
}
export interface NewsItem { id: string; title: string; excerpt: string; category: string; image: string; source: string; time: string; summary: string; url: string; }
