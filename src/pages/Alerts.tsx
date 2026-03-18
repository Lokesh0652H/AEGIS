import { motion } from "framer-motion";
import { DashboardLayout } from "../components/DashboardLayout";
import { GlassCard } from "../components/GlassCard";
import { Bell, MapPin, Clock, Eye, CheckCircle } from "lucide-react";

interface Alert {
  id: number;
  country: string;
  level: "Advisory" | "Warning" | "Critical";
  summary: string;
  time: string;
}

const alerts: Alert[] = [
  { id: 1, country: "Ukraine", level: "Critical", summary: "Military escalation detected near eastern border. AI confidence: 94%.", time: "3 min ago" },
  { id: 2, country: "Taiwan Strait", level: "Warning", summary: "Naval buildup exceeds historical threshold. Monitoring escalation.", time: "18 min ago" },
  { id: 3, country: "Syria", level: "Critical", summary: "Airstrikes reported in northern region. Civilian displacement detected.", time: "45 min ago" },
  { id: 4, country: "Sudan", level: "Warning", summary: "Refugee movement surge detected via satellite imagery analysis.", time: "1 hour ago" },
  { id: 5, country: "South China Sea", level: "Advisory", summary: "Increased naval patrol activity in disputed waters.", time: "2 hours ago" },
  { id: 6, country: "Iran", level: "Warning", summary: "Protest movement escalation detected through social media analysis.", time: "3 hours ago" },
  { id: 7, country: "Ethiopia", level: "Advisory", summary: "Tension indicators rising in border regions. Monitoring.", time: "5 hours ago" },
];

const levelStyle: Record<string, string> = {
  Advisory: "border-yellow-400/30 bg-yellow-400/5",
  Warning: "border-warning/30 bg-warning/5",
  Critical: "border-destructive/30 bg-destructive/5",
};

const levelBadge: Record<string, string> = {
  Advisory: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  Warning: "bg-warning/10 text-warning border-warning/20",
  Critical: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function Alerts() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <Bell className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-display font-bold text-foreground">Alert & Notification Center</h1>
            <span className="ml-auto px-2 py-0.5 text-xs bg-destructive/10 text-destructive rounded-full border border-destructive/20 font-mono-code">
              {alerts.filter(a => a.level === "Critical").length} CRITICAL
            </span>
          </div>

          <div className="space-y-3">
            {alerts.map((alert, i) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className={`glass-panel p-4 border ${levelStyle[alert.level]} ${alert.level === "Critical" ? "animate-pulse-glow" : ""}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono-code ${levelBadge[alert.level]}`}>
                          {alert.level.toUpperCase()}
                        </span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {alert.country}
                        </span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {alert.time}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">{alert.summary}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="px-3 py-1 text-[10px] border border-primary/30 text-primary rounded-md hover:bg-primary/5 transition-colors flex items-center gap-1">
                      <Eye className="h-3 w-3" /> View on Map
                    </button>
                    <button className="px-3 py-1 text-[10px] border border-border text-muted-foreground rounded-md hover:text-foreground transition-colors flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> Mark Resolved
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
