import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./calling.css";
import Video from "../../../src/assets/office.mp4";

function Calling() {
  const [isRinging, setIsRinging] = useState(false);
  const videoRef = useRef(null); // Reference to the video element
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRinging(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    if (isRinging) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isRinging]);

  const handleHangUp = () => {
    setIsRinging(false);
  };

  const handleAnswer = () => {
    setIsRinging(false);
    navigate("/call");
  };

  // Hide the popup if not ringing

  return (
    <>
      {/* <video
        type="video/mp4"
        src={Video}
        autoPlay
        loop
        style={{ display: "block", width: "100%" }}
      ></video> */}

      {isRinging && (
        <div className="card">
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
      )}
    </>
  );
}

export default Calling;
