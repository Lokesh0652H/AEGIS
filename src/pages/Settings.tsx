import { motion } from "framer-motion";
import { DashboardLayout } from "../components/DashboardLayout";
import { GlassCard } from "../components/GlassCard";
import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <SettingsIcon className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-display font-bold text-foreground">Settings</h1>
          </div>

          <div className="space-y-4">
            <GlassCard>
              <h3 className="font-display font-semibold text-sm text-foreground mb-4">Display</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Map Type</span>
                  <select className="bg-muted/50 border border-border rounded-md px-3 py-1.5 text-xs text-foreground">
                    <option>2D Map</option>
                    <option>3D Globe</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <select className="bg-muted/50 border border-border rounded-md px-3 py-1.5 text-xs text-foreground">
                    <option>Dark Intelligence</option>
                    <option>Darker</option>
                  </select>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="font-display font-semibold text-sm text-foreground mb-4">Alert Sensitivity</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">Notification Threshold</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    defaultValue={3}
                    className="w-full mt-2 accent-primary"
                    style={{ accentColor: "hsl(187, 100%, 45%)" }}
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Low</span><span>Medium</span><span>High</span><span>Critical</span><span>All</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
