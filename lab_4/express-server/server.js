// Server initialization
const fs      = require('fs')
const https   = require('https')
const express = require('express')
const cors    = require('cors')
const server  = express()

// Init Middleware: This middleware gives us oportunity to 
// read req.body data in more comfortable json object
server.use(express.json({ extended: false }));

// CORS setup
server.use(cors())

// Defining folders with static files
server.use('/stylesheets', express.static(__dirname + '/public/stylesheets'))
server.use('/scripts',     express.static(__dirname + '/public/scripts'))
server.use('/certificate', express.static(__dirname + '/public/certificate'))

// Including PUG drawer engine 
server.set('views', __dirname + '/public/views')
server.set('view engine', 'pug')

// API Router included
server.use('/api/users', require('./routes/users'))
server.use('/api/posts', require('./routes/posts'))
server.use('/api/auth',  require('./routes/auth'))
server.use('/',          require('./routes/render'))

// Port defining
const PORT = process.env.PORT || 5000

// HTTPS setup
let key  = fs.readFileSync('express-server/public/certificate/server.key', 'utf8');
let cert = fs.readFileSync('express-server/public/certificate/server.csr', 'utf8');

// HTTPS connection initialization
const httpsServer = https.createServer({key, cert}, server);

// Start-up the server
httpsServer.listen(PORT)