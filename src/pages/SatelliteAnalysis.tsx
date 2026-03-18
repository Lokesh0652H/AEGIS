import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "../components/DashboardLayout";
import { GlassCard } from "../components/GlassCard";
import { Satellite, Eye, MapPin, Clock, X } from "lucide-react";

const satelliteImages = [
  { id: 1, country: "Eastern Ukraine", timestamp: "2026-03-17 08:42 UTC", activity: "Troop Movement Detected", confidence: 94, detections: ["Vehicle convoy (23 units)", "Field camp expansion", "Supply depot activity"] },
  { id: 2, country: "Taiwan Strait", timestamp: "2026-03-17 06:15 UTC", activity: "Naval Vessel Repositioning", confidence: 88, detections: ["Carrier group formation", "Submarine activity", "Port congestion increase"] },
  { id: 3, country: "Syria", timestamp: "2026-03-17 04:30 UTC", activity: "Infrastructure Damage", confidence: 91, detections: ["Building collapse zone", "Road blockage", "Crater analysis"] },
  { id: 4, country: "Sudan", timestamp: "2026-03-16 22:00 UTC", activity: "Refugee Camp Expansion", confidence: 86, detections: ["New tent clusters", "Population increase ~3000", "Water access strain"] },
  { id: 5, country: "South China Sea", timestamp: "2026-03-16 18:45 UTC", activity: "Island Fortification", confidence: 82, detections: ["New structures", "Radar installation", "Runway extension"] },
  { id: 6, country: "Horn of Africa", timestamp: "2026-03-16 14:20 UTC", activity: "Displacement Movement", confidence: 79, detections: ["Large group movement", "Border crossing surge", "Camp overflow"] },
];

export default function SatelliteAnalysis() {
  const [selectedImage, setSelectedImage] = useState<typeof satelliteImages[0] | null>(null);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <Satellite className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-display font-bold text-foreground">Satellite & Image Analysis</h1>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {satelliteImages.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
              >
                <GlassCard className="cursor-pointer group" delay={0}>
                  <div onClick={() => setSelectedImage(img)}>
                    {/* Simulated satellite image */}
                    <div className="aspect-video bg-muted/30 rounded-md mb-3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Eye className="h-8 w-8 text-primary/30 group-hover:text-primary/60 transition-colors" />
                      </div>
                      {/* Bounding box overlay */}
                      <div className="absolute top-4 left-4 w-16 h-12 border border-destructive/50 rounded-sm" />
                      <div className="absolute bottom-6 right-6 w-12 h-8 border border-warning/50 rounded-sm" />
                      <div className="absolute top-2 right-2 px-2 py-0.5 bg-destructive/80 rounded text-[10px] text-foreground font-mono-code">
                        AI: {img.confidence}%
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <MapPin className="h-3 w-3" /> {img.country}
                    </div>
                    <p className="text-sm font-medium text-foreground">{img.activity}</p>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
                      <Clock className="h-3 w-3" /> {img.timestamp}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-6"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-panel p-6 max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-display font-bold text-foreground text-lg">{selectedImage.activity}</h2>
                    <p className="text-xs text-muted-foreground">{selectedImage.country} • {selectedImage.timestamp}</p>
                  </div>
                  <button onClick={() => setSelectedImage(null)} className="text-muted-foreground hover:text-foreground">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Large image simulation */}
                <div className="aspect-video bg-muted/20 rounded-lg mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                  {/* Animated detection overlays */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-[20%] left-[15%] w-[30%] h-[25%] border-2 border-destructive rounded-sm"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute top-[55%] right-[20%] w-[25%] h-[20%] border-2 border-warning rounded-sm"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-primary/20 border border-primary/30 rounded text-xs text-primary font-mono-code">
                    Confidence: {selectedImage.confidence}%
                  </div>
                </div>

                <h3 className="font-display font-semibold text-sm text-foreground mb-2">AI Detections</h3>
                <div className="space-y-2">
                  {selectedImage.detections.map((det, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                      {det}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
