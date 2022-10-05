// ? Import all funcs
import { indexPage, detailsPage, addNewBookPage } from "./client.js"

// ? Import all DOM elements
const headline      = document.getElementById('main_screen_headline')
const book_cards    = Array.prototype.slice.call(document.getElementsByClassName('book_card'))
const new_book_card = document.getElementById('add_new_book')

// ? Event handlers
// Root page
headline.addEventListener('click', indexPage)         

// New book page
new_book_card.addEventListener('click', addNewBookPage) 

// Book details page
book_cards.forEach(htmlCard => {
    htmlCard.addEventListener('click', () => {
        const id = htmlCard.id.split('book_id#')[1]
        detailsPage(id)
    })
})