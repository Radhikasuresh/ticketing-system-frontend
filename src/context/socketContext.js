import React from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

const socket = io("http://localhost:8081"); // Replace with your socket server URL

const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
