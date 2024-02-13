import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Suspense } from "react";

function App() {
  return (
    <Canvas shadows>
      <color attach="background" args={["#ececec"]} />
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
    </Canvas>
  );
}

export default App;
