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


// Sockets emit rules
io.on("connection", (socket) => { 
	console.log("New session connected!")

	// Login action
	socket.on("login", user_id => { 
		const uid = user_id.slice(1, -1); // User id without quotes
		console.log(`User ${ uid } logined!`)
		socket.user_id = uid;
	})

	// Posts action
	socket.on("posts", async () => {
		console.log(`Post get emmition from ${socket.user_id}`)

		// Request & return
		// ...
	})

	// Friends action 
	socket.on("friends", async () => {
		console.log(`Friends get emmition from ${socket.user_id}`)

		// Request & return
		// ...
	})

	// New friend action
	socket.on("new_friend", async friend_id => {
		console.log(`New friend emmition from ${socket.user_id} to ${friend_id}`)

		// Request & return
		// ...
	})

	// User entering the site
	socket.on("subscribe", () => console.log("New socket subscribed for updates!")) 
})


// Starting server
server.listen(8000)