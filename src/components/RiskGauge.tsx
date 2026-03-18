import { motion } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";

export function RiskGauge({ score }: { score: number }) {
  const color = score > 80 ? "text-destructive" : score > 50 ? "text-warning" : "text-primary";
  const bgColor = score > 80 ? "bg-destructive" : score > 50 ? "bg-warning" : "bg-primary";
  const rotation = (score / 100) * 180 - 90; // -90 to 90 degrees

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-24 h-14 overflow-hidden">
        {/* Gauge background */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-12 border-t-[3px] border-l-[3px] border-r-[3px] border-muted rounded-t-full" />
        {/* Gauge filled */}
        <motion.div
          className={`absolute bottom-0 left-1/2 origin-bottom h-10 w-0.5 ${bgColor}`}
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          style={{ transformOrigin: "bottom center", marginLeft: "-1px" }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rounded-full" />
      </div>
      <div>
        <motion.span
          key={score}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-3xl font-display font-bold ${color} tabular-nums`}
        >
          {score}
        </motion.span>
        <p className="text-[10px] text-muted-foreground">/100</p>
      </div>
    </div>
  );
}
