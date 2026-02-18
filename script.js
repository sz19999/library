const myLibrary = [];

function Book(name, author, genre) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.genre = genre;
}

function addBookToLibrary(name, author, genre) {
    const book = new Book(name, author, genre);
    myLibrary.push(book);
}

addBookToLibrary("Book 1", "Eddy Green", "Fantasy");
addBookToLibrary("Book 2", "Jack Long", "Non-Fiction");
addBookToLibrary("Book 3", "John Doe", "Horror");

const tableBody = document.querySelector("tbody");

for (let book of myLibrary) {
        const tableRow = document.createElement('tr');
        const nameData = document.createElement('td');
        const authorData = document.createElement('td');
        const genreData = document.createElement('td');

        nameData.textContent = book.name;
        authorData.textContent = book.author;
        genreData.textContent = book.genre;

        tableBody.appendChild(tableRow);
        tableRow.appendChild(nameData);
        tableRow.appendChild(authorData);
        tableRow.appendChild(genreData);
}