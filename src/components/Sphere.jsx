// Sphere.js
import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { SphereGeometry } from "three";
import { Html } from "@react-three/drei";
import { useControls, Leva } from "leva";
import SoundEnableModal from "./SoundEnableModal";
import { shaderMaterial, Text } from "@react-three/drei";
import { vertexShader, fragmentShader } from "./shaders";

const CustomShaderMaterial = shaderMaterial(
  {
    time: 0,
  },
  vertexShader,
  fragmentShader
);

export function Sphere() {
  const meshRef = useRef();
  const audioRef = useRef();
  const audioAnalyzerRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const { selectedSong, pauseButton } = useControls({
    selectedSong: {
      value: "ROPHNAN-KING-KUT-Ft-Tom-Beats.m4a",
      label: "Select Song",
      options: ["ROPHNAN-KING-KUT-Ft-Tom-Beats.m4a", "SHEGIYE _ ሸግዬ .mp3"],
    },
  });
  const [text, setText] = useState("KING KUT");
  const handlePlayPause = () => {
    const playPromise = isPlaying
      ? audioRef.current.pause()
      : audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(!isPlaying);
        })
        .catch((error) => {
          console.error("Audio playback error:", error);
        });
    }
  };

  useEffect(() => {
    if (isSoundEnabled) {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const audioElement = new Audio(`musics/${selectedSong}`);
      audioElement.crossOrigin = "anonymous";
      audioRef.current = audioElement;

      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 256;
      audioAnalyzerRef.current = analyzer;

      const source = audioContext.createMediaElementSource(audioElement);
      source.connect(analyzer);
      analyzer.connect(audioContext.destination);

      const playPromise = audioElement
        .play()
        .catch((error) => console.error("Audio playback error:", error));

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(!audioRef.current.paused);
          })
          .catch((error) => {
            console.error("Audio playback error:", error);
          });
      }

      return () => {
        audioElement.pause();
        audioElement.currentTime = 0;
        analyzer.disconnect();
        source.disconnect();
        audioContext.close();
      };
    }
  }, [isSoundEnabled, selectedSong]);

  useFrame(({ clock }) => {
    if (audioAnalyzerRef.current) {
      const dataArray = new Uint8Array(
        audioAnalyzerRef.current.frequencyBinCount
      );
      audioAnalyzerRef.current.getByteFrequencyData(dataArray);
      const average =
        dataArray.reduce((acc, value) => acc + value, 0) / dataArray.length;

      meshRef.current.scale.set(
        1 + average / 200,
        1 + average / 200,
        1 + average / 200
      );

      if (meshRef.current.material.uniforms) {
        meshRef.current.material.uniforms.time.value = clock.elapsedTime;
      }
    }
  });

  const handleEnableSound = () => {
    setIsSoundEnabled(true);
    setShowModal(false);
  };

  useEffect(() => {
    setIsPlaying(!pauseButton);
  }, [pauseButton]);

  useEffect(() => {
    setText(
      selectedSong === "ROPHNAN-KING-KUT-Ft-Tom-Beats.m4a"
        ? "KING KUT"
        : "SHEGIYE"
    );
  }, [selectedSong]);

  return (
    <group>
      <mesh
        ref={meshRef}
        name="Sphere"
        castShadow
        receiveShadow
        geometry={new SphereGeometry(1, 32, 32)}
        material={new CustomShaderMaterial({ Wireframe: true })}
        position={[0.1, 1.2, 0.5]}
        scale={0.3}
      />

      {showModal && (
        <Html position={[0, 0, 0]}>
          <SoundEnableModal
            onEnable={handleEnableSound}
            onClose={() => setShowModal(false)}
          />
        </Html>
      )}
      <Text
        scale={[1.5, 1.5, 2]}
        color="white" // default
        anchorX="center" // default
        anchorY="middle" // default
      >
        {text}
      </Text>
      <Html position={[0, 2, 0]}>
        <div style={{ position: "absolute", top: 10, left: 10 }}>
          {isPlaying ? (
            <button onClick={handlePlayPause}>Pause</button>
          ) : (
            <button onClick={handlePlayPause}>Play</button>
          )}
          <Leva />
          <Html>
            <div
              style={{
                position: "absolute",
                top: 30,
                left: 0,
                color: "#fff",
                fontSize: "0.8em",
              }}
            >
              {selectedSong}
            </div>
          </Html>
        </div>
      </Html>

      <Html position={[-1, -3.8, 0]}>
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            onClick={handlePlayPause}
            style={{
              backgroundColor: "#3498db",
              color: "#fff",
              padding: "12px 16px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            onClick={() => audioRef.current.play()}
            style={{
              backgroundColor: "#3498db",
              color: "#fff",
              padding: "12px 16px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Play
          </button>
          <button
            onClick={() => (audioRef.current.currentTime = 0)}
            style={{
              backgroundColor: "#3498db",
              color: "#fff",
              padding: "12px 16px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Replay
          </button>
        </div>
      </Html>
    </group>
  );
}
