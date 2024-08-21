import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./calling.css";
import ringtone from "../../assets/ringtone/iphone-11-pro.mp3";

function Calling() {
  const [isRinging, setIsRinging] = useState(false);
  const [isInteractionAllowed, setIsInteractionAllowed] = useState(false);
  const audioRef = useRef(new Audio(ringtone));
  const ref = useRef();
  const navigate = useNavigate();

  // Allow interaction to start ringtone
  // const handleUserInteraction = () => {
  //   setIsInteractionAllowed(true);
  //   document.removeEventListener("click", handleUserInteraction);
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleUserInteraction);

  //   return () => {
  //     document.removeEventListener("click", handleUserInteraction);
  //   };
  // }, []);

  // Trigger the call popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRinging(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Manage ringtone playback based on isRinging and interaction state
  useEffect(() => {
    // const audio = audioRef.current;
    // if (isRinging || ref.current) {
    //   audio.play().catch((error) => {
    //     console.error("Playback failed:", error);
    //   });
    // } else {
    //   audio.pause();
    //   audio.currentTime = 0;
    // }
    // return () => {
    //   audio.pause();
    //   audio.currentTime = 0;
    // };
  }, [isRinging, ref]);

  // Handle call rejection
  const handleHangUp = () => {
    setIsRinging(false);
  };

  // Handle call acceptance
  const handleAnswer = () => {
    setIsRinging(false);
    navigate("/call");
  };

  // Hide the popup if not ringing
  if (!isRinging) {
    return null;
  }

  return (
    <div className="card" ref={ref}>
      <div className="header">
        <div className="animation">
          <span className="icon ring"></span>
        </div>
        <p className="calling">Incoming Call...</p>
      </div>

      <div className="footer">
        <div className="bouton raccrocher" onClick={handleHangUp}>
          <span className="icon red"></span>
        </div>
        <div className="bouton decrocher" onClick={handleAnswer}>
          <span className="icon green"></span>
        </div>
      </div>
    </div>
  );
}

export default Calling;
