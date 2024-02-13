import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Loader } from "@react-three/drei";
import { Rophnan } from "./components/Rophnan";
import { Suspense } from "react";

function App() {
  return (
    <>
      <Canvas shadows>
        <OrbitControls />
        <color attach="background" args={["#ececec"]} />
        <ambientLight intensity={3} color="#7C6033" />
        <pointLight
          position={[22.061, 23.144, 10.194]}
          decay={0}
          color="#dbd59a"
          intensity={0.519}
        />
        <spotLight
          position={[1.061, 19.144, 0.194]}
          angle={Math.PI / 4}
          penumbra={1}
          intensity={0.83}
          color="#896111"
          castShadow
        />
        <Suspense fallback={null}>
          <Rophnan />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
