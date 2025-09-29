import "./App.css";
import HoverableCube from "./pages/HoverableCube";

// const RotatingCube = ({
//   pos,
//   crl,
// }: {
//   pos: [number, number, number];
//   crl: string;
// }) => {
//   const cuberef = useRef<THREE.Mesh>(null!);

//   useFrame((_, delta) => {
//     cuberef.current.rotation.x += delta;
//     cuberef.current.rotation.y += delta;
//     cuberef.current.rotation.z += delta * 0.5;
//   });

//   return (
//     <mesh ref={cuberef} position={pos}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={crl} />
//     </mesh>
//   );
// };

// const Sphere = ({
//   pos,
//   args,
//   crl,
// }: {
//   pos: [number, number, number];
//   args: [number, number, number];
//   crl: string;
// }) => {
//   const [isHover, setIsHover] = useState(false);
//   const [isClicked, setIsClicked] = useState(false);
//   const spherref = useRef<THREE.Mesh>(null!);

//   useFrame((_, delta) => {
//     const speed = isHover ? 1 : 0.1;
//     spherref.current.rotation.y += delta * speed;
//   });
//   return (
//     <mesh
//       ref={spherref}
//       position={pos}
//       onPointerEnter={(event) => {
//         event.stopPropagation();
//         setIsHover(true);
//       }}
//       onPointerLeave={(event) => {
//         event.stopPropagation();
//         setIsHover(false);
//       }}
//       onClick={() => setIsClicked(!isClicked)}
//       scale={isClicked ? 2 : 1}
//     >
//       <sphereGeometry args={args} />
//       <meshStandardMaterial color={isHover ? "pink" : crl} wireframe />
//     </mesh>
//   );
// };

// const Torus = ({
//   pos,
//   args,
//   crl,
// }: {
//   pos: [number, number, number];
//   args: [number, number, number, number];
//   crl: string;
// }) => {
//   return (
//     <mesh position={pos}>
//       <torusKnotGeometry args={args} />
//       <meshStandardMaterial color={crl} />
//       {/* <MeshWobbleMaterial factor={4} speed={2} /> */}
//     </mesh>
//   );
// };

// const Scene = () => {
//   const directionalLightRef = useRef<THREE.DirectionalLight>(null!)
//   useHelper(directionalLightRef,THREE.DirectionalLightHelper,0.5,'white')

//   return (
//     <>
//       <directionalLight ref={directionalLightRef} position={[0, 0, 2]} intensity={0.5} />
//       <ambientLight intensity={0.1} />

//        <RotatingCube pos={[-3, -3, 0]} crl="orange" />
//        <Sphere args={[1, 30, 30]} crl="limegreen" pos={[0, 0, 0]} />
//       <Torus args={[1, 0.1, 1000, 50]} crl="hotpink" pos={[0, 0, 0]} />
//       <OrbitControls enableZoom={false} />
//     </>
//   );
// };
function App() {
  return (
    <div className="w-full h-screen bg-black">
      {/* <Demo/> */}
      {/* <BikeWheel/> */}
      {/* <Gear/> */}
      {/* <Cube /> */}
      <HoverableCube/>
    </div>
  );
}

export default App;
