// SoundEnableModal.jsx
import React from "react";
import "../SoundEnableModal.css";
import {SpeakerHigh} from 'phosphor-react'

const SoundEnableModal = ({ onEnable, onPlayPause, isPlaying }) => {
  const handleEnable = () => {
    onEnable();
  };

  return (
    <div className="sound-modal">
      <div className="modal-content">
        <h2 className="modal-title">
          Enable Sound
          </h2>
        <p className="modal-text">
          Click the button below to enable sound on this page.
        </p>
        <button onClick={handleEnable} className="enable-button">
          <SpeakerHigh size={18}/>
          Enable Sound
        </button>

        {isPlaying !== undefined && (
          <div className="playback-controls">
            <button onClick={onPlayPause}>
              {isPlaying ? "eee" : "Play"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoundEnableModal;
