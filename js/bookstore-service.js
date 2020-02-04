'use strict'
const KEY = 'books'
const BOOKS_IN_PAGE = 3;

var gBooks;
var gCurrPage = 1;


function changePage(diff) {
    gCurrPage += diff;
    var lastPage = Math.ceil(gBooks.length / BOOKS_IN_PAGE);

    if (gCurrPage > lastPage) gCurrPage = 1;
    else if (gCurrPage < 1) gCurrPage = lastPage;
}

function goToPage(page) {
    gCurrPage = page;
}

function getBooksForDisplay() {
    var from = (gCurrPage - 1) * BOOKS_IN_PAGE;
    var to = from + BOOKS_IN_PAGE;
    return gBooks.slice(from, to);
}

function getPageCount() {
    return Math.ceil(gBooks.length / 3);
}


function setBookSort(sortedBy) {
    if (sortedBy === 'Name') {
        gBooks.sort(function (a, b) {
            var txtA = a.name.toLowerCase();
            var txtB = b.name.toLowerCase();
            if (txtA < txtB) { return -1; }
            if (txtA > txtB) { return 1; }
            return 0;
        })
    }

    if (sortedBy === 'Rating') {
        gBooks.sort(function (a, b) {
            return a.rating - b.rating
        })
    }
    if (sortedBy === 'Price') {
        gBooks.sort(function (a, b) {
            return a.price.substring(1, a.price.length) - b.price.substring(1, b.price.length)
        })
    }
    saveToStorage(KEY, gBooks);
}

function getBooksInfo(bookId) {
    var idx = gBooks.findIndex(function (book) {
        return book.id === bookId
    })
    return gBooks[idx]
}

function updateRating(bookId, newRating) {
    var idx = gBooks.findIndex(function (book) {
        return book.id === bookId
    })
    if (!(newRating === '')) gBooks[idx].rating = newRating;
    saveToStorage(KEY, gBooks);
}

function editBook(bookId, newBookPrice, newImgUrl, newBookPrev) {
    var idx = gBooks.findIndex(function (book) {
        return book.id === bookId
    })
    if (!(newBookPrice === '$')) gBooks[idx].price = newBookPrice;
    if (!(newImgUrl === '<img class="book-img" src= alt="oops! img failed to load">')) gBooks[idx].imgUrl = newImgUrl;
    if (!(newBookPrev === '')) gBooks[idx].prev = newBookPrev;


    saveToStorage(KEY, gBooks);
}

function addBook(name, price, author, imgUrl, rating, bookPrev) {
    var newBook = {
        name: name,
        price: price,
        author: author,
        imgUrl: imgUrl,
        rating: rating,
        prev: bookPrev
    }
    var readyNewBook = _createBook(newBook)
    gBooks.unshift(readyNewBook)
    saveToStorage(KEY, gBooks);
}

function removeBook(bookId) {
    var idx = gBooks.findIndex(function (book) {
        return book.id === bookId
    })
    gBooks.splice(idx, 1);
    saveToStorage(KEY, gBooks);
}

function saveBooks() {
    saveToStorage(KEY, gBooks);
}


function _createBooks() {
    var books = loadFromStorage(KEY);
    if (books) return books;
    var books = [
        { name: 'War and Peace', price: '20.00', author: 'Leo Tolstoy', imgUrl: '<img class="book-img" src="img/warandpeace.jpg" alt="oops! img failed to load">', rating: '4', prev: `War and Peace is a exciting and amazing story about things and stuff that happen to poeple in places. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum` },
        { name: 'The Alchemist', price: '6.00', author: 'Paulo Coelho', imgUrl: '<img class="book-img" src="img/thealchemist.jpg" alt="oops! img failed to load">', rating: '2', prev: `The Alchemist is a exciting and amazing story about things and stuff that happen to poeple in places. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum` },
        { name: 'The Secret', price: '12.00', author: 'Rhonda Byrne', imgUrl: '<img class="book-img" src="img/thesecret.jpg" alt="oops! img failed to load">', rating: '6', prev: `The Secret is a exciting and amazing story about things and stuff that happen to poeple in places. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum` },
        { name: 'Life of Pi', price: '10.00', author: 'Yann Martel', imgUrl: '<img class="book-img" src="img/lifeofpie.jpg" alt="oops! img failed to load">', rating: '9', prev: `Life of Pi is a exciting and amazing story about things and stuff that happen to poeple in places. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum` }
    ]
        .map(_createBook)
    return books;
}

function _createBook(obj) {
    return {
        id: parseInt(Math.random() * 1000),
        name: obj.name,
        price: obj.price,
        author: obj.author,
        imgUrl: obj.imgUrl,
        rating: obj.rating,
        prev: obj.prev
    }
}


