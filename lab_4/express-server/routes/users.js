const express = require("express")
const router  = express.Router()
const fs      = require('fs');


let database;


/**
 * @route GET /api/users/get_all_users
 * @desc  Getting all users route
 */
router.get("/get_all_users", async (req, res) => {
    database = JSON.parse(fs.readFileSync('express-server/database.json'))
    res.status(200)
    res.send(database.users)
})


/**
 * @route GET /api/users/get_user/:user_id
 * @desc  Getting special user by id
 */
router.get("/get_user/:user_id", async (req, res) => {
    database = JSON.parse(fs.readFileSync('express-server/database.json'))
    const user_id = req.params.user_id

    // Check if user with user_id exists
    let foundUser;

    database.users.forEach(user => {
        if (user.id == user_id) foundUser = user
    })

    if (!foundUser) {
        res.status(404)
        res.send("User not found")
    }

    res.status(200)
    res.send(foundUser)
})


/**
 * @route GET /api/users/get_user_friends/:user_id
 * @desc  Returns user's friend list 
 */
router.get("/get_user_friends/:user_id", async (req, res) => {
    database = JSON.parse(fs.readFileSync('express-server/database.json'))
    const user_id = req.params.user_id

    const cur_user = database.users.filter(user => user.id == user_id)[0]

    const friends = database.users.filter(user => cur_user.friends.includes(user.id))

    res.status(200)
    res.send(friends)
});


/**
 * @route PUT /api/users/new_friend/:user_id/:friend_id
 * @desc  Gets new user
 */
router.put("/new_friend/:user_id/:friend_id", async (req, res) => {
    const user_id   = req.params.user_id;
    const friend_id = req.params.friend_id;

    database = JSON.parse(fs.readFileSync('express-server/database.json'))

    const users = database.users.filter(user => (user.id == user_id) || (user.id == friend_id));

    if (users.length < 2) {
        res.status(404)
        res.send("User not found")
    }

    database.users.forEach(user => {
        if (user.id == user_id && !user.friends.includes(friend_id))
            user.friends.push(friend_id);
        
        if (user.id == friend_id && !user.friends.includes(user_id))
            user.friends.push(user_id);
    })

    let data = JSON.stringify(database)
    fs.writeFileSync('express-server/database.json', data); 
})


/**
 * @route PUT /api/users/edit_user/:user_id
 * @desc  Updates user info
 */
router.put("/edit_user/:user_id", async (req, res) => {
    database = JSON.parse(fs.readFileSync('express-server/database.json'))

    // Retrieve user data
    let new_user_data = req.body.user
    const user_id = req.params.user_id

    // Check if user with user_id exists
    let user_index = -1

    database.users.forEach((user, index) => {
        if (user.id == user_id) 
            user_index = index
    })

    if (user_index == -1) {
        res.status(404)
        res.send("User not found")
    }

    let user    = database.users[user_index]
    user.name   = new_user_data.name
    user.birth  = new_user_data.birth
    user.role   = new_user_data.role
    user.status = new_user_data.status
    user.email  = new_user_data.email
    user.img    = new_user_data.img

    // Save new data
    database.users = [...database.users.slice(0, user_index), user, ...database.users.slice(user_index+1)]
    let data = JSON.stringify(database)
    fs.writeFileSync('express-server/database.json', data); 

    res.status(200)
    res.send(user)
})


/**
 * @route PUT /api/users/ban_user/:user_id
 * @desc  Ban special user 
 */
router.put("/ban_user/:user_id", async (req, res) => {
    database = JSON.parse(fs.readFileSync('express-server/database.json'))

    // Retrieve user data
    const user_id = req.params.user_id

    // Check if user with user_id exists
    let user_index = -1

    database.users.forEach((user, index) => {
        if (user.id == user_id) 
            user_index = index
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
    res.send(user)
})


/**
 * @route PUT /api/users/confirm_user/:user_id
 * @desc  Confirm special user 
 */
 router.put("/confirm_user/:user_id", async (req, res) => {
    database = JSON.parse(fs.readFileSync('database.json'))

    // Retrieve user data
    const user_id = req.params.user_id

    // Check if user with user_id exists
    let user_index = -1

    database.users.forEach((user, index) => {
        if (user.id == user_id) 
            user_index = index
    })

    if (user_index == -1) {
        res.status(404)
        res.send("User not found")
    }

    let user = database.users[user_index]
    user.status = "confirmed"

    // Save new data
    database.users = [...database.users.slice(0, user_index), user, ...database.users.slice(user_index+1)]
    let data = JSON.stringify(database)
    fs.writeFileSync('database.json', data);

    res.status(200)
    res.send(user)
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
        if (user.id == user_id) 
            user_index = index
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
    res.send(user)
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
        if (user.id == user_id) 
            user_index = index
    })

    if (user_index == -1) {
        res.status(404)
        res.send("User not found")
    }

    // Save new data
    database.users = [...database.users.slice(0, user_index), ...database.users.slice(user_index+1)]

    // Delete all user posts
    database.posts = database.posts.filter(post => post.user_id != user_id)

    // Delete user password 
    database.passwords = database.passwords.filter(pass => pass.id != user_id)
    
    // Delete this user from all friend lists
    database.users.forEach(user => {
        user.friends = user.friends.filter(friend_id => friend_id != user_id)
    })

    // Save data
    let data = JSON.stringify(database)
    fs.writeFileSync('database.json', data); 
    
    res.status(200)
    res.send(database.users)
})


/**
 * @route PUT /api/users/delete_friend
 * @desc  Delete friend
 */
router.put("/delete_friend", async (req, res) => {
    database = JSON.parse(fs.readFileSync('database.json'))
    const ids = req.body.ids
    const user_id_1 = ids[0]
    const user_id_2 = ids[1]

    database.users.forEach(user => {
        if (user_id_1 == user.id) 
            user.friends = user.friends.filter(id => id != user_id_2)
        
        if (user_id_2 == user.id) 
            user.friends = user.friends.filter(id => id != user_id_1)
    })

    // Save data
    let data = JSON.stringify(database)
    fs.writeFileSync('database.json', data); 
    
    res.status(200)
    res.send(database.users)
})


/**
 * @route PUT /api/users/add_friend
 * @desc  Add friend
 */
router.put("/add_friend", async (req, res) => {
    database = JSON.parse(fs.readFileSync('database.json'))
    const ids = req.body.ids
    const user_id_1 = ids[0]
    const user_id_2 = ids[1]

    database.users.forEach(user => {
        if (user_id_1 == user.id) 
            user.friends.push(user_id_2)
        
        if (user_id_2 == user.id) 
            user.friends.push(user_id_1)
    })

    // Save data
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