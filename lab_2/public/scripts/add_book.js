// ? Import all funcs
import { indexPage, createNewBook } from "./client.js"


// ? Import DOM elements
const headline         = document.getElementById('add_book_screen_headline')
const labelInput       = document.getElementById('add_book_name')
const authorInput      = document.getElementById('add_book_author')  
const releaseInput     = document.getElementById('add_book_release')    
const descriptionInput = document.getElementById('add_book_description') 
const imageInput       = document.getElementById('add_book_img_url') 
const saveBtn          = document.getElementById('add_save_book') 



// ? Event Handlers
// Root page
headline.addEventListener('click', indexPage)    

// Saving new book
saveBtn.addEventListener('click', async () => {
    // Getting inputs data
    const label       = labelInput.value
    const author      = authorInput.value
    const description = descriptionInput.value
    const image       = imageInput.value
    const release     = releaseInput.value

    // Forming the book
    const book = {
        label,
        author,
        description,
        image,
        release,
        status: 1,
        client: '',
        due: '',
    }

    await createNewBook(book)
    alert('New book created')
    indexPage()
})