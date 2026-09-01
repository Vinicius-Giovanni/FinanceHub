import { cn } from "@/lib/utils";
import type { Range } from "@/mock/series";

const ranges: Range[] = ['1D', '1W', '1M', '3M', '1Y'];

export function TimeRangeSelector({ value, onChange }: { value: Range; onChange: (range: Range) => void}) {
  return (
    <div className="flex rounded-lg border border-border bg-surface/60 p-1" aria-label="Chart range">
      {ranges.map((range) => (
        <button key={range} type="button" onClick={() => onChange(range)} className={cn("rounded-md px-2 py-1 text-xs", value === range ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
          {range}
        </button>
      ))}
    </div>
  );
}