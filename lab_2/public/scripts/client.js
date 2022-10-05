const url = 'http://localhost:5000'

// * API REQUESTS
/**
 * @route GET /api/get_booklist
 * @desc  Returns library
 */
export const getBooklist = async () => {
    let response = await fetch(url + "/api/get_booklist")
    return await response.json()
}

/**
 * @route GET /api/get_book/:book_id
 * @desc  Returns special book by it's id
 */
export const getBook = async book_id => {
    let response = await fetch(url + "/api/get_book/" + book_id)
    return await response.json()
}

/**
 * @route DELETE /api/delete_book/:book_id
 * @desc  Deletes book from server library
 */
export const deleteBook = async book_id => {
    let response = await fetch(url + "/api/delete_book/" + book_id, {
        method: "DELETE"
    })
    return await response.json()
}

/**
 * @route PUT /api/update_book
 * @desc  Updates special book
 */
export const updateBook = async book => {
    let response = await fetch(url + "/api/update_book", {
        method: "PUT",
        body: JSON.stringify({book})
    })
    return await response.json()
}

/**
 * @route POST /api/create_new_book
 * @desc  Creates new book
 */
export const createNewBook = async book => {
    let response = await fetch(url + "/api/create_new_book", {
        method: "POST",
        body: JSON.stringify({book})
    })
    return await response.json()
}

// * PAGE REQUESTS
let request = new XMLHttpRequest()

/**
 * @route GET /
 * @desc  Index page
 */
export const indexPage = () => {
    request.open('GET', url + "/")
    request.send()
}

/**
 * @route GET /details/:book_id
 * @desc Special book details page
 */
export const detailsPage = book_id => {
    request.open('GET', url + "/details/" + book_id)
    request.send()
}

/**
 * @route GET /add_new_book
 * @desc  Add new book page
 */
export const addNewBookPage = () => {
    request.open('GET', url + "/add_new_book")
    request.send()
}