import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "../components/DashboardLayout";
import { GlassCard } from "../components/GlassCard";
import { RiskGauge } from "../components/RiskGauge";
import { Brain, ArrowDown, Info, Sliders } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const flowSteps = [
  { label: "DATA INPUT", desc: "Multi-source intelligence feeds including news, social media, satellite, and OSINT data" },
  { label: "NLP SIGNAL ANALYSIS", desc: "Natural language processing detects sentiment spikes, tension signals, and conflict language" },
  { label: "SATELLITE IMAGE DETECTION", desc: "Computer vision models analyze satellite imagery for troop movements and infrastructure changes" },
  { label: "HISTORICAL CONFLICT MODEL", desc: "Pattern matching against 50+ years of historical conflict data and escalation patterns" },
  { label: "RISK SCORE GENERATION", desc: "Weighted ensemble model produces calibrated probability scores for crisis escalation" },
];

const variables = [
  { key: "w1", name: "Sentiment Spike", desc: "Rapid increase in negative political sentiment detected in news and social media", default: 0.25 },
  { key: "w2", name: "Protest Frequency", desc: "Rate of protest events and civil unrest indicators", default: 0.2 },
  { key: "w3", name: "Military Movement", desc: "Detection of troop movements, equipment repositioning, and military exercises", default: 0.25 },
  { key: "w4", name: "Sanction Activity", desc: "New or escalating economic sanctions between nations", default: 0.15 },
  { key: "w5", name: "Historical Probability", desc: "Baseline conflict probability from historical pattern analysis", default: 0.15 },
];

const topCrisisZones = [
  { country: "Ukraine", probability: 87, confidence: 92 },
  { country: "Taiwan Strait", probability: 72, confidence: 85 },
  { country: "Middle East", probability: 68, confidence: 88 },
  { country: "Horn of Africa", probability: 61, confidence: 78 },
  { country: "South China Sea", probability: 55, confidence: 82 },
];

export default function Predictions() {
  const [weights, setWeights] = useState<Record<string, number>>({
    w1: 0.25, w2: 0.2, w3: 0.25, w4: 0.15, w5: 0.15,
  });
  const [hoveredVar, setHoveredVar] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const riskScore = useMemo(() => {
    const rawScores = { w1: 78, w2: 65, w3: 82, w4: 55, w5: 70 };
    return Math.round(
      Object.entries(weights).reduce((acc, [k, w]) => acc + w * rawScores[k as keyof typeof rawScores], 0)
    );
  }, [weights]);

  const chartData = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const base = 40 + Math.sin(i * 0.3) * 15;
      const weighted = base * (1 + (weights.w1 - 0.25) * 2 + (weights.w3 - 0.25) * 1.5);
      return { day: i + 1, risk: Math.min(100, Math.max(0, Math.round(weighted + Math.random() * 10))) };
    });
  }, [weights]);

  const updateWeight = (key: string, value: number) => {
    setWeights(prev => ({ ...prev, [key]: value }));
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Brain className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-display font-bold text-foreground">AI Risk Predictions</h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowExplanation(!showExplanation)}
              className="px-4 py-2 border border-primary/30 text-primary text-xs rounded-md flex items-center gap-2 hover:bg-primary/5 transition-colors"
            >
              <Info className="h-3.5 w-3.5" />
              View Model Explanation
            </motion.button>
          </div>

          {/* Prediction chart */}
          <GlassCard className="mb-6">
            <h3 className="font-display font-semibold text-sm text-foreground mb-4">Conflict Probability Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(187, 100%, 45%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(187, 100%, 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 16%)" />
                <XAxis dataKey="day" stroke="hsl(215, 20%, 55%)" fontSize={10} />
                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={10} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(222, 47%, 8%)", border: "1px solid hsl(215, 20%, 16%)", borderRadius: "8px", fontSize: "12px" }}
                  labelStyle={{ color: "hsl(210, 40%, 92%)" }}
                />
                <Area type="monotone" dataKey="risk" stroke="hsl(187, 100%, 45%)" fill="url(#riskGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Model Explanation Panel */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="lg:col-span-3"
              >
                <GlassCard>
                  <h3 className="font-display font-semibold text-foreground mb-6">How the AI Predicts Geopolitical Risk</h3>
                  
                  {/* Flow diagram */}
                  <div className="flex flex-col items-center gap-2 mb-8">
                    {flowSteps.map((step, i) => (
                      <motion.div
                        key={step.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-center group"
                      >
                        <div className="glass-panel px-6 py-3 inline-block relative cursor-help">
                          <p className="text-xs font-mono-code text-primary">{step.label}</p>
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 w-64 p-3 glass-panel rounded-lg">
                            <p className="text-[10px] text-muted-foreground">{step.desc}</p>
                          </div>
                        </div>
                        {i < flowSteps.length - 1 && (
                          <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: i * 0.1 + 0.05 }}
                          >
                            <ArrowDown className="h-4 w-4 text-primary/50 mx-auto my-1" />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Formula */}
                  <div className="text-center mb-6">
                    <p className="text-xs text-muted-foreground mb-2">Risk Score Formula</p>
                    <div className="font-mono-code text-sm text-foreground flex flex-wrap justify-center gap-1">
                      <span>Risk = </span>
                      {variables.map((v, i) => (
                        <motion.span
                          key={v.key}
                          onMouseEnter={() => setHoveredVar(v.key)}
                          onMouseLeave={() => setHoveredVar(null)}
                          animate={{ color: hoveredVar === v.key ? "hsl(187, 100%, 45%)" : "hsl(210, 40%, 92%)" }}
                          className="cursor-help relative group"
                        >
                          {v.key}×{v.name}{i < variables.length - 1 ? " + " : ""}
                          <span className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 w-48 p-2 glass-panel rounded text-[10px] text-muted-foreground whitespace-normal">
                            {v.desc}
                          </span>
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Weight sliders */}
            <div className="lg:col-span-2">
              <GlassCard>
                <div className="flex items-center gap-2 mb-4">
                  <Sliders className="h-4 w-4 text-primary" />
                  <h3 className="font-display font-semibold text-sm text-foreground">Interactive Weight Adjustment</h3>
                </div>
                <div className="space-y-4">
                  {variables.map(v => (
                    <div key={v.key}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={`${hoveredVar === v.key ? "text-primary" : "text-muted-foreground"} transition-colors`}>
                          {v.name}
                        </span>
                        <span className="font-mono-code text-foreground">{(weights[v.key] * 100).toFixed(0)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={weights[v.key] * 100}
                        onChange={(e) => updateWeight(v.key, Number(e.target.value) / 100)}
                        onMouseEnter={() => setHoveredVar(v.key)}
                        onMouseLeave={() => setHoveredVar(null)}
                        className="w-full h-1 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                        style={{ accentColor: "hsl(187, 100%, 45%)" }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-border">
                  <RiskGauge score={riskScore} />
                </div>
              </GlassCard>
            </div>

            {/* Top crisis zones */}
            <GlassCard>
              <h3 className="font-display font-semibold text-sm text-foreground mb-4">Top Predicted Crisis Zones</h3>
              <div className="space-y-3">
                {topCrisisZones.map((zone, i) => (
                  <motion.div
                    key={zone.country}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-xs text-foreground">{zone.country}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${zone.probability}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className={`h-full rounded-full ${zone.probability > 70 ? "bg-destructive" : zone.probability > 50 ? "bg-warning" : "bg-primary"}`}
                        />
                      </div>
                      <span className="text-xs font-mono-code text-muted-foreground w-8">{zone.probability}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
