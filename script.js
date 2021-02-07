//Selecting the interactive page elements

let newBookButton = document.querySelector("#add-new-book-button");
let bookTitleField = document.querySelector("#book-title");
let authorTitleField = document.querySelector("#book-author");
let pagesField = document.querySelector("#pages");
let checkbox = document.querySelector("#book-read");
let submitNewBook = document.querySelector("#submit-button")
let booksGrid = document.querySelector("#books-grid");
let form = document.querySelector("form")
let bookCompletedButton = document.querySelector(".book-card-read")
let removeBookButton = document.querySelector(".book-card-remove");
let formSection = document.querySelector("#form-section");
let closeFormButton = document.querySelector("#form-close-button");



let books = []

//Adding event listeners

form.addEventListener("submit", addNewBook)
bookCompletedButton.addEventListener("click", bookCompleted);
removeBookButton.addEventListener("click", removeBook);
newBookButton.addEventListener("click", displayForm)
closeFormButton.addEventListener("click", closeForm)


// Building functions

function addNewBook() {
    event.preventDefault();
    booksGrid.innerHTML = "";

    let id = Date.now()
    let newAuthor = authorTitleField.value;
    let newTitle = bookTitleField.value;
    let newPages = pagesField.value;
    let bookRead = event.target[3].checked === true ? true : false;
    let newBook = {
        "data-key": Date.now(),
        author: newAuthor,
        title: newTitle,
        pages: newPages,
        read: bookRead
    }
    books.push(newBook);
    console.log(newBook)

    generateList();

    bookTitleField.value = "";
    authorTitleField.value = "";
    pagesField.value = "";
    checkbox.checked = false;

}

//Function to create book list/grid

function generateList() {
    //Read the array and create the card for each element

    books.forEach(book=> {
        let bookCard = document.createElement("div")
        let bookCardAuthor = document.createElement("div")
        let bookCardTitle = document.createElement("div")
        let bookCardPages = document.createElement("div");

        let bookCardTitleDetail = document.createElement("div");
        let bookCardTitleContent = document.createElement("div");
        let bookCardAuthorDetail = document.createElement("div");
        let bookCardAuthorContent = document.createElement("div");
        let bookCardPagesDetail = document.createElement("div");
        let bookCardPagesContent = document.createElement("div");
        let bookCardButtonDiv = document.createElement("div");

        let readButton = document.createElement("button");
        let removeButton = document.createElement("button");

        //let authorHeader = "Author:"
       // let authorText = document.createTextNode(newAuthor);

       // let titleHeader = "Title:";
        let titleText = document.createTextNode(book.title);

        //let pagesHeader = "Pages:"
        let pagesText = document.createTextNode(book.pages)

        readButton.textContent = "Read"
        removeButton.textContent = "Remove"

        // Append all the constituent elements

        bookCardAuthorDetail.textContent ="Author:"
        bookCardAuthorContent.textContent = book.author

        bookCardTitleDetail.textContent = "Title:"
        bookCardTitleContent.textContent = book.title;

        bookCardPagesDetail.textContent = "Pages:";
        bookCardPagesContent.textContent = book.pages;
        

        //Append to higher divs

        bookCardAuthor.appendChild(bookCardAuthorDetail) 
        bookCardAuthor.appendChild(bookCardAuthorContent) 

        bookCardTitle.appendChild(bookCardTitleDetail) 
        bookCardTitle.appendChild(bookCardTitleContent) 

        bookCardPages.appendChild(bookCardPagesDetail) 
        bookCardPages.appendChild(bookCardPagesContent) 

        bookCardButtonDiv.appendChild(readButton)
        bookCardButtonDiv.appendChild(removeButton)

        //Append subdivs to book card

        bookCard.appendChild(bookCardAuthor)
        bookCard.appendChild(bookCardTitle)
        bookCard.appendChild(bookCardPages)
        bookCard.appendChild(bookCardButtonDiv);

        //Adding classes and events

        bookCard.classList.add("book-card")
        bookCard.setAttribute("data-key", book["data-key"])
        bookCardAuthor.classList.add("book-card-author")
        bookCardTitle.classList.add("book-card-title")  
        bookCardPages.classList.add("book-card-pages");
        bookCardButtonDiv.classList.add("book-card-read-div")

        bookCardAuthorDetail.classList.add("book-card-header-detail")
        bookCardAuthorContent.classList.add("book-card-header-content")

        bookCardTitleDetail.classList.add("book-card-header-detail")
        bookCardTitleContent.classList.add("book-card-header-content")

        bookCardPagesDetail.classList.add("book-card-header-detail");
        bookCardPagesContent.classList.add("book-card-header-content");

        readButton.classList.add("button")
        readButton.classList.add("book-card-button")
        readButton.classList.add("book-card-read")
        readButton.addEventListener("click", bookCompleted)

        removeButton.classList.add("button")
        removeButton.classList.add("book-card-button")
        removeButton.classList.add("book-card-remove")
        removeButton.addEventListener("click", removeBook)


        if(book.read) {
            bookCard.classList.add("read")
        }

      
        //Append book card to book card grid

        booksGrid.appendChild(bookCard);
    


    })

}

//Function to mark book as read

function bookCompleted() {
    event.target.parentElement.parentElement.classList.toggle("read")
}

//Function to remove books
function removeBook(event) {
    //Clear book list

    booksGrid.innerHTML = "";


    books = books.filter(book=> {
       return event.target.parentElement.parentElement.attributes["data-key"].value != book["data-key"]
    })

    console.log(books)

    // Re-draw
    generateList()

}

//All these functions do is change the display status of the form 

function displayForm() {
    formSection.classList.remove("hidden")
}

function closeForm() {
    formSection.classList.add("hidden")
}