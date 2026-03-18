import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "../components/DashboardLayout";
import { GlassCard } from "../components/GlassCard";
import { Newspaper, Filter, ChevronDown, MapPin, Clock, AlertTriangle } from "lucide-react";

interface Event {
  id: number;
  title: string;
  country: string;
  time: string;
  severity: "Low" | "Medium" | "High";
  aiSentiment: number;
  sourceReliability: number;
  description: string;
}

const mockEvents: Event[] = [
  { id: 1, title: "Large-scale military exercises announced", country: "Taiwan Strait", time: "2 min ago", severity: "High", aiSentiment: -0.82, sourceReliability: 0.95, description: "Chinese military announces unprecedented joint exercises near Taiwan, raising regional tensions." },
  { id: 2, title: "Sanctions package proposed by EU", country: "Brussels", time: "15 min ago", severity: "Medium", aiSentiment: -0.45, sourceReliability: 0.9, description: "New comprehensive sanctions targeting energy sector proposed in EU summit." },
  { id: 3, title: "Protest movement grows in capital", country: "Iran", time: "32 min ago", severity: "High", aiSentiment: -0.78, sourceReliability: 0.7, description: "Anti-government protests spread to multiple cities with increasing participation." },
  { id: 4, title: "Diplomatic talks break down", country: "Geneva", time: "1 hour ago", severity: "Medium", aiSentiment: -0.55, sourceReliability: 0.92, description: "Peace negotiations stall as parties fail to reach consensus on key issues." },
  { id: 5, title: "Refugee surge detected at border", country: "Sudan", time: "1.5 hours ago", severity: "High", aiSentiment: -0.88, sourceReliability: 0.85, description: "Satellite imagery confirms large displacement movements toward Chad border." },
  { id: 6, title: "Naval vessels repositioned", country: "South China Sea", time: "2 hours ago", severity: "Medium", aiSentiment: -0.35, sourceReliability: 0.88, description: "Multiple naval assets detected in disputed waters via maritime tracking systems." },
  { id: 7, title: "Trade agreement tensions rise", country: "Washington", time: "3 hours ago", severity: "Low", aiSentiment: -0.2, sourceReliability: 0.95, description: "New tariff proposals create friction between major trading partners." },
  { id: 8, title: "Cyber attack on infrastructure", country: "Estonia", time: "4 hours ago", severity: "High", aiSentiment: -0.75, sourceReliability: 0.8, description: "State-sponsored cyber attack targets critical energy infrastructure." },
];

const severityStyle: Record<string, string> = {
  Low: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  High: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function CrisisFeed() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <Newspaper className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-display font-bold text-foreground">Crisis Event Feed</h1>
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-6 flex-wrap">
            {["All Events", "Military", "Sanctions", "Protests", "Humanitarian"].map(f => (
              <button key={f} className="px-3 py-1.5 text-xs border border-border rounded-md text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
                {f}
              </button>
            ))}
          </div>

          {/* Events */}
          <div className="space-y-3">
            {mockEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 100, damping: 20 }}
              >
                <GlassCard className="cursor-pointer" delay={0}>
                  <div onClick={() => setExpandedId(expandedId === event.id ? null : event.id)}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono-code ${severityStyle[event.severity]}`}>
                            {event.severity}
                          </span>
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {event.time}
                          </span>
                        </div>
                        <h3 className="text-sm font-medium text-foreground">{event.title}</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" /> {event.country}
                        </p>
                      </div>
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedId === event.id ? "rotate-180" : ""}`} />
                    </div>

                    {expandedId === event.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="mt-3 pt-3 border-t border-border"
                      >
                        <p className="text-xs text-muted-foreground mb-3">{event.description}</p>
                        <div className="flex gap-4">
                          <div>
                            <p className="text-[10px] text-muted-foreground">AI Sentiment</p>
                            <p className="text-sm font-mono-code text-destructive">{event.aiSentiment.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground">Source Reliability</p>
                            <p className="text-sm font-mono-code text-primary">{(event.sourceReliability * 100).toFixed(0)}%</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
