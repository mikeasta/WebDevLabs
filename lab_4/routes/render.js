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
    res.status(200)
    res.render('index')
})


/**
 * @route GET /control_panel
 * @desc  Control page
 */
router.get('/control_panel', async (req, res) => {
    // If ill need to load database from json after page reload
    // uncomment that row
    database = JSON.parse(fs.readFileSync('database.json'))

    let DI = require("../utils/date_interactions")
    let SP = require("../utils/string_preprocessor")
    let di = new DI()
    let sp = new SP()

    let users = database.users

    users.forEach(user => {
        user.birth  = di.invertedToSlash(user.birth)
        user.role   = sp.getRole(user.role)
        user.status = sp.getStatus(user.status)
    })

    // Render
    res.status(200)
    res.render('control_panel', {
        value: {
            access: true,
            users: users
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
        if (item.id == user_id) 
            user = item
    })

    // If there is no user with provided id
    if (!user) {
        res.status(404)
        res.render('not_found')
        return
    }

    // Preprocess data
    let DI = require("../utils/date_interactions")
    let SP = require("../utils/string_preprocessor")
    let di = new DI()
    let sp = new SP()

    user.birth  = di.invertedToSlash(user.birth)
    user.role   = sp.getRole(user.role)
    user.status = sp.getStatus(user.status)

    // Retrieve user's posts
    let posts = database.posts.filter(item => item.user_id == user_id)

    // Retrieve user's friends
    let friends = user.friends.map(friend_id => database.users.filter( user => user.id == friend_id)[0])

    // Preprocess data
    friends.forEach(user => {
        user.birth  = di.invertedToSlash(user.birth)
        user.role   = sp.getRole(user.role)
        user.status = sp.getStatus(user.status)
    })

    posts.forEach(post => {
        post.date = di.invertedToSlash(post.date)
    })
    

    // Render
    res.status(200)
    res.render('profile', {
        value: {
            access: true,
            user: user,
            user_friends: friends,
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
        if (item.id == user_id) 
            user = item
    })

    // If there is no user with provided id
    if (!user) {
        res.status(404)
        res.render('not_found')
    }

    // Convert date from dd/mm/yyyy to yyyy-mm-dd 
    let DI = require("../utils/date_interactions")
    user.birth = new DI().slashToInverted(user.birth)

    // Render
    res.status(200)
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
    res.render('not_found')
})


module.exports = router