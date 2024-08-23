import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Messages = forwardRef(function Messages(_, ref) {
  const { messages, connect } = useVoice();
  const navigate = useNavigate();
  const hasCall = localStorage.getItem("hasCall");
  useEffect(() => {
    if (hasCall == "true") {
      localStorage.setItem("hasCall", "false");
      navigate(-1);
    } else {
      localStorage.setItem("hasCall", "true");
      connect()
        .then(() => {})
        .catch(() => {})
        .finally(() => {});
    }
  }, []);

  return (
    <motion.div
      layoutScroll
      style={{
        flexGrow: 1,
        overflow: "auto",
        borderRadius: "0.375rem",
        padding: "1rem",
      }}
      ref={ref}
    >
      <motion.div
        style={{
          margin: "0 auto",
          display: "flex",
          width: "100%",
          maxWidth: "42rem",
          flexDirection: "column",
          gap: "1rem",
          paddingBottom: "6rem",
        }}
      >
        <AnimatePresence mode={"popLayout"}>
          {messages.map((msg, index) => {
            if (msg.type === "user_message" || msg.type === "assistant_message") {
              return (
                <motion.div
                  key={msg.type + index}
                  style={{
                    width: "80%",
                    backgroundColor: "#f8f9fa", // Example for light theme bg-card
                    borderColor: "#dee2e6", // Example for light theme border-border
                    borderRadius: "0.375rem",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    marginLeft: msg.type === "user_message" ? "auto" : "0",
                  }}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 0,
                  }}
                >
                  <div
                    style={{
                      paddingLeft: "0.75rem",
                      paddingTop: "1rem",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      textTransform: "capitalize",
                      lineHeight: "1",
                      opacity: "0.5",
                      color: "#000", // Example for dark text color
                    }}
                  >
                    {msg.message.role}
                  </div>
                  <div
                    style={{
                      paddingLeft: "0.75rem",
                      paddingBottom: "0.75rem",
                      color: "#000", // Example for dark text color
                      fontSize: "15px",
                    }}
                  >
                    {msg.message.content}
                  </div>
                  <Expressions values={msg.models.prosody?.scores ?? {}} />
                </motion.div>
              );
            }

            return null;
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});

export default Messages;
