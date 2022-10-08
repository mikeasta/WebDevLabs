// Router initialization
const express = require('express')
const router  = express.Router()
const fs = require('fs');

// Loading database data
let database = require('./database.json')

// * DATABASE CONTROL SYSTEM ROUTES
/**
 * @route GET /api/get_booklist
 * @desc  Loads whole booklist from database
 */
router.get('/api/get_booklist', (req, res, next) => {
    res.send(database.books)
})


/**
 * @route GET /api/get_book/:book_id
 * @desc  Returns special book from database
 */
router.get('/api/get_book/:book_id', (req, res, next) => {
    // Check if book_id is NaN
    if (isNaN(Number(req.params.book_id))) 
        res.send(`Page not found: invalid book id`)
    
    // Look for book
    const books = database.books
    const book  = books.find(item => item.id === Number(req.params.book_id))
    res.send(book)
})


/**
 * @route PUT /api/update_book/:book_id
 * @desc  Updates special book. If book doesnt exist in DB, creates it
 */
router.put('/api/update_book', (req, res, next) => {
    let book = req.body.book

    // Check if book raw paremeter exists
    if (!book) 
        res.send(`Page not found: invalid book data`)

    let index = -1;

    // Look for book index
    database.books.forEach((b, idx) => {
        if (b.id == book.id) {
            index = idx
        }
    })

    // Check if we found smth
    if (index === -1) {
        res.send(`Page not found: invalid book if`)
    } else {
        database.books = [...database.books.slice(0, index), book, ...database.books.slice(index+1) ]
    }

    res.send(database.books)
}) 


/**
 * @route POST /api/create_new_book
 * @desc  Creates new book
 */
router.post('/api/create_new_book', (req, res, next) => {
    let book = req.body.book

    // Check if book raw paremeter exists
    if (!book) 
        res.send(`Page not found: invalid book data`)

    book.id = ++database.latest_id
    database.books.push(book)
    res.send(database)
})


/**
 * @route DELETE /api/delete_book/:book_id
 * @desc  Deletes special book.
 */
router.delete('/api/delete_book/:book_id', (req, res, next) => {
    const book_id_num = Number(req.params.book_id)

    // Check if book_id is NaN
    if (isNaN(book_id_num)) 
        res.send(`Page not found: invalid book id`)

    let index = -1;

    // Look for book index
    database.books.forEach((book, book_index) => {
        if (book.id == book_id_num) {
            index = book_index
        }
    })

    if (index != -1) {
        database.books = [...database.books.slice(0, index), ...database.books.slice(index+1)]
        res.send(database)
    } else {
        res.send(`Page not found: required book not found.`)
    }
})


// * PUG DRAW FUNCS 
/**
 * @route GET /
 * @desc  Initial page (with booklist)
 */
router.get('/', async (req, res) => {
    database = JSON.parse(fs.readFileSync('./database.json'))

    res.render('index', {
        value: database.books
    })
})


/**
 * @route GET /add_new_book
 * @desc  Add new book page
 */
router.get('/add_new_book', (req, res) => {
    res.render('add_book')
})


/**
 * @route GET /book_details/:book_id
 * @desc  Special book details page
 */
router.get('/book_details/:book_id', (req, res) => {
    let index = -1

    // Look for special book
    database.books.forEach((book, idx) => {
        if (book.id == req.params.book_id) {
            index = idx
        }
    })

    // Check if book exists
    if (index === -1) {
        res.send(`Page not found: required book not found.`)
    }

    res.render('details', {
        value: database.books[index]
    })
}) 


// Not found result
router.get('*', (req, res, next) => {
    res.status(404)
    res.end('Page not found')
})


module.exports = router