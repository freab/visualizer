import React from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, SSAO } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { OrbitControls, Loader } from "@react-three/drei";
import { Rophnan } from "./components/Rophnan";
import { Suspense } from "react";
import { Sphere } from "./components/Sphere";

function App() {
  return (
    <>
      <Canvas shadows>
        {/* <OrbitControls /> */}
        <color attach="background" args={["#000000"]} />
        <ambientLight position={[0, 0, 100]} intensity={1.2} color="#f2c96d" />
        <pointLight
          position={[10, 10, 10]}
          color="yellow"
          decay={0}
          intensity={1}
        />

        <Suspense fallback={null}>
          <Rophnan />
          <Sphere />
        </Suspense>

        <EffectComposer>
          <SSAO
            blendFunction={BlendFunction.MULTIPLY}
            samples={30}
            rings={4}
            distanceThreshold={1.0}
            distanceFalloff={0.0}
            rangeThreshold={0.5}
            rangeFalloff={0.1}
            luminanceInfluence={0.9}
            radius={20}
            scale={0.5}
            bias={0.5}
          />
        </EffectComposer>
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
