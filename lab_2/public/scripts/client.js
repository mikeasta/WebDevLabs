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
        headers: {
            'Content-Type': 'application/json'
        },
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
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({book})
    })
    return await response.json()
}

// * PAGE REQUESTS
/**
 * @route GET /
 * @desc  Index page
 */
export const indexPage = async () => {
    localStorage["booklist"] = JSON.stringify(getBooklist())
    window.location = url + "/"
}

/**
 * @route GET /details/:book_id
 * @desc Special book details page
 */
export const detailsPage = async book_id => {
    const book = await getBook(book_id)
    localStorage['currentBook'] = JSON.stringify(book)
    window.location = url + "/book_details/" + book_id
}

/**
 * @route GET /add_new_book
 * @desc  Add new book page
 */
export const addNewBookPage = async () => {
    window.location = url + "/add_new_book"
}