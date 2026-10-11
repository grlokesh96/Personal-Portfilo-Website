import { Canvas, useFrame } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import type { PlatformNode } from "./platform-data";

type PlatformScene3DProps = {
  nodes: PlatformNode[];
  activeId: string | null;
  onSelect: (node: PlatformNode | null) => void;
};

/* Fibonacci sphere for even distribution of the service nodes */
function fibonacciSphere(n: number, radius: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = phi * i;
    pts.push(new THREE.Vector3(Math.cos(t) * r, y, Math.sin(t) * r).multiplyScalar(radius));
  }
  return pts;
}

/* Layered glass dashboard panels (the "product" the platform ships) */
const PANELS = [
  { y: -0.95, rx: 0.16, ry: -0.5, opacity: 0.2 },
  { y: 0, rx: 0.05, ry: 0, opacity: 0.3 },
  { y: 0.95, rx: -0.12, ry: 0.45, opacity: 0.16 },
];

const BARS = [
  { x: -0.9, h: 0.42, c: "#3B82F6" },
  { x: -0.45, h: 0.66, c: "#8B5CF6" },
  { x: 0, h: 0.54, c: "#06B6D4" },
  { x: 0.45, h: 0.78, c: "#8B5CF6" },
  { x: 0.9, h: 0.48, c: "#3B82F6" },
];

function MetricBars() {
  return (
    <group position={[0, -0.56, 0.04]}>
      {BARS.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, 0]}>
          <boxGeometry args={[0.13, b.h, 0.02]} />
          <meshStandardMaterial
            color={b.c}
            emissive={b.c}
            emissiveIntensity={0.7}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

function DashboardStack() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }, dt) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += dt * 0.12;
    g.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.06;
  });
  return (
    <group ref={group}>
      {PANELS.map((p, i) => (
        <group key={i} position={[0, p.y, 0]} rotation={[p.rx, p.ry, 0]}>
          <RoundedBox args={[2.7, 1.6, 0.06]} radius={0.05} smoothness={4}>
            <meshStandardMaterial
              color="#0c1530"
              transparent
              opacity={p.opacity}
              metalness={0.2}
              roughness={0.4}
            />
          </RoundedBox>
          <RoundedBox args={[2.74, 1.64, 0.075]} radius={0.05} smoothness={4}>
            <meshBasicMaterial
              color={i === 1 ? "#00d4ff" : "#8B5CF6"}
              wireframe
              transparent
              opacity={0.3}
            />
          </RoundedBox>
          <MetricBars />
        </group>
      ))}
    </group>
  );
}

/* Holographic cluster core behind the panels */
function ClusterCore() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (group.current) {
      group.current.rotation.x += dt * 0.16;
      group.current.rotation.y += dt * 0.2;
    }
  });
  return (
    <group ref={group} position={[0, 0, -1.55]}>
      <mesh>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.14} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.45, 32, 32]} />
        <meshBasicMaterial color="#0b1230" transparent opacity={0.5} />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.85, 0]} />
        <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/* Two holographic orbit rings around the platform */
function OrbitRings() {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (g.current) g.current.rotation.z += dt * 0.05;
  });
  return (
    <group ref={g}>
      <mesh rotation={[Math.PI / 2 - 0.12, 0, 0]}>
        <torusGeometry args={[1.85, 0.006, 8, 128]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 2 + 0.18, 0.6, 0]}>
        <torusGeometry args={[2.25, 0.005, 8, 128]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

/* Clickable service nodes positioned around the platform */
function ServiceNodes({
  nodes,
  activeId,
  onSelect,
}: {
  nodes: PlatformNode[];
  activeId: string | null;
  onSelect: PlatformScene3DProps["onSelect"];
}) {
  const group = useRef<THREE.Group>(null);
  const positions = useMemo(() => fibonacciSphere(nodes.length, 3.1), [nodes.length]);
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.05;
  });
  return (
    <group ref={group}>
      {nodes.map((node, i) => {
        const p = positions[i];
        const active = activeId === node.id;
        return (
          <group key={node.id} position={[p.x, p.y, p.z]}>
            <mesh scale={active ? 1.8 : 1}>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshBasicMaterial color={node.color} />
            </mesh>
            <mesh>
              <sphereGeometry args={[active ? 0.22 : 0.15, 16, 16]} />
              <meshBasicMaterial color={node.color} transparent opacity={0.16} />
            </mesh>
            <Html center distanceFactor={9} zIndexRange={[20, 0]} style={{ pointerEvents: "auto" }}>
              <button
                type="button"
                onClick={() => onSelect(active ? null : node)}
                aria-pressed={active}
                aria-label={`${node.label} — ${node.desc}`}
                title={node.desc}
                className="cursor-pointer whitespace-nowrap select-none rounded-md border px-2 py-1 font-mono text-[10px] backdrop-blur-md transition-all duration-200"
                style={{
                  borderColor: `${node.color}66`,
                  background: `${node.color}14`,
                  color: node.color,
                  boxShadow: active
                    ? `0 0 18px ${node.color}cc, 0 0 36px ${node.color}66`
                    : `0 0 8px ${node.color}44`,
                  transform: active ? "scale(1.12)" : "scale(1)",
                }}
              >
                <span
                  className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle"
                  style={{ background: node.color }}
                />
                {node.label}
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

/* Pointer parallax rig — mutates refs in useFrame, never re-renders React */
function PlatformRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const k = Math.min(1, dt * 3);
    g.rotation.y += (state.pointer.x * 0.35 - g.rotation.y) * k;
    g.rotation.x += (Math.sin(t * 0.25) * 0.08 + state.pointer.y * 0.2 - g.rotation.x) * k;
  });
  return <group ref={group}>{children}</group>;
}

export default function PlatformScene3D({ nodes, activeId, onSelect }: PlatformScene3DProps) {
  return (
    <div className="relative h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.2, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        aria-label="Interactive 3D platform model. Use the labeled buttons to inspect each service."
      >
        <ambientLight intensity={0.55} />
        <pointLight position={[5, 5, 7]} intensity={1.1} color="#00d4ff" />
        <pointLight position={[-6, -4, -5]} intensity={0.7} color="#8B5CF6" />
        <directionalLight position={[0, 6, 4]} intensity={0.4} color="#ffffff" />
        <Suspense fallback={null}>
          <PlatformRig>
            <ClusterCore />
            <OrbitRings />
            <DashboardStack />
            <ServiceNodes nodes={nodes} activeId={activeId} onSelect={onSelect} />
          </PlatformRig>
        </Suspense>
      </Canvas>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, transparent 42%, rgba(5,8,22,0.9) 100%)",
        }}
      />
    </div>
  );
}
