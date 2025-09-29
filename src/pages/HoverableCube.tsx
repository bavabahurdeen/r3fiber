import { OrbitControls, Stars, Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Mesh } from "three";

const faceInfo: Record<number, { name: string; color: string }> = {
  0: { name: "Front Face", color: "red" },
  1: { name: "Front Face", color: "red" },
  2: { name: "Back Face", color: "blue" },
  3: { name: "Back Face", color: "blue" },
  4: { name: "Top Face", color: "green" },
  5: { name: "Top Face", color: "green" },
  6: { name: "Bottom Face", color: "yellow" },
  7: { name: "Bottom Face", color: "yellow" },
  8: { name: "Right Face", color: "orange" },
  9: { name: "Right Face", color: "orange" },
  10: { name: "Left Face", color: "purple" },
  11: { name: "Left Face", color: "purple" },
};


const Cube = ({ position }: { position: [number, number, number] }) => {
  const [hoveredFace, setHoveredFace] = useState<string | null>(null);
  const cuberef = useRef<Mesh>(null!);
 
   return (
    <mesh
      ref={cuberef}
      position={position}
      onPointerMove={(e) => {
        e.stopPropagation();
        const fIndex = e.faceIndex ?? null;
        if (fIndex !== null) {
          setHoveredFace(faceInfo[fIndex].name);
        }
      }}
      onPointerOut={() => setHoveredFace(null)}
    >
      <boxGeometry args={[2, 2, 2]} />
      {Array.from({ length: 6 }).map((_, i) => {
        const color = faceInfo[i * 2].color;
        return (
          <meshStandardMaterial key={i} attach={`material-${i}`} color={color} />
        );
      })}

      {hoveredFace && (
        <Html position={[0, 1.5, 0]} center>
          <div className="bg-black/70 text-white px-2 py-1 rounded text-sm">
            {hoveredFace}
          </div>
        </Html>
      )}
    </mesh>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight />
      <directionalLight position={[10, 10, 10]} intensity={1.5} />
      <Stars />
      <Cube position={[0, 0, 0]} />
      <OrbitControls />
    </>
  );
};

export default function HoverableCube() {
  return (
    <Canvas camera={{ position: [4, 2, -3] }}>
      <Scene />
    </Canvas>
  );
}
