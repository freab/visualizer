import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Glitch, EffectComposer, SSAO } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { OrbitControls, Loader } from "@react-three/drei";
import { Rophnan } from "./components/Rophnan";
import { Suspense } from "react";

function App() {
  return (
    <>
      <Canvas shadows>
        <OrbitControls />
        <color attach="background" args={["#000000"]} />
        <ambientLight position={[0, 0, 100]} intensity={1} color="#f2c96d" />
        <pointLight
          position={[10, 10, 10]}
          decay={0}
          color="#dbd59a"
          intensity={0.3}
        />

        <Suspense fallback={null}>
          <Rophnan />
        </Suspense>
        <EffectComposer>
          <SSAO
            blendFunction={BlendFunction.MULTIPLY} // blend mode
            samples={30} // amount of samples per pixel (shouldn't be a multiple of the ring count)
            rings={4} // amount of rings in the occlusion sampling pattern
            distanceThreshold={1.0} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
            distanceFalloff={0.0} // distance falloff. min: 0, max: 1
            rangeThreshold={0.5} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
            rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
            luminanceInfluence={0.9} // how much the luminance of the scene influences the ambient occlusion
            radius={20} // occlusion sampling radius
            scale={0.5} // scale of the ambient occlusion
            bias={0.5} // occlusion bias
          />
          {/* <Glitch
            delay={[1.5, 3.5]} // min and max glitch delay
            duration={[0.2, 1.0]} // min and max glitch duration
            strength={[0.2, 1.0]} // min and max glitch strength
            // mode={GlitchMode.SPORADIC} // glitch mode
            active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
            ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
          /> */}
        </EffectComposer>
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
