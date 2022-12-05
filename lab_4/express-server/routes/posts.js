const express = require("express")
const router  = express.Router()
const fs      = require('fs');


let database;


/**
 * @route GET /api/posts/get_all_posts
 * @desc  Gets all posts
 */
router.get("/get_all_posts", async (req, res) => {
    database = JSON.parse(fs.readFileSync('express-server/database.json'))
    res.status(200)
    res.send(database.posts)
})


/**
 * @route GET /api/posts/get_post/:post_id
 * @desc  Get special post 
 */
router.get("/get_post/:post_id", async (req, res) => {
    database = JSON.parse(fs.readFileSync('express-server/database.json'))
    const post_id = req.params.post_id

    // Check if post with post_id exists
    let foundPost;

    database.posts.forEach(post => {
        if (post.id == post_id) 
            foundPost = post
    })

    if (!foundPost) {
        res.status(404)
        res.send("Post not found")
    }

    res.status(200)
    res.send(foundPost)
})


/**
 * @route DELETE /api/posts/delete_post/:post_id
 * @desc  Deletes special post by id
 */
router.delete("/delete_post/:post_id", async (req, res) => {
    database = JSON.parse(fs.readFileSync('express-server/database.json'))

    // Retrieve user id
    const post_id = req.params.post_id

    // Check if post with post_id exists
    let post_index = -1

    database.posts.forEach((post, index) => {
        if (post.id == post_id) post_index = index
    })

    if (post_index == -1) {
        res.status(404)
        res.send("Post not found")
    }

    // Save new data
    database.posts = [...database.posts.slice(0, post_index), ...database.posts.slice(post_index + 1)]
    let data = JSON.stringify(database)
    fs.writeFileSync('express-server/database.json', data); 

    res.status(200)
    res.send(database.posts)
})


/**
 * @route POST /api/posts/create_post
 * @desc  Create new post
 */
router.post("/create_post", async (req, res) => {
    // Retrieve data
    database = JSON.parse(fs.readFileSync('express-server/database.json'))
    const post_data = req.body.post

    // Generate post id
    const generateUUID = require("../utils/uuid")

    // Create new post
    const post = {
        date: new Date().toLocaleDateString("en-ca"),
        text: post_data.text,
        id: generateUUID(),
        user_id: post_data.user_id
    }

    database.posts.push(post)
    let data = JSON.stringify(database)
    fs.writeFileSync('express-server/database.json', data); 
    res.status(200)
    return res.send(post)
})


// Not found result
router.get('*', (req, res, next) => {
    res.status(404)
    res.end('Page not found')
})


module.exports = router