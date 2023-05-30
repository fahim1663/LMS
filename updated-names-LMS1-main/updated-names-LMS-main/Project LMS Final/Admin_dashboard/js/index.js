'use strict';
var labels = ["BookId","Book Name", "Author", " Publisher" , "Publish Year"];
/*var books = [
    {
        bookid: 1,
        bookname:"The Feynman Lectures on Physics",
        author:"Richard P. Feynman",
        publisher:"Basic Books",
        publishyear:2011
    },
    {
        bookid: 2,
        bookname:"For the Love of Physics",
        author:"Walter Lewin",
        publisher:"Taxmann Publications",
        publishyear:2012
    }
];*/

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
        
        /*
        if(table.rows.length > 0){
            table.deleteRow(0);
        }*/
        
        var theadTr = document.createElement('tr');
        labels.forEach( (labelText) => {
            var theadTh = document.createElement('th');
            theadTh.innerHTML = labelText;
            theadTr.appendChild(theadTh);
        });
        
        thead.appendChild(theadTr);
        table.appendChild(thead);
        //table.removeChild(tbody);

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

    /*books.forEach( (item) => {
        let curbook =  item.filter(function (){
            return bookidmenu==item.bookid;
        });
        console.log(curbook);
    });*/

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

    let newBook = {};
    newBook = {
        bookid: newBookId,
        bookname:newBookName,
        author:newAuthorName,
        publisher:newPublisherName,
        publishyear:newPublishYear
    }
    console.log(newBook);
    console.log(books);
    books.push(newBook);
    console.log(books);

    alert("New Book Added Successfully");
     return false;
}

function deleteBook(){
    let bookidmenu = document.querySelector("#deletebookidselect").value;
    let deleteBookName =  document.querySelector('input[name="deletebookname"]').value;
    let deleteAuthorName =  document.querySelector('input[name="deleteauthor"]').value;
    let deletePublisherName =  document.querySelector('input[name="deletepublisher"]').value;
    let deletePublishYear =  document.querySelector('input[name="deletepublishyear"]').value;

    var bookindex = books.findIndex( item => item.bookid !== bookidmenu);
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
