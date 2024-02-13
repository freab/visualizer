/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";

export function Rophnan(props) {
  const { nodes, materials } = useGLTF("/models/rophnan-scene.glb");
  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <PerspectiveCamera
          name="Camera"
          makeDefault={false}
          far={1000}
          near={0.1}
          fov={40.157}
          position={[2.061, 1.144, 16.194]}
          rotation={[-0.025, 0.02, 0]}
        />
        <mesh
          name="main_window"
          castShadow
          receiveShadow
          geometry={nodes.main_window.geometry}
          material={materials.Yellow}
          position={[0.714, 2.62, -15.994]}
          scale={[0.114, 1.634, 0.114]}
        />
        <mesh
          name="gojo_window"
          castShadow
          receiveShadow
          geometry={nodes.gojo_window.geometry}
          material={materials.Yellow}
          position={[-13.949, 2.62, -8.097]}
          rotation={[0, 1.027, 0]}
          scale={[0.114, 1.634, 0.114]}
        />
        <mesh
          name="spear_window"
          castShadow
          receiveShadow
          geometry={nodes.spear_window.geometry}
          material={materials.Yellow}
          position={[-9.52, 2.62, -13.105]}
          rotation={[0, 0.641, 0]}
        />
        <mesh
          name="shield_window"
          castShadow
          receiveShadow
          geometry={nodes.shield_window.geometry}
          material={materials.Yellow}
          position={[10.442, 2.62, -12.488]}
          rotation={[0, -0.691, 0]}
        />
        <mesh
          name="axum_window"
          castShadow
          receiveShadow
          geometry={nodes.axum_window.geometry}
          material={materials.Yellow}
          position={[15.009, 2.62, -6.407]}
          rotation={[0, -1.163, 0]}
        />
        <mesh
          name="Cube007"
          castShadow
          receiveShadow
          geometry={nodes.Cube007.geometry}
          material={materials.Material}
          position={[0.849, 2.496, 0.389]}
          scale={22.11}
        />
        <mesh
          name="pillar_1"
          castShadow
          receiveShadow
          geometry={nodes.pillar_1.geometry}
          material={materials.Yellow}
          position={[15.578, 3.531, 3.816]}
          scale={[0.645, 0.659, 0.645]}
        />
        <mesh
          name="pillar_2"
          castShadow
          receiveShadow
          geometry={nodes.pillar_2.geometry}
          material={materials.Yellow}
          position={[15.703, 3.531, -3.187]}
          scale={[0.645, 0.659, 0.645]}
        />
        <mesh
          name="pillar_3"
          castShadow
          receiveShadow
          geometry={nodes.pillar_3.geometry}
          material={materials.Yellow}
          position={[12.862, 3.531, -9.589]}
          scale={[0.645, 0.659, 0.645]}
        />
        <mesh
          name="pillar_4"
          castShadow
          receiveShadow
          geometry={nodes.pillar_4.geometry}
          material={materials.Yellow}
          position={[7.541, 3.531, -14.147]}
          scale={[0.645, 0.659, 0.645]}
        />
        <mesh
          name="pillar_5"
          castShadow
          receiveShadow
          geometry={nodes.pillar_5.geometry}
          material={materials.Yellow}
          position={[-6.118, 3.531, -14.837]}
          scale={[0.645, 0.659, 0.645]}
        />
        <mesh
          name="pillar_6"
          castShadow
          receiveShadow
          geometry={nodes.pillar_6.geometry}
          material={materials.Yellow}
          position={[-11.842, 3.531, -10.797]}
          scale={[0.645, 0.659, 0.645]}
        />
        <mesh
          name="pillar_7"
          castShadow
          receiveShadow
          geometry={nodes.pillar_7.geometry}
          material={materials.Yellow}
          position={[-15.328, 3.531, -4.722]}
          scale={[0.645, 0.659, 0.645]}
        />
        <mesh
          name="pillar_8"
          castShadow
          receiveShadow
          geometry={nodes.pillar_8.geometry}
          material={materials.Yellow}
          position={[-15.888, 3.531, 2.264]}
          scale={[0.645, 0.659, 0.645]}
        />
        <mesh
          name="pillar_9"
          castShadow
          receiveShadow
          geometry={nodes.pillar_9.geometry}
          material={materials.Yellow}
          position={[-13.387, 3.531, 8.808]}
          scale={[0.645, 0.659, 0.645]}
        />
        <mesh
          name="Cube"
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials.Stones}
          position={[0.112, -1.873, 1.236]}
          rotation={[0, 0.031, 0]}
          scale={0.142}
        />
        <group
          name="room"
          position={[-0.011, 0.07, -0.003]}
          scale={[15.945, 4.766, 15.945]}
        >
          <mesh
            name="Cylinder001"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder001.geometry}
            material={materials.Yellow}
          />
          <mesh
            name="Cylinder001_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder001_1.geometry}
            material={materials.floor}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/rophnan-scene.glb");