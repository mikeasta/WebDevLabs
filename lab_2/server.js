// Server initialization
const express = require('express')
const server  = express()

// Defining folder with static files
server.use("/styles", express.static(__dirname + '/public/styles'))

// Defining folder with .pug templates
server.set('view engine', 'pug')
server.set('views', __dirname + "/public/templates")

// Draw initial page
server.get('/', (req, res) => {
    res.render('index')
})

// Draw 
server.get('/add_new_book', (req, res) => {
    res.render('add_book')
})

// API Router included
server.use('/api', require('./routes'))

// Port defining
const PORT = process.env.PORT || 5000

// Server start-up
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
