import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats, Loader, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { useControls } from "leva";
import { Sphere } from "./components/Sphere";
import { Rophnan1 } from "./components/Rophnan1";

function App() {
  const {
    ambientLightColor,
    ambientLightIntensity,
    pointLightColor,
    pointLightIntensity,
  } = useControls({
    ambientLightColor: "yellow",
    ambientLightIntensity: { value: 0.4, min: 0, max: 1 },
    pointLightColor: "orange",
    pointLightIntensity: { value: 1.0, min: 0, max: 2 },
  });
  const [selectedSong, setSelectedSong] = useState(
    "ROPHNAN-KING-KUT-Ft-Tom-Beats.m4a"
  );

  // Define ambientLight and pointLight using useRef
  const ambientLight = useRef();
  const pointLight = useRef();

  useEffect(() => {
    // Change ambient light and point light colors based on selected song
    if (ambientLight.current && pointLight.current) {
      if (selectedSong === "SHEGIYE _ ሸግዬ .mp3") {
        // Update ambient light color directly
        ambientLight.current.color.set("red");
        // Update point light color directly
        pointLight.current.color.set("red");
      } else {
        ambientLight.current.color.set("yellow");
        pointLight.current.color.set("orange");
      }
    }
  }, [selectedSong]);

  return (
    <>
      <Canvas shadows>
        <OrbitControls />
        <color attach="background" args={["#000000"]} />
        <ambientLight
          ref={ambientLight}
          position={[0, 0, 100]}
          intensity={ambientLightIntensity}
          color={ambientLightColor}
        />

        <pointLight
          ref={pointLight}
          position={[10, -10, 10]}
          color={pointLightColor}
          decay={0}
          intensity={pointLightIntensity}
        />
        <Suspense fallback={null}>
          <Rophnan1 />
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
