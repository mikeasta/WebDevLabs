// ? Import all funcs
import { 
    indexPage,
    detailsPage, 
    addNewBookPage,
    getBooklist
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

// filter
filterBtn.addEventListener('click', async () => {
    if (allBooksRadio.checked) {
        bookCards.forEach(htmlCard => {
            htmlCard.style.display = "flex"
        })
    } else {
        // Hide all bookcards
        let booklist = await getBooklist()
        bookCards.forEach(htmlCard => {
            htmlCard.style.display = "none"
        })

        
        if (inLibraryRadio.checked) {
            // In library filter
            let inLibrary = []
            booklist.forEach(book => {
                if (book.status == 1) {
                    inLibrary.push(book.id)
                }
            })

            bookCards.forEach(htmlCard => {
                const id = Number(htmlCard.id.split('book_id#')[1])
                if (inLibrary.includes(id)) {
                    htmlCard.style.display = "flex"
                }
            })
        } else if (withClientRadio.checked) {
            // With client filter
            let withClient = []
            booklist.forEach(book => {
                if (book.status == 2) {
                    withClient.push(book.id)
                }
            })

            bookCards.forEach(htmlCard => {
                const id = Number(htmlCard.id.split('book_id#')[1])
                if (withClient.includes(id)) {
                    htmlCard.style.display = "flex"
                }
            })
        } else if (dueIsOverRadio.checked) {
            // First of all, lets get all status-2 books
            // With client filter
            let withClientBooks = []
            booklist.forEach(book => {
                if (book.status == 2) {
                    withClientBooks.push(book)
                }
            })

            // Then lets filter by due date
            let dueIsOver = []
            withClientBooks.forEach(book => {
                const date    = new Date();
                const curTime = date.getTime()

                const dueDate = new Date(book.due)
                const dueTime = dueDate.getTime()

                // Due is over
                if (curTime > dueTime) {
                    dueIsOver.push(book.id)
                }
            })

            bookCards.forEach(htmlCard => {
                const id = Number(htmlCard.id.split('book_id#')[1])
                if (dueIsOver.includes(id)) {
                    htmlCard.style.display = "flex"
                }
            })
        }
    }
})