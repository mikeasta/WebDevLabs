// Server initialization
const fs = require("fs")
const http = require("http")
const https = require("https")
const express = require('express')
const server  = express()

// HTTPS setup
var privateKey  = fs.readFileSync('certificate/server.key', 'utf8');
var certificate = fs.readFileSync('certificate/server.crt', 'utf8');

// Init Middleware 
// This middleware gives us oportunity to 
// read req.body data in more comfortable json object
server.use(express.json({ extended: false }));

// Defining folders with static files
server.use("/css", express.static(__dirname + '/public/css'))
server.use("/scripts", express.static(__dirname + '/public/scripts'))

// Including PUG drawer engine 
server.set('view engine', 'pug')
server.set('views', __dirname + "/public/templates")

// API Router included
server.use('/api/users', require('./routes/api/users'))
server.use('/api/posts', require('./routes/api/posts'))
server.use('/', require("./routes/render"))

// Port defining
const PORT = process.env.PORT || 5000

const httpServer = http.createServer(app);
const httpsServer = https.createServer({
    key: privateKey,
    cert: certificate
}, app);

httpServer.listen(PORT + 1)
httpsServer.listen(PORT)
