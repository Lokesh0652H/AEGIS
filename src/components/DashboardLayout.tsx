import { ReactNode } from "react";
import { TopNavbar } from "./TopNavbar";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <main className="pt-14">{children}</main>
    </div>
  );
}
