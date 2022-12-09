// Import all packages and dependencies
const express = require("express")
const https   = require("https")
const fs      = require("fs")
const IO 	  = require("./socket.js")

// Cors setup
const cors = require("cors")	
const cors_options = {
    "credentials": true,
    "origin": true
}

// App setup
const app = express();
app.use(cors(cors_options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Server setup
const ssl_options = {
	key: fs.readFileSync("angular-server/certificate/server.key"),
	cert: fs.readFileSync("angular-server/certificate/server.csr")
};
const server  = https.createServer(ssl_options, app);

// IO setup
const io = new IO(server);

// Starting server
server.listen(8000)

module.exports = { server, io }