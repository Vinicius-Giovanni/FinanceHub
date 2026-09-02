import type { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { Navbar } from "./Navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { WatchlistProvider } from "@/lib/watchlist";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <WatchlistProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Navbar />
          <main className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </WatchlistProvider>
  );
}
