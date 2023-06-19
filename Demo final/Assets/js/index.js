"use strict";

function togglePassword() {
  var x = document.getElementById("myInput");
  var y = document.getElementById("myInput2");

  if (x.type === "password") {
    x.type = "text";
    y.type = "text";
  } else {
    x.type = "password";
    y.type = "password";
  }
}

const inputs = document.querySelectorAll("input");
const button = document.querySelector("button");

// Iterate over all inputs
inputs.forEach((input, index1) => {
  input.addEventListener("keyup", (e) => {
    // Get the current input element
    const currentInput = input;
    // Get the next sibling element of the current input element
    const nextInput = input.nextElementSibling;
    // Get the previous sibling element of the current input element
    const prevInput = input.previousElementSibling;

    // If the value has more than one character, clear it
    if (currentInput.value.length > 1) {
      currentInput.value = "";
      return;
    }

    // If the next input is disabled and the current value is not empty,
    // enable the next input and focus on it
    if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
      nextInput.removeAttribute("disabled");
      nextInput.focus();
    }

    // If the backspace key is pressed
    if (e.key === "Backspace") {
      // Iterate over all inputs again
      inputs.forEach((input, index2) => {
        // If the index1 of the current input is less than or equal to the index2 of the input in the outer loop
        // and the previous element exists, set the disabled attribute on the input and focus on the previous element
        if (index1 <= index2 && prevInput) {
          input.setAttribute("disabled", true);
          input.value = "";
          prevInput.focus();
        }
      });
    }

    // If the fourth input (which index number is 3) is not empty and does not have the disabled attribute,
    // add the active class to the button; otherwise, remove the active class.
    if (!inputs[3].disabled && inputs[3].value !== "") {
      button.classList.add("active");
      return;
    }
    button.classList.remove("active");
  });
});

// Focus the first input, which has an index of 0, on window load
window.addEventListener("load", () => inputs[0].focus());

var labels = ["BookId","Book Name", "Author", " Publisher" , "Publish Year"];
const books = [];
var addblock = document.querySelector(".add-book");
var updateblock = document.querySelector(".update-book");
var deleteblock = document.querySelector(".delete-book");
let listblock= document.querySelector(".list-book");


function showAddBooks(){
    addblock.style.display = 'block';
    updateblock.style.display = 'none';
    deleteblock.style.display = 'none';
    listblock.style.display = 'none';
}

function showUpdateBooks(){
    addblock.style.display = 'none';
    updateblock.style.display = 'block';
    deleteblock.style.display = 'none';
    listblock.style.display = 'none';

    let bookidmenu = document.querySelector("#bookidselect");
    if(bookidmenu != null){
        bookidmenu.innerHTML ="";
    }
    books.forEach( (book) =>
        {
            var opt = document.createElement('option');
            opt.innerHTML = book.bookid;
            opt.value = book.bookid;
            bookidmenu.appendChild(opt);
        }
    );
}

function showDeleteBooks(){
    addblock.style.display = 'none';
    updateblock.style.display = 'none';
    deleteblock.style.display = 'block';
    listblock.style.display = 'none';

    let bookidmenu = document.querySelector("#deletebookidselect");
    if(bookidmenu != null){
        bookidmenu.innerHTML ="";
    }
    books.forEach( (book) =>
        {
            var opt = document.createElement('option');
            opt.innerHTML = book.bookid;
            opt.value = book.bookid;
            bookidmenu.appendChild(opt);
        }
    );
}

function showBooks(){
    addblock.style.display = 'none';
    updateblock.style.display = 'none';
    deleteblock.style.display = 'none';
    listblock.style.display = 'block';

    if(books.length !== 0){
        var table = document.createElement('table');
        var thead = document.createElement('thead');
        var tbody = document.createElement('tbody');

        var theadTr = document.createElement('tr');
        labels.forEach( (labelText) => {
            var theadTh = document.createElement('th');
            theadTh.innerHTML = labelText;
            theadTr.appendChild(theadTh);
        });

        thead.appendChild(theadTr);
        table.appendChild(thead);

        books.forEach( (book) =>
            {
                var tbodyTr = document.createElement('tr');
                Object.keys(book).forEach( function (item)  {
                    var tbodyTd = document.createElement('td');
                    tbodyTd.innerHTML = book[item];
                    tbodyTr.appendChild(tbodyTd);
                });
                tbody.appendChild(tbodyTr);
            }
        );
        table.appendChild(tbody);
        listblock.appendChild(table);
    }
}

function updateBookIdChange(){
    let bookidmenu = document.querySelector("#bookidselect").value;
    var curbook = books.filter(function(item){
        return item.bookid == bookidmenu;
    });

    document.querySelector('input[name="updatebookname"]').value = curbook[0].bookname;
    document.querySelector('input[name="updateauthor"]').value = curbook[0].author;
    document.querySelector('input[name="updatepublisher"]').value = curbook[0].publisher;
    document.querySelector('input[name="updatepublishyear"]').value = curbook[0].publishyear;
}

function updateBook(){
    let bookidmenu = document.querySelector("#bookidselect").value;
    let updatedBookName =  document.querySelector('input[name="updatebookname"]').value;
    let updatedAuthorName =  document.querySelector('input[name="updateauthor"]').value;
    let updatedPublisherName =  document.querySelector('input[name="updatepublisher"]').value;
    let updatedPublishYear =  document.querySelector('input[name="updatepublishyear"]').value;

    var bookindex = books.findIndex( item => item.bookid == bookidmenu);
    books[bookindex].bookname = updatedBookName;
    books[bookindex].author = updatedAuthorName;
    books[bookindex].publisher = updatedPublisherName;
    books[bookindex].publishyear = updatedPublishYear;

    alert("Book with Book id-" +bookidmenu +" Updated Successfully");
    return false;
}

function addBook(){
    let newBookId = document.querySelector('input[name="bookid"]').value;
    let newBookName =  document.querySelector('input[name="bookname"]').value;
    let newAuthorName =  document.querySelector('input[name="author"]').value;
    let newPublisherName =  document.querySelector('input[name="publisher"]').value;
    let newPublishYear =  document.querySelector('input[name="publishyear"]').value;

    let newBook = {
        bookid: newBookId,
        bookname: newBookName,
        author: newAuthorName,
        publisher: newPublisherName,
        publishyear: newPublishYear
    };

    books.push(newBook);

    alert("New Book Added Successfully");
     return false;
}

function deleteBook(){
    let bookidmenu = document.querySelector("#deletebookidselect").value;
    let deleteBookName =  document.querySelector('input[name="deletebookname"]').value;
    let deleteAuthorName =  document.querySelector('input[name="deleteauthor"]').value;
    let deletePublisherName =  document.querySelector('input[name="deletepublisher"]').value;
    let deletePublishYear =  document.querySelector('input[name="deletepublishyear"]').value;

    var bookindex = books.findIndex( item => item.bookid == bookidmenu);
    books.splice(bookindex,1);

    alert("Book with Book id-" +bookidmenu +" Deleted Successfully");
    return false;
}

function deleteBookIdChange(){
    let bookidmenu = document.querySelector("#deletebookidselect").value;

    var curbook = books.filter(function(item){
        return item.bookid == bookidmenu;
    });

    document.querySelector('input[name="deletebookname"]').value = curbook[0].bookname;
    document.querySelector('input[name="deleteauthor"]').value = curbook[0].author;
    document.querySelector('input[name="deletepublisher"]').value = curbook[0].publisher;
    document.querySelector('input[name="deletepublishyear"]').value = curbook[0].publishyear;
}