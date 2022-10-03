// Server initialization
const express = require('express')
const server  = express()

// Defining folder with static files
server.use("/styles", express.static(__dirname + '/public/styles'))

// Including PUG drawer engine 
server.set('view engine', 'pug')
server.set('views', __dirname + "/public/templates")

// API Router included
server.use('/', require('./routes'))

// Port defining
const PORT = process.env.PORT || 5000

// Server start-up
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})