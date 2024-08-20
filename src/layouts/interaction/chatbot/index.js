import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SoftBox from "components/SoftBox";
import { Box, IconButton, Typography, Card } from "@mui/material";
import { Send } from "@mui/icons-material";
import SoftInput from "components/SoftInput";

// Define custom styles
const useStyles = makeStyles((theme) => ({
  chatSection: {
    width: "100%",
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      height: "70vh", // Adjust height for smaller screens
    },
  },
  chatContainer: {
    width: "100%",
    height: "100%",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  },
  chatMessages: {
    flex: 1,
    padding: theme.spacing(2),
    overflowY: "auto",
    borderBottom: `1px solid #66b5a3`,
  },
  chatInput: {
    display: "flex",
    borderTop: `1px solid #66b5a3`,
    alignItems: "center",
    padding: theme.spacing(1),
  },
  inputField: {
    flex: 1,
    border: "none",
    padding: theme.spacing(1),
    fontSize: "16px",
    width: "100% !important",
  },
  sendButton: {
    backgroundColor: "#66b5a3",
    color: "white",
    border: "none",
    padding: theme.spacing(1),
    cursor: "pointer",
    fontSize: "16px",
    marginLeft: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#4a8d81",
    },
  },
}));

const ChatBot = () => {
  const classes = useStyles();
  const [currentSection, setCurrentSection] = useState(1);
  const [messages, setMessages] = useState([
    {
      text: "Hello",
      role: "AI",
    },
    {
      text: "Hi there!",
      role: "user",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, role: "user" }]);
      setInput("");
    }
  };

  return (
    <SoftBox mb={3}>
      <Card>
        <SoftBox className={classes.chatSection}>
          {/* Chat Container */}
          <div className={classes.chatContainer}>
            <Box className={classes.chatMessages}>
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                    marginBottom: 1,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: msg.role == "AI" ? "#E9ECEF" : "#66b5a32e",
                      color: msg.role == "AI" ? "gray" : "#66B5A3",
                      borderRadius: msg.role === "AI" ? "0px 10px 10px 10px" : "10px 10px 0px 10px",
                      padding: 1,
                      wordBreak: "break-word",
                      maxWidth: "35%",
                    }}
                  >
                    <Typography variant="body1" sx={{ fontSize: "14px" }}>
                      {msg.text}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box className={classes.chatInput}>
              <SoftInput
                className={classes.inputField}
                variant="outlined"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                sx={{ width: "100% !important" }}
              />
              <IconButton className={classes.sendButton} onClick={handleSendMessage}>
                <Send />
              </IconButton>
            </Box>
          </div>
        </SoftBox>
      </Card>
    </SoftBox>
  );
};

export default ChatBot;
