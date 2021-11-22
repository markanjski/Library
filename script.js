let bookarr = [
    {
        title: "Snježana i 7patuljaka",
        author: "Braća Grimić",
        pages: 60,
        read: true
    },
    {
        title: "Braća Karmazovi",
        author: "Mark Markson",
        pages: 199,
        read: false
    },
    {
        title: "Moja istina",
        author: "Nives Celzijus",
        pages: 212,
        read: false
    },
    {
        title: "Veliki atlas svijeta",
        author: "Marko Polo",
        pages: 133,
        read: true
    },
    {
        title: "Životinjska Farma",
        author: "George Orwell",
        pages: 267,
        read: false
    }];


    //functions
function Book(t, a, p, r) {
    this.title = t;
    this.author = a;
    this.pages = p;
    this.read = r;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, 
        ${this.read ? "you read it" : "not read yet"}`;
    }
}

function add5Books() {
    bookarr.forEach(x => {
        myLibrary.push(new Book(x.title, x.author, x.pages, x.read));
    });
    setStorage();
}

function setStorage(){
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function addBook() {
    let t = prompt("Add book Title:");
    let a = prompt("Add book Author:");
    let p = prompt("Add number of pages:");
    let r;
    while (r != "yes" && r != "no") {
        r = prompt("Did you read it? (yes or no):");
    }
    r == "yes" ? r = true : r = false;
    myLibrary.push(new Book(t, a, p, r));
    setStorage()
    displayBooks();
}

function displayBooks() {
    //myLibrary = localStorage.getItem("myLibrary");

    library.innerHTML = "";
    myLibrary.forEach((x, i) => {
        const elem = document.createElement("div");
        elem.classList.add("book");
        library.appendChild(elem);
        let readStatus = x.read ? "you read it" : "you didnt read it";
        elem.innerHTML =
            `<p class = "bookP"> ${x.title} by ${x.author}, ${x.pages} pages, ${readStatus} </p>              
            <i class="readCheck fa fa-book icon" style = "margin-left: auto"  data-order = "${i}" data-read = "${x.read}">
            </i>
            <i class="delete fa fa-trash-o icon" data-order = "${i}"></i> `;
    });
    document.querySelectorAll(".delete").forEach(x => {
        x.addEventListener("click", removeBook);
    });
    document.querySelectorAll(".readCheck").forEach((x,i) => {
            if(x.dataset.read == "true")  {
                x.classList.add("read");
            }
            x.addEventListener("click", toggleRead);        
        }
    );  
}

function removeBook() {
    let removeOrder = this.dataset.order;
    myLibrary = myLibrary.filter((x, i) => {
        return i != removeOrder
    });
    setStorage();
    displayBooks();
}

function toggleRead(){
    let bookRead = myLibrary[this.dataset.order].read;
    myLibrary[this.dataset.order].read = bookRead ? false : true;
    setStorage()
    displayBooks();
}

///////execution

let library = document.getElementById("library");
const addBtn = document.querySelector("#addBtn");

document.querySelector("#addBtn").addEventListener("click", addBook);

let myLibrary = [];
if(JSON.parse(localStorage.getItem("myLibrary")).length != 0) {
    console.log("no storage");
    let storrageArr = JSON.parse(localStorage.getItem("myLibrary"));
    storrageArr.forEach( x =>{
        let bookTemp = new Book(x.title, x.author, x.pages, x.read);
        myLibrary.push(bookTemp);

    });
    console.log(storrageArr);
    console.log(myLibrary);
}
else {
    add5Books();  
}

displayBooks();

