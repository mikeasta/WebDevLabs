// Server initialization
const fs = require("fs")
const http = require("http")
const https = require("https")
const express = require('express')
const server  = express()

// Init Middleware 
// This middleware gives us oportunity to 
// read req.body data in more comfortable json object
server.use(express.json({ extended: false }));

// Defining folders with static files
server.use("/less", express.static(__dirname + '/public/less'))
server.use("/scripts", express.static(__dirname + '/public/scripts'))
server.use("/certificate", express.static(__dirname + '/public/certificate'))

// Including PUG drawer engine 
server.set('view engine', 'pug')
server.set('views', __dirname + "/public/views")

// API Router included
server.use('/api/users', require('./routes/users'))
server.use('/api/posts', require('./routes/posts'))
server.use('/', require("./routes/render"))

// Port defining
const PORT = process.env.PORT || 5000

// HTTPS setup
var privateKey  = fs.readFileSync('./public/certificate/server.key', 'utf8');
var certificate = fs.readFileSync('./public/certificate/server.csr', 'utf8');

// HTTPS connection initialization
const httpsServer = https.createServer({
    key: privateKey,
    cert: certificate
}, server);

// Start-up the server
httpsServer.listen(PORT)