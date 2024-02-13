import { OrbitControls, SpotLight } from "@react-three/drei";
import { Rophnan } from "./Rophnan";

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={0.075} />
      <pointLight
        position={[2.061, 1.144, 16.194]}
        decay={0}
        intensity={0.119}
      />
      <spotLight
        position={[2.061, 1.144, 16.194]}
        angle={Math.PI / 4}
        penumbra={1}
        intensity={0.13}
        castShadow
      />
      <OrbitControls />
      <Rophnan />
    </>
  );
};
