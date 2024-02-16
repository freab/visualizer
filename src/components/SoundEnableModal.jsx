import React from "react";
import "../SoundEnableModal.css";

const SoundEnableModal = ({ onEnable }) => {
  const handleEnable = () => {
    onEnable();
  };

  return (
    <div className="sound-modal">
      <div className="modal-content">
        <h2 className="modal-title">Enable Sound</h2>
        <p className="modal-text">
          Click the button below to enable sound on this page.
        </p>
        <button onClick={handleEnable} className="enable-button">
          Enable Sound
        </button>
      </div>
    </div>
  );
};

export default SoundEnableModal;
