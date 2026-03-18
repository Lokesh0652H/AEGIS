import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, ChevronRight } from "lucide-react";
import { RiskGauge } from "./RiskGauge";

const scenarios = [
  "Ukraine Escalation Scenario",
  "South China Sea Naval Tension",
  "Middle East Missile Strike Escalation",
  "Taiwan Strait Military Buildup",
  "Horn of Africa Humanitarian Crisis",
];

const stages = [
  { id: 1, label: "Early Signals", score: 22, color: "text-primary", markerColor: "bg-yellow-400" },
  { id: 2, label: "Political Tension", score: 45, color: "text-warning", markerColor: "bg-warning" },
  { id: 3, label: "Military Mobilization", score: 61, color: "text-warning", markerColor: "bg-destructive" },
  { id: 4, label: "Escalation Risk", score: 78, color: "text-destructive", markerColor: "bg-destructive" },
  { id: 5, label: "Crisis", score: 92, color: "text-destructive", markerColor: "bg-destructive" },
];

interface SimEvent {
  id: number;
  title: string;
  location: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  source: string;
  stage: number;
}

const simEvents: SimEvent[] = [
  { id: 1, title: "Unusual social media activity detected", location: "Eastern Ukraine", severity: "Low", source: "Social Media + NLP", stage: 1 },
  { id: 2, title: "Diplomatic tensions rise in UN session", location: "Geneva", severity: "Medium", source: "News + NLP", stage: 2 },
  { id: 3, title: "Protest movements near government buildings", location: "Kyiv", severity: "Medium", source: "News + Satellite", stage: 2 },
  { id: 4, title: "Military convoy spotted near border", location: "Eastern Ukraine", severity: "High", source: "Satellite + News", stage: 3 },
  { id: 5, title: "Troop mobilization detected via satellite", location: "Border Region", severity: "High", source: "Satellite + OSINT", stage: 3 },
  { id: 6, title: "Air defense systems activated", location: "Southern Ukraine", severity: "High", source: "Satellite", stage: 4 },
  { id: 7, title: "Civilian evacuations reported", location: "Donetsk", severity: "Critical", source: "News + Social Media", stage: 4 },
  { id: 8, title: "Full military engagement detected", location: "Eastern Ukraine", severity: "Critical", source: "All Sources", stage: 5 },
  { id: 9, title: "Humanitarian crisis declared", location: "Ukraine", severity: "Critical", source: "UN + News", stage: 5 },
];

const severityColor: Record<string, string> = {
  Low: "border-yellow-400/30 text-yellow-400",
  Medium: "border-warning/30 text-warning",
  High: "border-destructive/30 text-destructive",
  Critical: "border-destructive text-destructive",
};

export function CrisisSimulation({ onClose }: { onClose: () => void }) {
  const [scenario, setScenario] = useState(scenarios[0]);
  const [currentStage, setCurrentStage] = useState(1);
  const [autoPlay, setAutoPlay] = useState(false);

  const currentStageData = stages[currentStage - 1];
  const visibleEvents = simEvents.filter(e => e.stage <= currentStage);

  useEffect(() => {
    if (!autoPlay) return;
    if (currentStage >= 5) { setAutoPlay(false); return; }
    const timer = setTimeout(() => setCurrentStage(s => s + 1), 2500);
    return () => clearTimeout(timer);
  }, [autoPlay, currentStage]);

  const isCrisis = currentStage >= 4;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 bg-background flex flex-col transition-colors duration-1000 ${isCrisis ? "border-destructive/20" : ""}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h1 className="font-display font-bold text-foreground text-lg flex items-center gap-2">
            <Zap className={`h-5 w-5 ${isCrisis ? "text-destructive" : "text-primary"}`} />
            AI Crisis Simulation Engine
          </h1>
          <p className="text-xs text-muted-foreground">
            Simulating escalation patterns using historical conflict signals
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={scenario}
            onChange={(e) => { setScenario(e.target.value); setCurrentStage(1); }}
            className="bg-muted/50 border border-border rounded-md px-3 py-1.5 text-xs text-foreground"
          >
            {scenarios.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setAutoPlay(!autoPlay); if (!autoPlay && currentStage >= 5) setCurrentStage(1); }}
            className={`px-4 py-1.5 text-xs font-mono-code rounded-md border ${
              autoPlay ? "border-destructive text-destructive" : "border-primary text-primary"
            }`}
          >
            {autoPlay ? "■ STOP" : "▶ AUTO-PLAY"}
          </motion.button>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main area */}
        <div className="flex-1 flex flex-col">
          {/* Timeline */}
          <div className="px-6 py-4 border-b border-border">
            <div className="flex items-center gap-2 mb-3">
              {stages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => setCurrentStage(stage.id)}
                  className="flex-1 relative"
                >
                  <div className={`h-2 rounded-full transition-all duration-500 ${
                    stage.id <= currentStage
                      ? stage.id >= 4 ? "bg-destructive" : stage.id >= 3 ? "bg-warning" : "bg-primary"
                      : "bg-muted"
                  }`} />
                  <p className={`text-[10px] mt-1 text-center ${
                    stage.id === currentStage ? "text-foreground font-medium" : "text-muted-foreground"
                  }`}>
                    {stage.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Map visualization area */}
          <div className="flex-1 relative bg-background overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            
            {/* Simulated map markers */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[600px] h-[350px]">
                {/* Continent outlines - simplified */}
                <svg viewBox="0 0 600 350" className="absolute inset-0 w-full h-full">
                  <rect width="600" height="350" fill="none" />
                  {/* Europe rough shape */}
                  <path d="M250 80 L300 70 L320 90 L310 130 L280 140 L260 120 Z" fill="hsl(var(--muted))" opacity="0.3" stroke="hsl(var(--border))" strokeWidth="0.5" />
                  {/* Africa */}
                  <path d="M260 140 L310 140 L320 200 L300 270 L270 260 L250 200 Z" fill="hsl(var(--muted))" opacity="0.3" stroke="hsl(var(--border))" strokeWidth="0.5" />
                  {/* Asia */}
                  <path d="M320 60 L450 50 L480 100 L460 160 L380 170 L320 140 Z" fill="hsl(var(--muted))" opacity="0.3" stroke="hsl(var(--border))" strokeWidth="0.5" />
                </svg>

                {/* Animated markers */}
                {currentStage >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute"
                    style={{ left: "48%", top: "28%" }}
                  >
                    <div className={`h-3 w-3 rounded-full ${currentStage >= 4 ? "bg-destructive" : currentStage >= 3 ? "bg-warning" : "bg-yellow-400"} animate-pulse-glow`} />
                    <div className={`absolute inset-0 h-3 w-3 rounded-full ${currentStage >= 4 ? "bg-destructive" : "bg-yellow-400"} animate-radar`} />
                    <span className="absolute left-4 top-0 text-[10px] text-muted-foreground whitespace-nowrap">Ukraine</span>
                  </motion.div>
                )}
                {currentStage >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute"
                    style={{ left: "72%", top: "42%" }}
                  >
                    <div className="h-3 w-3 rounded-full bg-warning animate-pulse-glow" />
                    <div className="absolute inset-0 h-3 w-3 rounded-full bg-warning animate-radar" />
                    <span className="absolute left-4 top-0 text-[10px] text-muted-foreground whitespace-nowrap">Taiwan</span>
                  </motion.div>
                )}
                {currentStage >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute"
                    style={{ left: "52%", top: "38%" }}
                  >
                    <div className="h-3 w-3 rounded-full bg-destructive animate-pulse-glow" />
                    <div className="absolute inset-0 h-3 w-3 rounded-full bg-destructive animate-radar" />
                    <span className="absolute left-4 top-0 text-[10px] text-muted-foreground whitespace-nowrap">Middle East</span>
                  </motion.div>
                )}

                {/* Animated connection lines for stage 4+ */}
                {currentStage >= 4 && (
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 350">
                    <motion.line
                      x1="288" y1="98" x2="432" y2="147"
                      stroke="hsl(var(--destructive))"
                      strokeWidth="1"
                      strokeDasharray="8 4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.5 }}
                      transition={{ duration: 1 }}
                    />
                    <motion.line
                      x1="288" y1="98" x2="312" y2="133"
                      stroke="hsl(var(--destructive))"
                      strokeWidth="1"
                      strokeDasharray="8 4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.5 }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </svg>
                )}

                {/* Crisis heatmap overlay */}
                {currentStage >= 5 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute rounded-full bg-destructive/20 blur-3xl"
                    style={{ left: "35%", top: "15%", width: "200px", height: "200px" }}
                  />
                )}
              </div>
            </div>

            {/* Risk gauge overlay */}
            <div className="absolute bottom-6 left-6">
              <GlassCardInline>
                <p className="text-xs text-muted-foreground mb-2">AI Risk Score</p>
                <RiskGauge score={currentStageData.score} />
              </GlassCardInline>
            </div>
          </div>
        </div>

        {/* Event feed panel */}
        <div className="w-80 border-l border-border overflow-y-auto">
          <div className="p-4 border-b border-border">
            <h3 className="font-display font-semibold text-sm text-foreground">Simulation Event Feed</h3>
            <p className="text-xs text-muted-foreground">Stage {currentStage}: {currentStageData.label}</p>
          </div>
          <div className="p-3 space-y-2">
            <AnimatePresence>
              {visibleEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  layout
                  className={`p-3 rounded-lg border bg-card/50 ${severityColor[event.severity]}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono-code uppercase tracking-wider">{event.severity}</span>
                    <ChevronRight className="h-3 w-3 opacity-50" />
                  </div>
                  <p className="text-xs font-medium text-foreground">{event.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{event.location} • {event.source}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function GlassCardInline({ children }: { children: React.ReactNode }) {
  return <div className="glass-panel p-4">{children}</div>;
}
