const express = require("express")
const router  = express.Router()
const fs = require('fs');

let database;

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

/**
 * @route GET /profile/:user_id
 * @desc  Special user page
 */
router.get('/profile/:user_id', async (req, res) => {
    database = JSON.parse(fs.readFileSync('database.json'))

    // Retrieve current user
    const user_id = req.params.user_id
    let user;

    database.users.forEach(item => {
        if (item.id == user_id) {
            user = item
        }
    })

    // If there is no user with provided id
    if (!user) {
        res.status(404)
        res.end('User not found') 
    }

    // Retrieve user's posts
    let posts = database.posts.filter(item => {
        return item.user_id == user_id
    })

    res.render('profile', {
        value: {
            access: true,
            user: user,
            user_friends: [],
            user_posts: posts 
        }
    })
})

/**
 * @route GET /edit_profile/:user_id
 * @desc  Edit special profile page
 */
router.get('/edit_profile/:user_id', async (req, res) => {
    database = JSON.parse(fs.readFileSync('database.json'))

    // Retrieve current user
    const user_id = req.params.user_id
    let user;

    database.users.forEach(item => {
        if (item.id == user_id) {
            user = item
        }
    })

    // If there is no user with provided id
    if (!user) {
        res.status(404)
        res.end('User not found') 
    }

    // Convert date from dd/mm/yyyy to yyyy-mm-dd 
    let DI = require("../utils/date_interactions")
    user.birth = new DI().slashToInverted(user.birth)

    res.render('edit_profile', {
        value: {
            access: true,
            user: user
        }
    })
})


// Not found result
router.get('*', (req, res, next) => {
    res.status(404)
    res.end('Page not found')
})


module.exports = router