import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "../components/DashboardLayout";
import { GlassCard } from "../components/GlassCard";
import { CrisisSimulation } from "../components/CrisisSimulation";
import { WorldMap } from "../components/WorldMap";
import {
  AlertTriangle, TrendingUp, Users, Shield, Filter,
  Zap
} from "lucide-react";

const riskCards = [
  { title: "High Risk Zones", value: "7", icon: AlertTriangle, color: "text-destructive" },
  { title: "Emerging Conflicts", value: "12", icon: TrendingUp, color: "text-warning" },
  { title: "Humanitarian Alerts", value: "5", icon: Users, color: "text-primary" },
  { title: "Global Risk Index", value: "67", icon: Shield, color: "text-warning" },
];

const regions = ["All Regions", "Europe", "Middle East", "Asia", "Africa", "Americas"];
const eventTypes = ["All Events", "Military Activity", "Protests", "Sanctions", "Refugee Movement"];

export default function Dashboard() {
  const [showSimulation, setShowSimulation] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedType, setSelectedType] = useState("All Events");

  if (showSimulation) {
    return <CrisisSimulation onClose={() => setShowSimulation(false)} />;
  }

  return (
    <DashboardLayout>
      <div className="relative min-h-screen">
        {/* Simulation button */}
        <div className="absolute top-4 right-6 z-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ boxShadow: ["0 0 15px hsl(187 100% 45% / 0.3)", "0 0 25px hsl(187 100% 45% / 0.6)", "0 0 15px hsl(187 100% 45% / 0.3)"] }}
            transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
            onClick={() => setShowSimulation(true)}
            className="px-4 py-2 border border-primary text-primary text-xs font-mono-code rounded-md flex items-center gap-2 bg-background/50 backdrop-blur-sm"
          >
            <Zap className="h-3.5 w-3.5" />
            RUN CRISIS SIMULATION
          </motion.button>
        </div>

        {/* Map */}
        <div className="h-[70vh] relative">
          <WorldMap />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Left filter panel */}
        <div className="absolute top-16 left-6 z-10 w-56">
          <GlassCard className="space-y-4">
            <div className="flex items-center gap-2 text-foreground font-display font-semibold text-sm">
              <Filter className="h-4 w-4 text-primary" />
              Global Risk Monitor
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-muted/50 border border-border rounded-md px-3 py-1.5 text-xs text-foreground"
              >
                {regions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Event Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-muted/50 border border-border rounded-md px-3 py-1.5 text-xs text-foreground"
              >
                {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </GlassCard>
        </div>

        {/* Bottom risk cards */}
        <div className="px-6 -mt-16 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {riskCards.map((card, i) => (
              <GlassCard key={card.title} delay={i * 0.1}>
                <div className="flex items-center gap-3">
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                  <div>
                    <p className="text-xs text-muted-foreground">{card.title}</p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-2xl font-display font-bold text-foreground"
                    >
                      {card.value}
                    </motion.p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
