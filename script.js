function Book(name, author, genre) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.genre = genre;
}

const myLibrary = [];
const tableBody = document.querySelector("tbody");
const dialog = document.querySelector('dialog');
const bookForm = document.querySelector('form');
const plusBtn = document.querySelector('.plus-btn');
const abortBtn = document.querySelector('.abort');

// --- LOGIC ---

function addBookToLibrary(name, author, genre) {
    const book = new Book(name, author, genre);
    myLibrary.push(book);
    showLibrary(); // refresh the display whenever data changes
}

function showLibrary() {
    // clear the current table so we don't get duplicates
    tableBody.innerHTML = "";

    for (let book of myLibrary) {
        const tableRow = document.createElement('tr');
        
        tableRow.innerHTML = `
            <td><button class="remove-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>minus-circle-outline</title><path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7" /></svg>
                </button></td>
            <td class="book-id">${book.id}</td>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
        `;

        // attach the delete listener to the new button
        tableRow.querySelector('.remove-btn').addEventListener('click', removeBook);

        tableBody.appendChild(tableRow);
    }
}

addBookToLibrary("Book 1", "John Doe", "Horror");
addBookToLibrary("Book 2", "Jack Armstrong", "Fiction");
addBookToLibrary("Book 3", "Lance Blue", "Fantasy");

function removeBook(e) {
    const row = e.currentTarget.closest('tr');
    if (row) {
        const id = row.querySelector('.book-id').textContent;
        const idx = myLibrary.findIndex(book => book.id === id);
        if (idx !== -1) myLibrary.splice(idx, 1);
        row.remove();
    }
}

// --- EVENT LISTENERS ---

plusBtn.addEventListener('click', () => dialog.showModal());

// handle form submission
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    addBookToLibrary(data.name, data.author, data.genre);
    
    e.currentTarget.reset();
    dialog.close();          
});

abortBtn.addEventListener('click', () => {
    dialog.close();
});
