// Import all funcs
import { indexPage, detailsPage, addNewBookPage } from "./client.js"

// Import all DOM elements
const headline      = document.getElementById('main_screen_headline')
const book_cards    = document.getElementsByClassName('book_card')
const new_book_card = document.getElementById('add_new_book')

// Event handlers
headline.addEventListener('click', () => {})        // Root page
new_book_card.addEventListener('click', () => {})   // New book page
