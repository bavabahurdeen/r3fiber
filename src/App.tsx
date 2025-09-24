import "./App.css";
import * as THREE from "three";
import { useFrame, Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";

const RotatingCube = ({
  pos,
  crl,
}: {
  pos: [x: number, y: number, z: number];
  crl: string;
}) => {
  const cubref = useRef<THREE.Mesh>(null!);
  useFrame((state,delta) => {
    cubref.current.rotation.x +=delta;
    cubref.current.rotation.y +=delta *2.0;
    cubref.current.rotation.z =Math.sign(state.clock.elapsedTime) * 2;

  });
  return (
    <mesh ref={cubref} position={pos}>
      <boxGeometry />
      <meshStandardMaterial color={crl} />
    </mesh>
  );
};
function App() {
  return (
    <>
      <div className="w-full h-screen">
        <Canvas>
          <directionalLight position={[0, 0, 2]} intensity={0.5} />

          <ambientLight intensity={0.1} />
          <RotatingCube pos={[-1, 0, 0]} crl="orange" />
          {/* <RotatingCube pos={[1, 0, 0]} crl="royalblue" />
          <RotatingCube pos={[-1, 2, 0]} crl="green" />
          <RotatingCube pos={[1, 2, 0]} crl="pink" /> */}
          <OrbitControls/>
        </Canvas>
      </div>
    </>
  );
}

export default App;
