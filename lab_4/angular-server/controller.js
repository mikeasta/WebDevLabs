const https = require("https")

module.exports = class Controller {
    
    constructor () {
        this.host = "localhost";
        this.port = "5000"
        
    }

    send_get_request(options)
	{
		return new Promise((resolve, reject) => {
			https.get(options, result => {
				let _data = "";
				result.on("data", chunk => {
					_data += chunk;
				});
				result.on("error", error => {
					reject(error);
				});
				result.on("end", () => {
					resolve(JSON.parse(_data));
				});
			});
		});
	}

	send_post_request(options, data)
	{
		return new Promise((resolve, reject) => {
			const request = https.request(options, result => {
				let _data = "";
				result.on("data", chunk => {
					_data += chunk;
				});
				result.on("error", error => {
					reject(error);
				});
				result.on("end", () => {
					resolve(JSON.parse(_data));
				});
			});
			request.write(JSON.stringify(data));
			request.end();
		});
	}

    get_friends (id) {
        const options = {
			host: this.host,
			port: this.port,
			path: `/api/users/get_user_friends/${id}`,
			method: "GET",
			rejectUnauthorized: false
		};

        return this.send_get_request(options)
    }

	new_friend (user_id, friend_id) {
		const options = {
			host: this.host,
			port: this.port,
			path: `/api/users/new_friend/${user_id}/${friend_id}`,
			method: "PUT",
			rejectUnauthorized: false
		};

		return this.send_get_request(options)
	}

	remove_friend (user_id, friend_id) {
		const options = {
			host: this.host,
			port: this.port,
			path: `/api/users/remove_friend/${user_id}/${friend_id}`,
			method: "DELETE",
			rejectUnauthorized: false
		};

		return this.send_get_request(options)
	}

	get_posts (id) {
		const options = {
			host: this.host,
			port: this.port,
			path: `/api/posts/get_relevant_posts/${id}`,
			method: "GET",
			rejectUnauthorized: false
		};

        return this.send_get_request(options)
	}

	new_post (post) {
		const options = {
			host: this.host,
			port: this.port,
			path: `/api/posts/create_post`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			rejectUnauthorized: false
		};

		return this.send_post_request(options, { post })
	}
}