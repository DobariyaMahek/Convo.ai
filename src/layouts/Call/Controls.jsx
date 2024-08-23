"use client";
import { useVoice } from "@humeai/voice-react";
import { Button } from "./ui/button";
import { Mic, MicOff, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Toggle } from "./ui/toggle";
import MicFFT from "./MicFFT";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";

export default function Controls() {
  const { disconnect, status, isMuted, unmute, mute, micFft } = useVoice();
  const navigate = useNavigate();
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <AnimatePresence>
        {status.value === "connected" ? (
          <motion.div
            initial={{
              y: "100%",
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: "100%",
              opacity: 0,
            }}
            style={{
              marginBottom: "0.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              borderRadius: "0.5rem",
              border: "1px solid #4b5563", // border-gray-600 equivalent
              padding: "0.5rem 1rem",
              textAlign: "center",
              fontSize: "0.875rem", // text-sm equivalent
              fontWeight: "500", // font-medium equivalent
              color: "#ffffff", // text-white
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)", // shadow-sm equivalent
              backgroundColor: "white",
            }}
          >
            <Toggle
              pressed={!isMuted}
              onPressedChange={() => {
                if (isMuted) {
                  unmute();
                } else {
                  mute();
                }
              }}
            >
              {isMuted ? (
                <MicOff
                  style={{ width: "1rem", height: "1rem", color: "#1f2937", border: "none" }}
                /> // size-4 text-gray-800 equivalent
              ) : (
                <Mic style={{ width: "1rem", height: "1rem", color: "#1f2937", border: "none" }} /> // size-4 text-gray-800 equivalent
              )}
            </Toggle>

            <div
              style={{
                position: "relative",
                display: "grid",
                height: "2rem",
                width: "12rem",
                flexShrink: 0,
              }}
            >
              <MicFFT fft={micFft} className={"fill-current"} />
            </div>

            <SoftButton
              variant="outlined"
              color="error"
              onClick={() => {
                disconnect();
                navigate(-1);
              }}
            >
              <span>
                <Phone
                  style={{
                    width: "1rem",
                    height: "1rem",
                    color: "#ef4444",
                    opacity: 0.5,
                    marginRight: "10px",
                  }} // size-4 text-red-500 opacity-50 equivalent
                  strokeWidth={2}
                  stroke={"currentColor"}
                />
              </span>
              <span style={{ color: "#ef4444" }}>End Call</span> {/* text-red-500 equivalent */}
            </SoftButton>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
