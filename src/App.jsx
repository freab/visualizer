import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, SSAO } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Stats, Loader } from "@react-three/drei";
import { Rophnan } from "./components/Rophnan";
import { Suspense } from "react";
import { Sphere } from "./components/Sphere";

function App() {
  const [selectedSong, setSelectedSong] = useState(
    "ROPHNAN-KING-KUT-Ft-Tom-Beats.m4a"
  );

  return (
    <>
      <Canvas shadows>
        <color attach="background" args={["#000000"]} />
        <ambientLight position={[0, 0, 100]} intensity={1.2} color="#f2c96d" />
        <pointLight
          position={[10, 10, 10]}
          color="yellow"
          decay={0}
          intensity={1}
        />

        <Suspense fallback={null}>
          <Rophnan
            selectedSong={selectedSong}
            setSelectedSong={setSelectedSong}
          />
          <Sphere
            selectedSong={selectedSong}
            setSelectedSong={setSelectedSong}
          />
        </Suspense>

        <Stats />
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
