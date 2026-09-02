import type { NewsItem } from "./types";
export const newsCategories = ["Markets", "Crypto", "Stocks", "Economy"];
export const newsItems: NewsItem[] = [
  { id: "1", title: "Markets extend gains as investors assess inflation", excerpt: "Major indexes moved higher in a broad-based session.", category: "Markets", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1024&q=80", source: "FinanceHub", time: "2h ago", summary: "Major indexes moved higher in a broad-based session.", url: "#" },
  { id: "2", title: "Bitcoin holds above key support", excerpt: "Digital assets trade in a narrow range after a volatile week.", category: "Crypto", image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=1024&q=80", source: "FinanceHub", time: "3h ago", summary: "Digital assets trade in a narrow range after a volatile week.", url: "#" },
  { id: "3", title: "Technology shares lead the session", excerpt: "Large-cap technology names outperformed the wider market.", category: "Stocks", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1024&q=80", source: "FinanceHub", time: "5h ago", summary: "Large-cap technology names outperformed the wider market.", url: "#" },
];
