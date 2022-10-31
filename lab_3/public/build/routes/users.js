const express = require("express")
const router  = express.Router()
const fs = require('fs');

let database;


/**
 * @route GET /api/users/get_all_users
 * @desc  Getting all users route
 */
router.get("/get_all_users", async (req, res) => {
    let DI = require("../utils/date_interactions")
    let SP = require("../utils/string_preprocessor")
    let di = new DI()
    let sp = new SP()

    database = JSON.parse(fs.readFileSync('database.json'))
    let users = database.users

    users.forEach(user => {
        user.birth = di.invertedToSlash(user.birth)
        user.role = sp.getRole(user.role)
        user.status = sp.getStatus(user.status)
    })

    res.status(200)
    res.send(users)
})


/**
 * @route GET /api/users/get_user/:user_id
 * @desc  Getting special user by id
 */
router.get("/get_user/:user_id", async (req, res) => {
    database = JSON.parse(fs.readFileSync('database.json'))
    const user_id = req.params.user_id

    // Check if user with user_id exists
    let found;

    database.users.forEach(user => {
        if (user.id == user_id) found = user
    })

    if (!found) {
        res.status(404)
        res.send("User not found")
    }

    res.status(200)
    res.send(found)
})


/**
 * @route GET /api/users/get_profile/:user_id
 * @desc  Getting special user by id
 */
 router.get("/get_profile/:user_id", async (req, res) => {
    database = JSON.parse(fs.readFileSync('database.json'))
    const user_id = req.params.user_id

    // Check if user with user_id exists
    let found;

    database.users.forEach(user => {
        if (user.id == user_id) found = user
    })

    if (!found) {
        res.status(404)
        res.send("User not found")
    }

    let DI = require("../utils/date_interactions")
    let SP = require("../utils/string_preprocessor")
    let di = new DI()
    let sp = new SP()

    found.birth  = di.invertedToSlash(found.birth)
    found.role   = sp.getRole(found.role)
    found.status = sp.getStatus(found.status)

    res.status(200)
    res.send(found)
})


/**
 * @route GET /api/users/get_user_friends/:user_id
 * @desc  Getting all user friends
 */
router.get("/get_user_friends/:user_id", async (req, res) => {
    database = JSON.parse(fs.readFileSync('database.json'))
    const user_id = req.params.user_id
    
    // Check if user with user_id exists
    let found;

    database.users.forEach(user => {
        if (user.id == user_id) found = user
    })

    if (!found) {
        res.status(404)
        res.send("User not found")
    }

    let friends = database.users.filter( user => found.friends.includes(user.id))

    // Preprocess data
    let DI = require("../utils/date_interactions")
    let SP = require("../utils/string_preprocessor")
    let di = new DI()
    let sp = new SP()

    friends.forEach(user => {
        user.birth = di.invertedToSlash(user.birth)
        user.role = sp.getRole(user.role)
        user.status = sp.getStatus(user.status)
    })

    res.status(200)
    res.send(friends)
})



/**
 * @route GET /api/users/get_user_posts/:user_id
 * @desc  Getting all user posts
 */
router.get("/get_user_posts/:user_id", async (req, res) => {
    database = JSON.parse(fs.readFileSync('database.json'))
    const user_id = req.params.user_id
    
    // Check if user with user_id exists
    let found;

    database.users.forEach(user => {
        if (user.id == user_id) found = user
    })

    if (!found) {
        res.status(404)
        res.send("User not found")
    }

    let posts = database.posts.filter(post => post.user_id == user_id)
    
    let DI = require("../utils/date_interactions")
    let di = new DI()
    
    posts.forEach(post => {
        post.date = di.invertedToSlash(post.date)
    })

    res.status(200)
    res.send(posts)
})


/**
 * @route PUT /api/users/edit_user/:user_id
 * @desc  Updates user info
 */
router.put("/edit_user/:user_id", async (req, res) => {
    database = JSON.parse(fs.readFileSync('database.json'))

    // Retrieve user data
    let new_user_data = req.body.user
    const user_id = req.params.user_id

    // Check if user with user_id exists
    let user_index = -1
    database.users.forEach((user, index) => {
        if (user.id == user_id) user_index = index
    })

    if (user_index == -1) {
        res.status(404)
        res.send("User not found")
    }

    let user = database.users[user_index]
    user.name   = new_user_data.name
    user.birth  = new_user_data.birth
    user.role   = new_user_data.role
    user.status = new_user_data.status
    user.email  = new_user_data.email
    user.img    = new_user_data.img

    // Save new data
    database.users = [...database.users.slice(0, user_index), user, ...database.users.slice(user_index+1)]
    let data = JSON.stringify(database)
    fs.writeFileSync('database.json', data); 
    res.status(200)
    res.send(database.users)
})


/**
 * @route PUT /api/users/ban_user/:user_id
 * @desc  Ban special user 
 */
router.put("/ban_user/:user_id", async (req, res) => {
    database = JSON.parse(fs.readFileSync('database.json'))

    // Retrieve user data
    const user_id = req.params.user_id

    // Check if user with user_id exists
    let user_index = -1
    database.users.forEach((user, index) => {
        if (user.id == user_id) user_index = index
    })

    if (user_index == -1) {
        res.status(404)
        res.send("User not found")
    }

    let user = database.users[user_index]
    user.status = "banned"

    // Save new data
    database.users = [...database.users.slice(0, user_index), user, ...database.users.slice(user_index+1)]
    let data = JSON.stringify(database)
    fs.writeFileSync('database.json', data); 
    res.status(200)
    res.send(database.users)
})

/**
 * @route PUT /api/users/upload_photo/:user_id
 * @desc  Upload special user new profile avatar
 */
router.put("/upload_photo/:user_id", async (req, res) => {
    database = JSON.parse(fs.readFileSync('database.json'))

    // Retrieve user data
    const user_id = req.params.user_id

    // Check if user with user_id exists
    let user_index = -1
    database.users.forEach((user, index) => {
        if (user.id == user_id) user_index = index
    })

    if (user_index == -1) {
        res.status(404)
        res.send("User not found")
    }

    let user = database.users[user_index]

    user.img= req.body.img

    // Save new data
    database.users = [...database.users.slice(0, user_index), user, ...database.users.slice(user_index+1)]
    let data = JSON.stringify(database)
    fs.writeFileSync('database.json', data); 
    res.status(200)
    res.send(database.users)
})

/**
 * @route DELETE /api/users/delete_user/:user_id
 * @desc  Deletes special user
 */
router.delete("/delete_user/:user_id", async (req, res) => {
    database = JSON.parse(fs.readFileSync('database.json'))

    // Retrieve user id
    const user_id = req.params.user_id

    // Check if user with user_id exists
    let user_index = -1
    database.users.forEach((user, index) => {
        if (user.id == user_id) user_index = index
    })

    if (user_index == -1) {
        res.status(404)
        res.send("User not found")
    }

    // Save new data
    database.users = [...database.users.slice(0, user_index), ...database.users.slice(user_index+1)]

    // Delete all user posts
    database.posts = database.posts.filter(post => {
        return post.user_id != user_id
    })

    // Delete this user from all friend lists
    database.users.forEach(user => {
        user.friends = user.friends.filter(friend_id => {
            return friend_id != user_id
        })
    })

    let data = JSON.stringify(database)
    fs.writeFileSync('database.json', data); 
    res.status(200)
    res.send(database.users)
})


// Not found result
router.get('*', (req, res, next) => {
    res.status(404)
    res.end('Page not found')
})


module.exports = router