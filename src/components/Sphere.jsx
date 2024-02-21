import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { SphereGeometry } from "three";
import { Html } from "@react-three/drei";
import SoundEnableModal from "./SoundEnableModal";
import { shaderMaterial, Text } from "@react-three/drei";
import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";
import ExplosionConfetti from "./confeti";

const ShaderMaterial = shaderMaterial(
  {
    time: 0,
    averageFrequency: { value: 0.0 },
    beat: { value: 0.0 },
    amplitude: { value: 0.0 },
    pitch: { value: 0.0 },
  },
  vertex,
  fragment
);

export function Sphere({ selectedSong, setSelectedSong, songs }) {
  const meshRef = useRef();
  const audioRef = useRef();
  const audioAnalyzerRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [text, setText] = useState("KING KUT");
  const [pauseButton, setPauseButton] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const buttonStyle = {
    backgroundColor: "#1DB954",
    color: "#fff",
    padding: "12px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "14px",
    fontWeight: "bold",
  };

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

  const handleEnableSound = () => {
    setIsSoundEnabled(true);
    setShowModal(false);
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
        if (audioElement) {
          audioElement.pause();
          audioElement.currentTime = 0;
        }
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

      const averageFrequency =
        dataArray.reduce((acc, value) => acc + value, 0) / dataArray.length;

      const beatThreshold = 150;
      const beat = dataArray.filter((value) => value > beatThreshold).length;

      const amplitude =
        dataArray.reduce((acc, value) => acc + value, 0) / dataArray.length;

      const pitch = getPitch(
        dataArray,
        audioAnalyzerRef.current.frequencyBinCount
      );

      meshRef.current.scale.set(
        1.1 + beat / 200,
        1.1 + beat / 200,
        1.1 + beat / 200
      );

      // Update shader material uniforms
      if (meshRef.current.material.uniforms) {
        meshRef.current.material.uniforms.time.value = clock.elapsedTime;
        meshRef.current.material.uniforms.averageFrequency.value =
          averageFrequency;
        meshRef.current.material.uniforms.beat.value = beat;
        meshRef.current.material.uniforms.amplitude.value = amplitude;
        meshRef.current.material.uniforms.pitch.value = pitch;
      }

      // Update confetti when the conditions are met
      if (amplitude > 20 && averageFrequency > 60) {
        setShowConfetti(true);
      } else {
        setShowConfetti(false);
      }
    } else {
      setShowConfetti(false);
    }
  });

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

  const handleSongChange = (event) => {
    const selectedSong = event.target.value;
    setSelectedSong(selectedSong);
  };

  function getPitch(dataArray, binCount) {
    const maxIndex = dataArray.indexOf(Math.max(...dataArray));
    const frequency =
      ((maxIndex / binCount) * audioAnalyzerRef.current.context.sampleRate) / 2;

    return frequency;
  }

  return (
    <group>
      <Html position={[-1.5, -2, 0]}>
        <select
          value={selectedSong}
          onChange={handleSongChange}
          style={{
            ...buttonStyle,
            padding: "8px",
            borderRadius: "4px",
            outline: "none",
          }}
        >
          {songs.map((song) => (
            <option key={song} value={song} style={buttonStyle}>
              {song}
            </option>
          ))}
        </select>
      </Html>
      <mesh
        ref={meshRef}
        name="Sphere"
        castShadow
        receiveShadow
        geometry={new SphereGeometry(1, 32, 32)}
        material={new ShaderMaterial()}
        position={[0.1, 1.2, -0.1]}
        scale={1}
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
        scale={[1.5, 1.5, 1.5]}
        position={[0.1, 0.2, -2.5]}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
      {showConfetti && (
        <ExplosionConfetti
          rate={4}
          amount={50}
          fallingHeight={9}
          enableShadows
          isExploding
          colors={["yellow", "white", "red"]}
        />
      )}

      <Html position={[-1.5, -3, 0]}>
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
