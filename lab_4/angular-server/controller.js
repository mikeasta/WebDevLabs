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

    get_friends (id)  {
        const options = {
			host: this.host,
			port: this.port,
			path: `/api/users/get_user_friends/${id}`,
			method: "GET",
			rejectUnauthorized: false
		};

        return this.send_get_request(options)
    }
}