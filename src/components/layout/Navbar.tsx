import { Bell } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchBar } from "@/components/finance/SearchBar";
import { marketSession } from "@/mock/market";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-3 py-3 sm:gap-4 sm:px-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
          <span className="hidden font-display text-sm font-semibold tracking-tight lg:block">
            Finance<span className="text-primary">Hub</span>
          </span>
        </div>

        <SearchBar className="mx-auto w-full max-w-xl" />

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 md:flex">
            <span className="relative flex size-2">
              <span
                className={cn(
                  "absolute inline-flex size-full animate-ping rounded-full opacity-70",
                  marketSession.isOpen ? "bg-up" : "bg-down",
                )}
              />
              <span
                className={cn(
                  "relative inline-flex size-2 rounded-full",
                  marketSession.isOpen ? "bg-up" : "bg-down",
                )}
              />
            </span>
            <span className="text-xs font-medium text-foreground">{marketSession.label}</span>
            <span className="num text-[11px] text-muted-foreground">
              · {marketSession.closesAt}
            </span>
          </div>

          <button
            type="button"
            aria-label="Notifications"
            className="relative grid size-9 place-items-center rounded-xl border border-border bg-surface/70 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Bell className="size-4" />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
          </button>

          <button
            type="button"
            aria-label="Profile"
            className="num grid size-9 place-items-center rounded-xl border border-border bg-primary/15 text-xs font-semibold text-primary"
          >
            LG
          </button>
        </div>
      </div>
    </header>
  );
}