// Router initialization
const express = require('express')
const router  = express.Router()

// Loading database data
let database = require('./database.json')

// * DATABASE CONTROL SYSTEM ROUTES
/**
 * @route GET /get_booklist
 * @desc  Loads whole booklist from database
 */
router.get('/api/get_booklist', (req, res, next) => {
    res.end('get_booklist')
    next()
})

/**
 * @route GET /get_book/:book_id
 * @desc  Returns special book from database
 */
router.get('/api/get_book/:book_id', (req, res, next) => {
    res.end(`get_book/${req.params.book_id}`)
    next()
})

/**
 * @route POST /update_book/:book_id
 * @desc  Updates special book. If book doesnt exist in DB, creates it
 */
router.post('/api/update_book/:book_id', (req, res, next) => {

}) 

/**
 * @route DELETE /delete_book/:book_id
 * @desc  Deletes special book.
 */
router.delete('/api/delete_book/:book_id', (req, res, next) => {

})


// * PUG DRAW FUNCS 
/**
 * @route GET /
 * @desc  Initial page (with booklist)
 */
router.get('/', (req, res) => {
    res.render('index')
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
    res.render('details')
}) 

router.get('*', (req, res, next) => {
    res.status(404)
    res.end('Page not found')
})

module.exports = router