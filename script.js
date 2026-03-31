// Controle do DOM para adição do formulário:
const addNewBookButton = document.getElementById('add-new-book-button');
const sidebarDiv = document.querySelector('.content-sidebar-menu');

function createTextFormField(inputId, inputName, labelInnerHTML) {
    let formField = document.createElement('div');
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', inputName);
    input.setAttribute('id', inputId);
    input.required = true;

    let label = document.createElement('label');
    label.htmlFor = inputId;
    label.innerHTML = labelInnerHTML;

    formField.append(label, input);
    formField.classList.add('form-field');
    return formField;
}

function createNumberFormField(inputId, inputName, inputMin, inputValue, labelInnerHTML) {
    let formField = document.createElement('div');
    let input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('name', inputName);
    input.setAttribute('min', inputMin);
    input.setAttribute('value', inputValue);
    input.setAttribute('id', inputId);
    input.required = true;

    let label = document.createElement('label');
    label.htmlFor = inputId;
    label.innerHTML = labelInnerHTML;

    formField.append(label, input);
    formField.classList.add('form-field');
    return formField;
}

function createRadioButtonField(inputId, inputName, inputValue, labelInnerHTML) {
    let RadioButtonField = document.createElement('div');
    let input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('id', inputId);
    input.setAttribute('name', inputName);
    input.setAttribute('value', inputValue);
    input.required = true;

    let label = document.createElement('label');
    label.htmlFor = inputId;
    label.innerHTML = labelInnerHTML;

    RadioButtonField.append(label, input);
    RadioButtonField.classList.add('radio-button-field');
    return RadioButtonField;
}

function createForm() {
    let form = document.createElement('form');

    let titleFormField = createTextFormField('book-title', 'book-title', 'Title of the book:');
    let authorFormField = createTextFormField('book-author', 'book-author', 'Author of the book:');
    let numberOfPagesFormField = createNumberFormField('book-number-of-pages', 'book-number-of-pages', '1', '1', 'Number of pages:');
    let alreadyReadRadioField = createRadioButtonField('already-read', 'book-read-or-not', 'Book read', 'Book read:');
    let notReadYetField = createRadioButtonField('not-read-yet', 'book-read-or-not', 'Not read yet', 'Not read yet:');

    const cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancel';
    cancelButton.setAttribute('type', 'button');
    cancelButton.addEventListener('click', removeFormFromSidebar);

    const submitButton = document.createElement('button');
    submitButton.innerText = 'Add book';
    submitButton.setAttribute('type', 'submit');

    let formButtonsField = document.createElement('div');
    formButtonsField.classList.add('form-buttons');
    formButtonsField.append(submitButton, cancelButton);

    form.append(titleFormField, authorFormField, numberOfPagesFormField,
        alreadyReadRadioField, notReadYetField, formButtonsField);

    form.addEventListener('submit', (event) => {

        let bookTitle = document.getElementById('book-title').value;
        let bookAuthor = document.getElementById('book-author').value;
        let bookNumberOfPages = document.getElementById('book-number-of-pages').value;

        let bookRead = document.getElementById('already-read').checked;
        let notReadYet = document.getElementById('not-read-yet').checked;
        let bookReadConclusion = false;
        if (bookRead) {
            bookReadConclusion = true;
        }
        if (notReadYet) {
            bookReadConclusion = false;
        }

        addBook(bookTitle, bookAuthor, bookNumberOfPages, bookReadConclusion);

        event.preventDefault();

    });

    return form;
}

function addFormToSidebar() {
    const sidebarForm = createForm();
    sidebarDiv.removeChild(addNewBookButton);
    sidebarDiv.appendChild(sidebarForm);
}

function removeFormFromSidebar() {
    sidebarDiv.innerHTML = '';
    sidebarDiv.appendChild(addNewBookButton);
}

addNewBookButton.addEventListener('click', addFormToSidebar);

// Construção, manipulação e display dos objetos Book:
class Book {
    constructor(title, author, numberOfPages, haveRead) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.haveRead = haveRead;
    }

    showInfo() {
        console.log(`${this.title} by ${this.author}, ${this.numberOfPages} pages, ${this.haveRead ? 'already read.' : 'not read yet!'}`);
    }
}

let books = [];

function addBook(bookTitle, bookAuthor, numberOfPages, HaveRead) {
    let book = new Book(bookTitle, bookAuthor, numberOfPages, HaveRead);
    book.showInfo();
    books.push(book);

    document.getElementById('book-title').value = '';
    document.getElementById('book-author').value = '';
    document.getElementById('book-number-of-pages').value = '1';
    document.getElementById('already-read').checked = false;
    document.getElementById('not-read-yet').checked = false;

    displayBook(book);
}

function displayBook(book) {
    const books = document.querySelector('.books');
    let bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.setAttribute('id', book.Id);

    let title = document.createElement('h3');
    title.textContent = book.title;
    let author = document.createElement('h4');
    author.textContent = book.author;
    let numberOfPages = document.createElement('h4');
    numberOfPages.textContent = `${book.numberOfPages} pages`;
    let bookRead = document.createElement('h4');
    bookRead.textContent = book.haveRead ? 'Already read' : 'Not read yet';

    let bookCardButtonsDiv = document.createElement('div');
    bookCardButtonsDiv.classList.add('book-card-buttons-div');

    let removeBookButton = document.createElement('button');
    removeBookButton.innerText = 'Remove book';
    removeBookButton.setAttribute('type', 'button');

    // A arrow function embrulha a chamada da função para que não aconteça ao ser passada ao eventListener.
    removeBookButton.addEventListener('click', () => removeBookAndBookCard(book.Id));

    bookCardButtonsDiv.append(removeBookButton);

    bookCard.append(title, author, numberOfPages, bookRead, bookCardButtonsDiv);

    books.append(bookCard);
}

function removeBookAndBookCard(bookId) {
    let elementToRemove = document.getElementById(bookId);
    if (elementToRemove) {
        elementToRemove.remove();
    }

    const index = books.findIndex(obj => obj.Id === bookId);
    if (index !== -1) {
        books.splice(index, 1);
    }
}