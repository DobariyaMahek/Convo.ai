const SOCKET_URL = "https://api.writertools.ai/";
import { getSession } from "helper/authHelper";
import socketIOClient from "socket.io-client";
let { access_token } = getSession();
let socket = null;
if (access_token) {
  socket = socketIOClient(SOCKET_URL, {
    transports: ["websocket", "htmlfile", "xhr-polling", "*"],
    extraHeaders: {
      "Bypass-Tunnel-Reminder": "true",
    },
    query: {
      token: "Bearer " + access_token,
    },
  });
}
export const connectSocket = (accessToken) => {
  if (accessToken) {
    socket = socketIOClient(SOCKET_URL, {
      transports: ["websocket", "htmlfile", "xhr-polling", "*"],
      extraHeaders: {
        "Bypass-Tunnel-Reminder": "true",
      },
      query: {
        token: "Bearer " + accessToken,
      },
    });
  }
};
export const getSocket = () => {
  return socket;
};
