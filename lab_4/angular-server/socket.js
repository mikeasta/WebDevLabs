const { Server } = require("socket.io");
const Controller = require("./controller.js")

module.exports = class {

    io = undefined;

    constructor(server) {
        this.io = new Server(
            server,
            {
                cors: {
                    origin: "http://localhost:4200",
                    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                    credentials: true
                }
            }
        )

		this.controller = new Controller();
		
        this.setup_sockets()
    }

    setup_sockets = () => {
        // Sockets emit rules
        this.io.on("connection", (socket) => { 
        	console.log("New session connected!")
        
        	// Login action
        	socket.on("login", user_id => { 
        		const uid = user_id.slice(1, -1); 
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
        	socket.on("friends", async user_id => {
				const friends = await this.controller.get_friends(user_id)
        		return socket.emit("friends", friends)
        	})
        
        	// New friend action
        	socket.on("new_friend", async (friend_id, user_id) => {
				await this.controller.new_friend(user_id, friend_id); 
				const friends = await this.controller.get_friends(user_id)
        		return socket.emit("friends", friends)
        	})

			// Remove friend action
			socket.on("remove_friend", async (friend_id, user_id) => {
				await this.controller.remove_friend(user_id, friend_id);
				const friends = await this.controller.get_friends(user_id)
        		return socket.emit("friends", friends)
			})
        
        	// User entering the site
        	socket.on("subscribe", () => console.log("New socket subscribed for updates!")) 
        })
    }
}