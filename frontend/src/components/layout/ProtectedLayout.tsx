import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { BottomNav } from "./BottomNav";
import { Footer } from "./Footer";
import { api } from "@/services/api";

/**
 * Authenticated app shell: header + desktop nav + routed content + footer,
 * with a mobile bottom tab bar. (Auth gating is a stub until the API exists.)
 */
export function ProtectedLayout() {
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    api.getAlerts().then((alerts) => setAlertCount(alerts.filter((a) => !a.acknowledged).length));
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header alertCount={alertCount} />
      <div className="border-b border-border bg-surface/40 px-4 py-2">
        <NavBar alertCount={alertCount} />
      </div>
      <main className="flex-1 px-4 py-4 pb-24 lg:pb-4">
        <Outlet />
      </main>
      <Footer />
      <BottomNav alertCount={alertCount} />
    </div>
  );
}
