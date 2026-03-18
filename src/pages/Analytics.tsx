import { motion } from "framer-motion";
import { DashboardLayout } from "../components/DashboardLayout";
import { GlassCard } from "../components/GlassCard";
import { BarChart3 } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area
} from "recharts";

const conflictByRegion = [
  { region: "Europe", conflicts: 45 },
  { region: "Middle East", conflicts: 72 },
  { region: "Asia", conflicts: 38 },
  { region: "Africa", conflicts: 65 },
  { region: "Americas", conflicts: 18 },
];

const threatTypes = [
  { name: "Military", value: 35, color: "hsl(0, 72%, 51%)" },
  { name: "Political", value: 28, color: "hsl(30, 100%, 63%)" },
  { name: "Humanitarian", value: 22, color: "hsl(187, 100%, 45%)" },
  { name: "Cyber", value: 15, color: "hsl(280, 60%, 55%)" },
];

const radarData = [
  { indicator: "Military", A: 85, B: 65 },
  { indicator: "Economic", A: 72, B: 58 },
  { indicator: "Political", A: 68, B: 80 },
  { indicator: "Social", A: 55, B: 72 },
  { indicator: "Cyber", A: 78, B: 45 },
  { indicator: "Environmental", A: 40, B: 60 },
];

const trendData = Array.from({ length: 52 }, (_, i) => ({
  week: i + 1,
  alerts: Math.round(20 + Math.sin(i * 0.3) * 15 + Math.random() * 10),
  resolved: Math.round(15 + Math.sin(i * 0.3 + 1) * 10 + Math.random() * 8),
}));

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-display font-bold text-foreground">Analytics & Insights</h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Conflict by Region */}
            <GlassCard>
              <h3 className="font-display font-semibold text-sm text-foreground mb-4">Conflict Frequency by Region</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={conflictByRegion}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 16%)" />
                  <XAxis dataKey="region" stroke="hsl(215, 20%, 55%)" fontSize={10} />
                  <YAxis stroke="hsl(215, 20%, 55%)" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(222, 47%, 8%)", border: "1px solid hsl(215, 20%, 16%)", borderRadius: "8px", fontSize: "12px" }} />
                  <Bar dataKey="conflicts" fill="hsl(187, 100%, 45%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>

            {/* Threat Types */}
            <GlassCard>
              <h3 className="font-display font-semibold text-sm text-foreground mb-4">Threat Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={threatTypes} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                    {threatTypes.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "hsl(222, 47%, 8%)", border: "1px solid hsl(215, 20%, 16%)", borderRadius: "8px", fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-2">
                {threatTypes.map(t => (
                  <div key={t.name} className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: t.color }} />
                    <span className="text-[10px] text-muted-foreground">{t.name}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Radar */}
            <GlassCard>
              <h3 className="font-display font-semibold text-sm text-foreground mb-4">Alliance vs Conflict Radar</h3>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(215, 20%, 16%)" />
                  <PolarAngleAxis dataKey="indicator" stroke="hsl(215, 20%, 55%)" fontSize={10} />
                  <PolarRadiusAxis stroke="hsl(215, 20%, 16%)" fontSize={8} />
                  <Radar name="Conflict" dataKey="A" stroke="hsl(0, 72%, 51%)" fill="hsl(0, 72%, 51%)" fillOpacity={0.2} />
                  <Radar name="Cooperation" dataKey="B" stroke="hsl(187, 100%, 45%)" fill="hsl(187, 100%, 45%)" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </GlassCard>

            {/* Trend */}
            <GlassCard>
              <h3 className="font-display font-semibold text-sm text-foreground mb-4">Weekly Alert Trends</h3>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="alertGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="resolvedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(187, 100%, 45%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(187, 100%, 45%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 16%)" />
                  <XAxis dataKey="week" stroke="hsl(215, 20%, 55%)" fontSize={10} />
                  <YAxis stroke="hsl(215, 20%, 55%)" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(222, 47%, 8%)", border: "1px solid hsl(215, 20%, 16%)", borderRadius: "8px", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="alerts" stroke="hsl(0, 72%, 51%)" fill="url(#alertGrad)" strokeWidth={1.5} />
                  <Area type="monotone" dataKey="resolved" stroke="hsl(187, 100%, 45%)" fill="url(#resolvedGrad)" strokeWidth={1.5} />
                </AreaChart>
              </ResponsiveContainer>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
