// ? Import all funcs
import { 
    indexPage,
    detailsPage, 
    addNewBookPage,
    getBooklist,
    filterInLibrary,
    filterWithClient,
    filterDueExpired
} from "./client.js"

// ? Import radios and filter btn
const allBooksRadio   = document.getElementById("filter_radio_0")
const inLibraryRadio  = document.getElementById("filter_radio_1")
const withClientRadio = document.getElementById("filter_radio_2")
const dueIsOverRadio  = document.getElementById("filter_radio_3")
const filterBtn       = document.getElementById("filter_btn")

// ? Import DOM elements
const headline    = document.getElementById('main_screen_headline')
const bookCards   = Array.prototype.slice.call(document.getElementsByClassName('book_card'))
const newBookCard = document.getElementById('add_new_book')
const bookList    = document.getElementById("booklist")

// ? Event handlers
// Root page
headline.addEventListener('click', indexPage)         

// New book page
newBookCard.addEventListener('click', addNewBookPage) 

// Book details page
bookCards.forEach(htmlCard => {
    htmlCard.addEventListener('click', () => {
        const id = htmlCard.id.split('book_id#')[1]
        detailsPage(id)
    })
})

// Filter
filterBtn.addEventListener('click', async () => {
    // Clean booklist
    bookList.innerHTML = ""

    // Create Booklist list
    let books = []

    // Check if correct radio checked
    if (allBooksRadio.checked)        books = await getBooklist()
    else if (inLibraryRadio.checked)  books = await filterInLibrary()
    else if (withClientRadio.checked) books = await filterWithClient()
    else if (dueIsOverRadio.checked)  books = await filterDueExpired()

    // Fill list with books
    books.forEach(book => {
        let str = ''
        let b = book.due.split('-')
        if(book.status === 1) {str = "В наличии"} else { str = `Пребывает у клиента ${book.client} до ${b[2]}/${b[1]}/${b[0]}`}
        
        let element = 
        `<li class="book_card" id='book_id#${book.id}'>` +
            `<img class="book_img" src=${book.image} alt=""></img>` +
            "<p class='book_label'>" + book.label + "</p>" +
            "<p class='book_author'>" + book.author + "</p>" +
            `<p class='book_status book_status_${book.status}'>` + str +
        '</li>'

        bookList.innerHTML += element
    })

    // Update event listeners
    bookCards   = Array.prototype.slice.call(document.getElementsByClassName('book_card'))
    bookCards.forEach(htmlCard => {
        htmlCard.addEventListener('click', () => {
            const id = htmlCard.id.split('book_id#')[1]
            detailsPage(id)
        })
    })
})