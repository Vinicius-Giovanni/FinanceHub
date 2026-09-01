import { AlertTriangle, Inbox, SearchX } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CardSkeletonGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="panel space-y-3 p-4">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="panel divide-y divide-border">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4">
          <Skeleton className="size-9 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="hidden h-3.5 w-20 sm:block" />
          <Skeleton className="h-3.5 w-14" />
          <Skeleton className="hidden h-8 w-24 md:block" />
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("panel space-y-4 p-5", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="h-8 w-56 rounded-full" />
      </div>
      <Skeleton className="h-[280px] w-full rounded-lg" />
    </div>
  );
}

interface StateProps {
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export function ErrorState({ title, description, action, className }: StateProps) {
  return (
    <div className={cn("panel flex flex-col items-center gap-3 px-6 py-14 text-center", className)}>
      <span className="grid size-11 place-items-center rounded-full bg-[color-mix(in_oklab,var(--down)_16%,transparent)] text-down">
        <AlertTriangle className="size-5" />
      </span>
      <p className="text-base font-semibold text-foreground">{title}</p>
      {description && (
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {action && (
        <Button variant="outline" size="sm" className="mt-2" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

export function EmptyState({ title, description, action, className }: StateProps) {
  return (
    <div className={cn("panel flex flex-col items-center gap-3 px-6 py-14 text-center", className)}>
      <span className="grid size-11 place-items-center rounded-full bg-accent text-muted-foreground">
        <Inbox className="size-5" />
      </span>
      <p className="text-base font-semibold text-foreground">{title}</p>
      {description && (
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {action && (
        <Button variant="outline" size="sm" className="mt-2" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

export function NoResultsState({ query, className }: { query: string; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-2 px-6 py-10 text-center", className)}>
      <SearchX className="size-5 text-muted-foreground" />
      <p className="text-sm font-medium text-foreground">No results for "{query}"</p>
      <p className="text-xs text-muted-foreground">
        Try a ticker like BTC, PETR4 or a company name.
      </p>
    </div>
  );
}