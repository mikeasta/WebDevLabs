// * Import API
import {
    deleteBook,
    updateBook,
    indexPage,
    detailsPage
} from "./client.js"

// * Import DOM elements
// Borrow dialog form
const borrowDialog    = document.getElementById("borrow_to_client")
const borrowDialogBtn = document.getElementById("borrow_book")
const borrowDialogCleintInput = document.getElementById("borrow_client")
const borrowDialogDueInput    = document.getElementById("borrow_due")

// Buttons
const saveBtn   = document.getElementById("details_save_book")
const editBtn   = document.getElementById("details_edit_book")
const borrowBtn = document.getElementById("details_borrow_book")
const returnBtn = document.getElementById("details_return_book")
const removeBtn = document.getElementById("details_remove_book")

// Inputs
const labelInput       = document.getElementById("details_book_name")
const authorInput      = document.getElementById("details_book_author")
const releaseInput     = document.getElementById("details_book_release_date")
const descriptionInput = document.getElementById("details_book_description")
const imageInput       = document.getElementById("details_book_img_url")
const statusInput      = document.getElementById("details_book_status")

let inputs = [
    labelInput,
    authorInput,
    releaseInput,
    descriptionInput,
    imageInput,
    statusInput
]

// "Phantom" paragraphs
const phantomParagraphs = Array.prototype.slice.call(
    document.getElementsByClassName("details_phantom_paragraphs")
)

// Other
const headline = document.getElementById("details_screen_headline")

let book = JSON.parse(localStorage["currentBook"])

if (book.status == 1) {
    borrowBtn.style.display = "block"
    returnBtn.style.display = "none"
} else {
    borrowBtn.style.display = "none"
    returnBtn.style.display = "block"
}

// * Event listeners
// Root page
headline.addEventListener('click', indexPage)

// Delete book
removeBtn.addEventListener('click', () => {
    const book_id = document.location.pathname.split('/').slice(-1)[0]
    deleteBook(book_id)
    alert(`Book with id ${book_id} removed.`)
    indexPage()
})

// Edit book
let isEditing = false
editBtn.addEventListener('click', () => {
    isEditing = !isEditing

    if (isEditing) {
        saveBtn.style.display = "block"
        editBtn.style.color = " #2ecc71"

        phantomParagraphs.forEach(el => {
            el.style.display = "none"
        })

        inputs.forEach(el => {
            el.style.display = "block"
        })
    } else {
        saveBtn.style.display = "none"
        editBtn.style.color = " #3498db"

        phantomParagraphs.forEach(el => {
            el.style.display = "block"
        })

        inputs.forEach(el => {
            el.style.display = "none"
        })
    }
})

// Return book
returnBtn.addEventListener('click', () => {
    let book = JSON.parse(localStorage["currentBook"])
    book.status = 1
    book.client = ''
    book.due = ''
    updateBook(book)
    detailsPage(book.id)
})

// Update book
saveBtn.addEventListener('click', () => {
    let book = JSON.parse(localStorage["currentBook"])

    const label = labelInput.value
    const author = authorInput.value
    const release = releaseInput.value
    const image = imageInput.value
    const description = descriptionInput.value

    book.label = label
    book.author = author
    book.release = release
    book.image = image
    book.description = description

    updateBook(book)
    detailsPage(book.id)
})

// Borrow book
borrowBtn.addEventListener('click', () => {
    let book = JSON.parse(localStorage["currentBook"])

    borrowDialog.style.display = 'flex'
    borrowDialogBtn.addEventListener('click', () => {
        const client = borrowDialogCleintInput.value
        const due    = borrowDialogDueInput.value

        book.client = client
        book.due    = due
        book.status = 2

        updateBook(book)
        detailsPage(book.id)
    })
})