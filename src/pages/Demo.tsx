import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import  { useRef } from "react";
import { Color, type Mesh } from "three";
import earthtex from "../assets/earth_texture.jpg";
import earthbump from "../assets/World_bump.png";
import venuestex from "../assets/venus_texture.jfif";
import suntex from '../assets/Solarsystemscope_texture_2k_sun.jpg'
const Earth = ({
  size,
  speed,
  distance,
}: {
  size: number;
  speed: number;
  distance: number;
}) => {
  const earthRef = useRef<Mesh>(null!);
  const angleRef = useRef(0);
  useFrame((_, delta) => {
    angleRef.current += delta * speed;
    const x = Math.cos(angleRef.current) * distance;
    const z = Math.sin(angleRef.current) * distance;
    earthRef.current.position.set(x, 0, z);
    earthRef.current.rotation.y += delta * 0.2;
  });
  const [colorMap, bumpMap, specularMap] = useTexture([
    earthtex,
    earthbump,
    earthbump,
  ]);

  return (
    <mesh ref={earthRef} >
      <sphereGeometry args={[size, 32, 32]} />
      <meshPhongMaterial
        map={colorMap}
        bumpMap={bumpMap}
        specularMap={specularMap}
        specular={new Color("grey")}
      />
    </mesh>
  );
};
const Venues = ({
  size,
  speed,
  distance,
}: {
  size: number;
  speed: number;
  distance: number;
}) => {
  const earthRef = useRef<Mesh>(null!);
  const angleRef = useRef(0);
  useFrame((_, delta) => {
    angleRef.current += delta * speed;
    const x = Math.cos(angleRef.current) * distance;
    const z = Math.sin(angleRef.current) * distance;
    earthRef.current.position.set(x, 0, z);
    earthRef.current.rotation.y += delta * 0.2;
  });
  const colorMap = useTexture(venuestex);

  return (
    <mesh ref={earthRef} >
      <sphereGeometry args={[size, 32, 32]} />
      <meshPhongMaterial map={colorMap} />
    </mesh>
  );
};

const Sun = () => {
    const texture = useTexture(suntex)
  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial  map={texture} />
    </mesh>
  );
};
export const Scene = () => {
  return (
    <>
       <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={3} color="yellow" />
      <Stars/>
      <Earth size={3} distance={10} speed={0.1} />
      <Venues size={2} distance={7} speed={0.2} />
      <Sun />
      <OrbitControls />
    </>
  );
};
export default function Demo() {
  return (
    <Canvas camera={{ position: [10, 5, 10], fov: 50 }}>
      <Scene />
    </Canvas>
  );
}
