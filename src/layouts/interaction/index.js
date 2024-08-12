import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import Footer from "examples/Footer";
import {
  Box,
  Button,
  TextField,
  List,
  ListItem,
  IconButton,
  Typography,
  Card,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import SoftTypography from "components/SoftTypography";

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
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  document.title = "Convo.AI | Chatbot";

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox className={classes.chatSection}>
              {/* Chat Container */}
              <div className={classes.chatContainer}>
                <Box className={classes.chatMessages}>
                  <List>
                    {messages.map((msg, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          backgroundColor: "#66b5a3", // Alternate background colors for messages
                          color: "#fff",
                          marginBottom: 1,
                          borderRadius: "4px",
                          padding: 1,
                          maxWidth: "40%", // Set maximum width for message bubbles
                          wordBreak: "break-word", // Ensure long words break and wrap properly
                          alignSelf: "flex-start", // Align messages to the left or right
                        }}
                      >
                        <Typography variant="body1" sx={{ fontSize: "14px" }}>
                          {msg}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box className={classes.chatInput}>
                  <TextField
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
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
};

export default ChatBot;
