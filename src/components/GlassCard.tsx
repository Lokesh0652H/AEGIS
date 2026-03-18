import { motion } from "framer-motion";
import { ReactNode } from "react";

export function GlassCard({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={`glass-panel p-4 ${className}`}
    >
      {children}
    </motion.div>
  );
}
