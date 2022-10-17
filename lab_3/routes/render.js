const express = require("express")
const router  = express.Router()
const fs = require('fs');

// * PUG DRAW FUNCS
/**
 * @route GET /
 * @desc  Index page
 */
router.get('/', async (req, res) => {

    res.render('index', {
        value: {}
    })
})

/**
 * @route GET /control_panel
 * @desc  Control page
 */
 router.get('/control_panel', async (req, res) => {
    // If ill need to load database from json after page reload
    // uncomment that row
    database = JSON.parse(fs.readFileSync('database.json'))

    res.render('control_panel', {
        value: {
            access: true,
            users: database.users
        }
    })
})


module.exports = router