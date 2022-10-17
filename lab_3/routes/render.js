const express = require("express")
const router  = express.Router()
const fs = require('fs');

// * PUG DRAW FUNCS
/**
 * @route GET /
 * @desc Control Panel page (only for lab 3)
 */
router.get('/', async (req, res) => {
    // If ill need to load database from json after page reload
    // uncomment that row
    database = JSON.parse(fs.readFileSync('../database.json'))

    res.render('index', {
        value: database.books
    })
})