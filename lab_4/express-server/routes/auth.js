const express = require("express")
const router  = express.Router()
const fs      = require('fs');


let database;


/**
 * @route POST /api/auth/register
 * @desc  Register new user
 */
router.post("/register", async (req, res) => {
    // Retrieve data
    database = JSON.parse(fs.readFileSync('express-server/database.json'))
    const new_user_data = req.body.user

    // Check if user with this email exists
    let foundUsers = database.users.filter(user => user.email == new_user_data.email)

    if (foundUsers.length > 0) {
        res.status(400)
        return res.send("User with this email already exists.")
    }

    // Create new user
    const generateUUID = require("../utils/uuid")
    const user_id      = generateUUID()

    const user = {
        name: new_user_data.name,
        birth: new_user_data.birth,
        role: "user",
        status: "confirmed",
        email: new_user_data.email,
        id: user_id,
        friends: [],
        img: "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
    }

    const pass = {
        id: user_id,
        password: new_user_data.password
    }

    database.users.push(user)
    database.passwords.push(pass)
    let data = JSON.stringify(database)
    fs.writeFileSync('express-server/database.json', data); 

    res.status(200)
    return res.send(user)
})



/**
 * @route POST /api/auth/login
 * @desc  Login user
 */
router.post("/login", async (req, res) => {
    // Retrieve data
    database = JSON.parse(fs.readFileSync('express-server/database.json'))
    const login_data = req.body.user

    // Check if user with entered email exist
    let foundUsers = database.users.filter(user => user.email == login_data.email)

    if (!foundUsers.length) {
        res.status(400)
        return res.send("User credentials are invalid")
    }

    // Check if password fits
    const user    = foundUsers[0]
    const user_id = user.id

    let foundPass = database.passwords.filter(pass => pass.id == user_id)

    if (foundPass[0]["password"] != login_data.password) {
        res.status(400)
        return res.send("User credentials are invalid" )
    }

    res.status(200)
    return res.send(user)
})

module.exports = router