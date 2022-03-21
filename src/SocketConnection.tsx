import SocketIOClient from "socket.io-client";

export const SocketConnection = SocketIOClient(process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '');