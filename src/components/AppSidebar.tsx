import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Globe, Activity, Newspaper, Brain, Satellite, BarChart3, Bell, Settings,
  ChevronLeft, ChevronRight, Shield
} from "lucide-react";

const navItems = [
  { icon: Globe, label: "Dashboard", path: "/dashboard" },
  { icon: Activity, label: "Risk Map", path: "/dashboard" },
  { icon: Newspaper, label: "Crisis Feed", path: "/crisis-feed" },
  { icon: Brain, label: "Predictions", path: "/predictions" },
  { icon: Satellite, label: "Satellite", path: "/satellite" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Bell, label: "Alerts", path: "/alerts" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="h-screen fixed left-0 top-0 z-40 flex flex-col border-r border-border bg-sidebar"
    >
      <div className="flex items-center gap-2 p-4 border-b border-border h-14">
        <Shield className="h-6 w-6 text-primary shrink-0" />
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-display font-bold text-sm text-foreground whitespace-nowrap"
            >
              AEGIS
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 p-2 space-y-1 overflow-hidden">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group relative
                ${isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-md border border-primary/30 glow-cyan"
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />
              )}
              <item.icon className="h-4 w-4 shrink-0 relative z-10" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm font-medium relative z-10 whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-3 border-t border-border text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="h-4 w-4 mx-auto" /> : <ChevronLeft className="h-4 w-4 mx-auto" />}
      </button>
    </motion.aside>
  );
}
