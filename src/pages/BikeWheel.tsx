import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Group, } from "three";

const Spoke = ({ angle }: { angle: number }) => {
  return (
    <mesh position={[0, 0, 0]} rotation={[0, 0, angle]}>
      <cylinderGeometry args={[0.02, 0.02, 1.8, 8]} />
      <meshStandardMaterial />
    </mesh>
  );
};

export const Scene = () => {
  const spokeCount = 10;
  const spokeLength = Array.from({ length: spokeCount });
  const WheelRef = useRef<Group>(null!);
  const [distance, setDistance] = useState(0);
  useFrame((_, delta) => {
    const speed = 1; // units per second
    const newDistance = distance + speed * delta;
    setDistance(newDistance);
    WheelRef.current.position.x = newDistance;

    WheelRef.current.rotation.z = -newDistance/1.2;
  });
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <group ref={WheelRef}>
        <mesh>
          <torusGeometry args={[1, 0.1, 16, 100]} />
          <meshStandardMaterial color={"black"} />
        </mesh>
        <mesh>
          <torusGeometry args={[1, 0.05, 16, 100]} />
          <meshStandardMaterial color={"gray"} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} />
          <meshStandardMaterial color="darkgray" />
        </mesh>
      </group>
      {spokeLength.map((_, i: number) => (
        <Spoke key={i} angle={(i / spokeCount) * Math.PI} />
      ))}
      <OrbitControls />
    </>
  );
};
export default function BikeWheel() {
  return (
    <Canvas camera={{ position: [2, 2, 2] }}>
      {" "}
      <Scene />
    </Canvas>
  );
}
