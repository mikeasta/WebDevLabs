const server  = require("../server.js")
const request = require("supertest")

describe("Application test", () => {
	/* test login success with valid data */
	test("login", done => {
		request(server)
			.post("/api/auth/login")
			.trustLocalhost()
			.send({ user: {
				email: "1",
				password: "1"
			}})
			.expect(200)
			.end(err => {
				if (err)
					return done(err);
				else
					return done();
			});
	});

	/* test signup error with existing email */
	test("register", done => {
		request(server)
			.post("/api/auth/register")
			.trustLocalhost()
			.send({ user :{
				name: "1",
				email: "1",
                birth: "1",
				password: "1"
			}})
			.expect(400)
			.end(err => {
				if (err)
					return done(err);
				else
					return done();
			});
	});
});