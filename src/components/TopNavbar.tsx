import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Bell, Search, User, Shield } from "lucide-react";

const navLinks = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Crisis Feed", path: "/crisis-feed" },
  { label: "Predictions", path: "/predictions" },
  { label: "Satellite", path: "/satellite" },
  { label: "Analytics", path: "/analytics" },
  { label: "Alerts", path: "/alerts" },
];

export function TopNavbar() {
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="h-14 border-b border-border bg-background/80 backdrop-blur-md fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6"
    >
      <Link to="/" className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        <span className="font-display font-bold text-foreground text-sm tracking-wide">
          AEGIS INTELLIGENCE
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-3 py-1.5 text-xs font-medium rounded-md transition-colors
                ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-primary/10 rounded-md border border-primary/20"
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-muted/50 rounded-md px-3 py-1.5 border border-border">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            placeholder="Search signals..."
            className="bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none w-32"
          />
        </div>
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full animate-pulse-glow" />
        </button>
        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
          <User className="h-4 w-4" />
        </button>
      </div>
    </motion.header>
  );
}
