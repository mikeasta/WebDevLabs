// Router initialization
const express = require('express')
const router  = express.Router()

/**
 * @route GET /get_booklist
 * @desc  Loads whole booklist from database
 */
router.get('/get_booklist', (req, res, next) => {
    res.end('get_booklist')
    next()
})

/**
 * @route GET /get_book/:id
 * @desc  Returns special book from database
 */
router.get('/get_book/:id', (req, res, next) => {
    res.end(`get_book/${req.params.id}`)
    next()
})


/**
 * @route POST /update_book/:id
 * @desc  Updates special book. If book doesnt exist in DB, creates it
 */
router.post('/update_book/:id', (req, res, next) => {

}) 

/**
 * @route DELETE /delete_book/:id
 * @desc  Deletes special book.
 */
router.delete('/delete_book/:id', (req, res, next) => {

})



router.get('*', (req, res, next) => {
    res.status(404)
    res.end('Page not found')
})

module.exports = router