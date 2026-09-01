import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPercent } from "@/lib/format";

interface PriceChangeProps {
  value: number;
  className?: string;
  variant?: "plain" | "pill";
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export function PriceChange({
  value,
  className,
  variant = "plain",
  size = "sm",
  showIcon = true,
}: PriceChangeProps) {
  const up = value >= 0;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={cn(
        "num inline-flex items-center gap-1 font-medium tabular-nums",
        up ? "text-up" : "text-down",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        size === "lg" && "text-base",
        variant === "pill" &&
          cn(
            "rounded-full px-2 py-0.5",
            up
              ? "bg-[color-mix(in_oklab,var(--up)_16%,transparent)]"
              : "bg-[color-mix(in_oklab,var(--down)_16%,transparent)]",
          ),
        className,
      )}
    >
      {showIcon && <Icon className="size-3.5 shrink-0" aria-hidden />}
      {formatPercent(value)}
    </span>
  );
}