// Server initialization
let express = require('express')
let server = express()

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

server.listen(3000)