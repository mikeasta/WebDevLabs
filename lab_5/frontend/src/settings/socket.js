import socket from "socket.io-client";

const host = "http://127.0.0.1";
const port = 8000;

const connection = socket(`${host}:${port}`);

export default connection;
