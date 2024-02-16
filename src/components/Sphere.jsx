import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { SphereGeometry, MeshStandardMaterial } from "three";
import { Html } from "@react-three/drei";
import { useControls, Leva } from "leva";
import SoundEnableModal from "./SoundEnableModal";

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
  const buttonStyle = {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "12px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  };

  const geometry = new SphereGeometry(1, 32, 32);
  const material = new MeshStandardMaterial({
    color: 0xff0000,
    wireframe: true,
  });

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
      // Initialize audio context
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();

      // Load selected audio file
      const audioElement = new Audio(`musics/${selectedSong}`);
      audioElement.crossOrigin = "anonymous";
      audioRef.current = audioElement;

      // Create an analyzer node
      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 256;
      audioAnalyzerRef.current = analyzer;

      // Connect audio source to analyzer and analyzer to audio context
      const source = audioContext.createMediaElementSource(audioElement);
      source.connect(analyzer);
      analyzer.connect(audioContext.destination);

      // Start playing the audio
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
        // Cleanup on component unmount
        audioElement.pause();
        audioElement.currentTime = 0;
        analyzer.disconnect();
        source.disconnect();
        audioContext.close();
      };
    }
  }, [isSoundEnabled, selectedSong]);

  useFrame(() => {
    // Update the sphere's scale based on the audio data
    if (audioAnalyzerRef.current) {
      const dataArray = new Uint8Array(
        audioAnalyzerRef.current.frequencyBinCount
      );
      audioAnalyzerRef.current.getByteFrequencyData(dataArray);
      const average =
        dataArray.reduce((acc, value) => acc + value, 0) / dataArray.length;

      // Scale the sphere based on the average frequency data
      meshRef.current.scale.set(
        1 + average / 200,
        1 + average / 200,
        1 + average / 200
      );
    }
  });

  const handleEnableSound = () => {
    setIsSoundEnabled(true);
    setShowModal(false);
  };

  useEffect(() => {
    // Update the isPlaying state when the Leva pauseButton changes
    setIsPlaying(!pauseButton);
  }, [pauseButton]);

  return (
    <group>
      <mesh
        ref={meshRef}
        name="Sphere"
        castShadow
        receiveShadow
        geometry={geometry}
        material={material}
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

      {/* New UI at the bottom */}
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
          <button onClick={handlePlayPause} style={buttonStyle}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button onClick={() => audioRef.current.play()} style={buttonStyle}>
            Play
          </button>
          <button
            onClick={() => (audioRef.current.currentTime = 0)}
            style={buttonStyle}
          >
            Replay
          </button>
        </div>
      </Html>
    </group>
  );
}
