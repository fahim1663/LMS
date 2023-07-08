"use strict";

// Toggle password visibility
function togglePassword() {
  var x = document.getElementById("passInput");
  var y = document.getElementById("passInput2");

  if (x.type === "password") {
    x.type = "text";
    y.type = "text";
  } else {
    x.type = "password";
    y.type = "password";
  }
}

// Book data
const books = [];

// DOM elements
var addBlock = document.querySelector(".add-book");
var updateBlock = document.querySelector(".update-book");
var deleteBlock = document.querySelector(".delete-book");
let listBlock = document.querySelector(".list-book");

// Labels for book properties
var labels = ["BookId", "Book Name", "Author", "Publisher", "Publish Year"];

// Show Add Book section
function showAddBooks() {
  addBlock.style.display = "block";
  updateBlock.style.display = "none";
  deleteBlock.style.display = "none";
  listBlock.style.display = "none";
}

// Show Update Book section
function showUpdateBooks() {
  addBlock.style.display = "none";
  updateBlock.style.display = "block";
  deleteBlock.style.display = "none";
  listBlock.style.display = "none";

  let bookIdMenu = document.querySelector("#bookidselect");
  if (bookIdMenu != null) {
    bookIdMenu.innerHTML = "";
  }

  books.forEach((book) => {
    var option = document.createElement("option");
    option.innerHTML = book.bookid;
    option.value = book.bookid;
    bookIdMenu.appendChild(option);
  });
}

// Show Delete Book section
function showDeleteBooks() {
  addBlock.style.display = "none";
  updateBlock.style.display = "none";
  deleteBlock.style.display = "block";
  listBlock.style.display = "none";

  let bookIdMenu = document.querySelector("#deletebookidselect");
  if (bookIdMenu != null) {
    bookIdMenu.innerHTML = "";
  }

  books.forEach((book) => {
    var option = document.createElement("option");
    option.innerHTML = book.bookid;
    option.value = book.bookid;
    bookIdMenu.appendChild(option);
  });
}

// Show List of Books section
function showBooks() {
  addBlock.style.display = "none";
  updateBlock.style.display = "none";
  deleteBlock.style.display = "none";
  listBlock.style.display = "block";

  if (books.length !== 0) {
    var table = document.createElement("table");
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");

    var theadTr = document.createElement("tr");
    labels.forEach((labelText) => {
      var theadTh = document.createElement("th");
      theadTh.innerHTML = labelText;
      theadTr.appendChild(theadTh);
    });

    thead.appendChild(theadTr);
    table.appendChild(thead);

    books.forEach((book) => {
      var tbodyTr = document.createElement("tr");
      Object.keys(book).forEach(function (item) {
        var tbodyTd = document.createElement("td");
        tbodyTd.innerHTML = book[item];
        tbodyTr.appendChild(tbodyTd);
      });
      tbody.appendChild(tbodyTr);
    });

    table.appendChild(tbody);
    listBlock.innerHTML = ""; // Clear existing table, if any
    listBlock.appendChild(table);
  }
}

// Update selected book's details in the form
function updateBookIdChange() {
  let bookIdMenu = document.querySelector("#bookidselect").value;
  var currentBook = books.find((item) => item.bookid === bookIdMenu);

  document.querySelector('input[name="updatebookname"]').value = currentBook.bookname;
  document.querySelector('input[name="updateauthor"]').value = currentBook.author;
  document.querySelector('input[name="updatepublisher"]').value = currentBook.publisher;
  document.querySelector('input[name="updatepublishyear"]').value = currentBook.publishyear;
}

// Update book details
function updateBook() {
  let bookIdMenu = document.querySelector("#bookidselect").value;
  let updatedBookName = document.querySelector('input[name="updatebookname"]').value;
  let updatedAuthorName = document.querySelector('input[name="updateauthor"]').value;
  let updatedPublisherName = document.querySelector('input[name="updatepublisher"]').value;
  let updatedPublishYear = document.querySelector('input[name="updatepublishyear"]').value;

  var bookIndex = books.findIndex((item) => item.bookid === bookIdMenu);
  books[bookIndex].bookname = updatedBookName;
  books[bookIndex].author = updatedAuthorName;
  books[bookIndex].publisher = updatedPublisherName;
  books[bookIndex].publishyear = updatedPublishYear;

  alert("Book with Book ID - " + bookIdMenu + " updated successfully.");
  return false;
}

// Add new book
function addBook() {
  let newBookId = document.querySelector('input[name="bookid"]').value;
  let newBookName = document.querySelector('input[name="bookname"]').value;
  let newAuthorName = document.querySelector('input[name="author"]').value;
  let newPublisherName = document.querySelector('input[name="publisher"]').value;
  let newPublishYear = document.querySelector('input[name="publishyear"]').value;

  let newBook = {
    bookid: newBookId,
    bookname: newBookName,
    author: newAuthorName,
    publisher: newPublisherName,
    publishyear: newPublishYear,
  };

  books.push(newBook);

  alert("New book added successfully.");
  return false;
}

// Delete book
function deleteBook() {
  let bookIdMenu = document.querySelector("#deletebookidselect").value;

  var bookIndex = books.findIndex((item) => item.bookid === bookIdMenu);
  books.splice(bookIndex, 1);

  alert("Book with Book ID - " + bookIdMenu + " deleted successfully.");
  return false;
}

// Update delete book form when book ID changes
function deleteBookIdChange() {
  let bookIdMenu = document.querySelector("#deletebookidselect").value;
  var currentBook = books.find((item) => item.bookid === bookIdMenu);

  document.querySelector('input[name="deletebookname"]').value = currentBook.bookname;
  document.querySelector('input[name="deleteauthor"]').value = currentBook.author;
  document.querySelector('input[name="deletepublisher"]').value = currentBook.publisher;
  document.querySelector('input[name="deletepublishyear"]').value = currentBook.publishyear;
}
