import { OrbitControls, SpotLight } from "@react-three/drei";
import { Rophnan } from "./Rophnan";

export const Experience = () => {
  return (
    <>
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

      <OrbitControls />
      <Rophnan />
    </>
  );
};
