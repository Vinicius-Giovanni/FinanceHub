import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PriceChange } from "./PriceChange";

interface StatCardProps {
  label: string;
  value: ReactNode;
  change?: number;
  hint?: string;
  className?: string;
}

export function StatCard({ label, value, change, hint, className }: StatCardProps) {
  return (
    <div className={cn("panel p-4 transition-colors hover:border-primary/30", className)}>
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className="num mt-2 text-lg font-semibold text-foreground sm:text-xl">{value}</p>
      <div className="mt-1 flex items-center gap-2">
        {change !== undefined && <PriceChange value={change} />}
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
    </div>
  );
}