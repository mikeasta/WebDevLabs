const { Server } = require("socket.io");

module.exports = class {

    io = undefined;

    constructor(server) {
        this.io = new Server(
            server,
            {
                cors: {
                    origin: "http://localhost:4200",
                    methods: ["GET", "POST", "OPTIONS"],
                    credentials: true
                }
            }
        )

        this.setup_sockets()
    }

    setup_sockets = () => {
        // Sockets emit rules
        this.io.on("connection", (socket) => { 
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
            
        		return []
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
            
        		return []
        	})
        
        	// User entering the site
        	socket.on("subscribe", () => console.log("New socket subscribed for updates!")) 
        })
    }
}