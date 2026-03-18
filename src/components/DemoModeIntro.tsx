import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Globe3D } from "./Globe3D";

const scenes = [
  { text: "INITIALIZING GLOBAL INTELLIGENCE NETWORK...", duration: 1500 },
  { text: "SCANNING GEOPOLITICAL HOTSPOTS...", duration: 1500 },
  { text: "AI DETECTING SIGNALS", duration: 1500 },
  { text: "CONNECTING INTELLIGENCE SOURCES", duration: 1500 },
  { text: "PREDICTING THE NEXT GLOBAL CRISIS", duration: 1500 },
];

export function DemoModeIntro({ onComplete }: { onComplete: () => void }) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [showGlobe, setShowGlobe] = useState(false);
  const [zooming, setZooming] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sceneIndex === 1) setShowGlobe(true);
    
    if (sceneIndex < scenes.length) {
      const timer = setTimeout(() => setSceneIndex(sceneIndex + 1), scenes[sceneIndex].duration);
      return () => clearTimeout(timer);
    } else {
      setZooming(true);
      const timer = setTimeout(() => {
        onComplete();
        navigate("/dashboard");
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [sceneIndex, onComplete, navigate]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
      animate={zooming ? { scale: 3, opacity: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {/* Particles background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 w-0.5 bg-primary/40 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight - 200],
            }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Globe */}
      <AnimatePresence>
        {showGlobe && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0"
          >
            <Globe3D className="w-full h-full" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text overlay */}
      <AnimatePresence mode="wait">
        {sceneIndex < scenes.length && (
          <motion.div
            key={sceneIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 text-center"
          >
            <p className="font-mono-code text-primary text-lg tracking-wider">
              {scenes[sceneIndex].text}
            </p>
            {sceneIndex === 0 && (
              <motion.div
                className="mt-4 h-0.5 bg-primary/30 mx-auto"
                initial={{ width: 0 }}
                animate={{ width: 200 }}
                transition={{ duration: 1.5 }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
