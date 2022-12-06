// Import all packages and dependencies
const express = require("express")
const app     = express();

// Cors setup
const cors = require("cors")
const cors_options = {
    "credentials": true,
    "origin": true
}

app.use(cors(cors_options));
app.use(express.json());

// Server setup
const server  = require("http").createServer(app);

// SocketIO setup
const io = require("socket.io")(
    server,
    {
        cors: {
			origins: ["*"],
			handlePreflightRequest: (req, res) => {
				res.writeHead(200, {
					"Access-Control-Allow-Credintals": "*",
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,POST,PUT,GET,HEAD,PATCH,DELETE,UPDATE",
				});
				res.end();
			}
		}
    }
)


io.on("connection", (socket) => { 
	console.log("New session connected!")
	socket.on("ping", () => {console.log("Login page opened!")})
	socket.on("login", user_id => { console.log(`User ${user_id} logined!`) })

})


// Starting server
server.listen(8000)