const url = 'http://localhost:5000'

// * API REQUESTS
// ? USER
/**
 * @route GET /api/users/get_all_users
 * @desc  Returns user list
 */
export const getUsers = async () => {
    let response = await fetch(url + "/api/users/get_all_users")
    return await response.json()
}

/**
 * @route GET /api/get_user/:user_id
 * @desc  Returns special user by id
 */
export const getUser = async user_id => {
    let response = await fetch(url + "/api/users/get_user/" + user_id)
    return await response.json()
}

/**
 * @route DELETE /api/users/delete_user/:user_id
 * @desc  Deletes user from database
 */
export const deleteUser = async user_id => {
    let response = await fetch(url + "/api/users/delete_user/" + user_id, {
        method: "DELETE"
    })
    return await response.json()
}

/**
 * @route PUT /api/users/edit_user/:user_id
 * @desc  Updates user info
 */
export const editUser = async (user, user_id) => {
    let response = await fetch(url + "/api/users/edit_user/" + user_id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user})
    })
    return await response.json()
}

/**
 * @route PUT /api/users/ban_user/:user_id
 * @desc  Ban special user
 */
export const banUser = async user_id => {
    let response = await fetch(url + "/api/users/ban_user/" + user_id)
    return await response.json()
}


// ? POST (message)

/**
 * @route GET /api/posts/get_all_posts
 * @desc  Gets all posts
 */
export const getAllPosts = async () => {
    let response = await fetch(url + "/api/posts/get_all_posts")
    return await response.json()
}

/**
 * @route GET /api/posts/get_post/:post_id
 * @desc  Get special post 
 */
export const getPost = async post_id => {
    let response = await fetch(url + "/api/posts/get_post/" + post_id)
    return await response.json()
}

/**
 * @route DELETE /api/posts/delete_post/:post_id
 * @desc  Deletes post from database
 */
 export const deletePost = async post_id => {
    let response = await fetch(url + "/api/posts/delete_post/" + post_id, {
        method: "DELETE"
    })
    return await response.json()
}