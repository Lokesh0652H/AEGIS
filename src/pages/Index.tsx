import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Globe3D } from "../components/Globe3D";
import { DemoModeIntro } from "../components/DemoModeIntro";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { GlassCard } from "../components/GlassCard";
import { TopNavbar } from "../components/TopNavbar";
import {
  Brain, Satellite, Globe, Shield, Newspaper, Radio, Eye,
  ArrowRight, Zap, Activity
} from "lucide-react";

const capabilities = [
  { icon: Brain, title: "AI Risk Prediction", desc: "ML models analyzing 50+ conflict indicators in real-time" },
  { icon: Satellite, title: "Satellite Intelligence", desc: "Computer vision detecting troop movements & infrastructure changes" },
  { icon: Globe, title: "Global Risk Mapping", desc: "Interactive heatmaps with predictive crisis zones" },
];

const dataSources = [
  { icon: Newspaper, label: "News APIs" },
  { icon: Radio, label: "Social Media" },
  { icon: Satellite, label: "Satellite Data" },
  { icon: Eye, label: "OSINT" },
];

const stats = [
  { value: 195, suffix: "+", label: "Countries Monitored" },
  { value: 2400, suffix: "+", label: "Live Data Streams" },
  { value: 15000, suffix: "", label: "AI Predictions/Day" },
];

export default function LandingPage() {
  const [showDemo, setShowDemo] = useState(false);

  if (showDemo) {
    return <DemoModeIntro onComplete={() => setShowDemo(false)} />;
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <TopNavbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-14">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse-glow" />
              <span className="text-xs font-mono-code text-primary tracking-widest uppercase">
                Live Intelligence System
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-[1.1] mb-6">
              AI-Powered Geopolitical Crisis{" "}
              <span className="text-gradient-cyan">Early Warning System</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg">
              Real-time monitoring, predictive risk modeling, and global crisis
              visualization powered by multi-modal AI intelligence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg text-sm flex items-center gap-2 glow-cyan"
                >
                  <Zap className="h-4 w-4" />
                  Launch Intelligence Dashboard
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDemo(true)}
                className="px-6 py-3 border border-primary/30 text-primary font-medium rounded-lg text-sm flex items-center gap-2 hover:bg-primary/5 transition-colors"
              >
                <Activity className="h-4 w-4" />
                Enter Demo Mode
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.3 }}
            className="h-[500px] relative"
          >
            <Globe3D className="w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold text-center mb-16 text-foreground"
          >
            Platform Capabilities
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <GlassCard key={cap.title} delay={i * 0.1}>
                <cap.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-display font-semibold text-foreground text-lg mb-2">{cap.title}</h3>
                <p className="text-muted-foreground text-sm">{cap.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold mb-16 text-foreground"
          >
            Intelligence Sources
          </motion.h2>
          <div className="flex justify-center gap-12 flex-wrap">
            {dataSources.map((src, i) => (
              <motion.div
                key={src.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="p-4 glass-panel rounded-xl">
                  <src.icon className="h-8 w-8 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{src.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl font-display font-bold text-primary mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border text-center">
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
          <Shield className="h-4 w-4 text-primary" />
          AEGIS Intelligence Platform • AI-Powered Crisis Early Warning
        </div>
      </footer>
    </div>
  );
}
