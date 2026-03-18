import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function MapPoints() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    // Create a flat world map using points
    const count = 12000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Scatter points across a flat plane to simulate continents
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 8;
      
      // Simple continent mask approximation
      const isLand = checkLand(x, y);
      if (!isLand && Math.random() > 0.05) {
        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = -1; // hide water points
        continue;
      }

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = 0;

      // Color based on "risk"
      const risk = getRisk(x, y);
      if (risk > 0.7) {
        col[i * 3] = 1; col[i * 3 + 1] = 0.23; col[i * 3 + 2] = 0.23;
      } else if (risk > 0.4) {
        col[i * 3] = 1; col[i * 3 + 1] = 0.55; col[i * 3 + 2] = 0.26;
      } else {
        col[i * 3] = 0; col[i * 3 + 1] = 0.88; col[i * 3 + 2] = 1;
      }
    }
    return { pos, col };
  }, []);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.pos, 3]} />
        <bufferAttribute attach="attributes-color" args={[positions.col, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function checkLand(x: number, y: number): boolean {
  // Very rough continent shapes
  // North America
  if (x > -8 && x < -3 && y > 0.5 && y < 3.5) return true;
  // South America
  if (x > -5 && x < -2 && y > -3 && y < 0.5) return true;
  // Europe
  if (x > -1 && x < 2 && y > 1.5 && y < 3.5) return true;
  // Africa
  if (x > -1 && x < 2.5 && y > -2.5 && y < 1.5) return true;
  // Asia
  if (x > 2 && x < 7 && y > 0 && y < 3.5) return true;
  // Australia
  if (x > 5 && x < 7.5 && y > -2.5 && y < -0.5) return true;
  return false;
}

function getRisk(x: number, y: number): number {
  // Hot zones
  const hotspots = [
    { x: 1.5, y: 2.2, r: 1 },   // Ukraine
    { x: 5.5, y: 1.2, r: 0.8 },  // Taiwan
    { x: 1.8, y: 1.2, r: 0.8 },  // Middle East
    { x: 2, y: -0.5, r: 0.7 },    // Horn of Africa
    { x: 4.5, y: 1.5, r: 0.6 },   // South China Sea
  ];
  let maxRisk = 0;
  for (const h of hotspots) {
    const d = Math.sqrt((x - h.x) ** 2 + (y - h.y) ** 2);
    if (d < h.r) maxRisk = Math.max(maxRisk, 1 - d / h.r);
  }
  return maxRisk;
}

function PulsingHotspot({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 3) * 0.2;
      ref.current.scale.set(s, s, 1);
    }
    if (ringRef.current) {
      const s = 1 + ((clock.elapsedTime * 0.5) % 1) * 2;
      ringRef.current.scale.set(s, s, 1);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 1 - ((clock.elapsedTime * 0.5) % 1);
    }
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <circleGeometry args={[0.08, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.1, 0.12, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

const mapHotspots: { pos: [number, number, number]; color: string; label: string }[] = [
  { pos: [1.5, 2.2, 0.1], color: "#FF3B3B", label: "Ukraine" },
  { pos: [5.5, 1.2, 0.1], color: "#FF8C42", label: "Taiwan" },
  { pos: [1.8, 1.0, 0.1], color: "#FF3B3B", label: "Middle East" },
  { pos: [2, -0.5, 0.1], color: "#FF8C42", label: "Horn of Africa" },
  { pos: [4.5, 1.5, 0.1], color: "#FF8C42", label: "South China Sea" },
];

export function WorldMap() {
  return (
    <div className="w-full h-full bg-background">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} className="cursor-grab active:cursor-grabbing">
        <ambientLight intensity={0.3} />
        <MapPoints />
        {mapHotspots.map((h, i) => (
          <PulsingHotspot key={i} position={h.pos} color={h.color} />
        ))}
      </Canvas>
    </div>
  );
}
