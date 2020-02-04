'use strict'

function init() {
    gBooks = _createBooks();
    saveBooks();
    renderTable();
    renderPageToBtns();
}

function onChangePage(diff) {
    changePage(diff)
    renderTable();
}

function onGoToPage(page) {
    goToPage(page);
    renderTable();
}

function onDeleteBook(event, bookId) {
    event.stopPropagation();
    var isSure = confirm('Are you sure?');
    if (isSure) {
        removeBook(bookId);
        renderTable();
    }
}

// Language change
function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }

    renderTable();
}

// Add Book
function onOpenAddBookModal() {
    var modal = document.querySelector('.modal-add');
    modal.style.display = 'flex';
    onWindowAddModalModeClick()
}

function onCloseAddModalbtn() {
    var modal = document.querySelector('.modal-add');
    modal.style.display = "none";
    onWindowAddModalModeClick()
}

function onWindowAddModalModeClick() {
    var modal = document.querySelector('.modal-add');
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

function onAddBook() {
    var elTxtBookName = document.querySelector('.txt-book-name');
    var elTxtAuthorName = document.querySelector('.txt-auther-name');
    var elTxtNewBookPrev = document.querySelector('.txt-book-prev');
    var elTxtBookPrice = document.querySelector('.txt-book-price');
    var elTxtImgUrl = document.querySelector('.txt-url');
    var elTxtRating = document.querySelector('.txt-rating');


    var bookName = elTxtBookName.value;
    var authorName = elTxtAuthorName.value;
    var bookPrev = elTxtNewBookPrev.value;
    var bookPrice = `${elTxtBookPrice.value}`;
    var imgUrl = `<img class="book-img" src=${elTxtImgUrl.value} alt="oops! img failed to load">`;
    var bookRating = elTxtRating.value;

    addBook(bookName, bookPrice, authorName, imgUrl, bookRating, bookPrev);
    renderTable();

    elTxtNewBookPrev.value = '';
    elTxtRating.value = '';
    elTxtBookName.value = '';
    elTxtAuthorName.value = '';
    elTxtBookPrice.value = '';
    elTxtImgUrl.value = '';
}

// Edit Book
function onOpenEditBookModal(bookId) {
    var modal = document.querySelector('.modal-edit');
    modal.style.display = 'flex';
    onWindowEditModalModeClick()
    renderSaveEditModalBtn(bookId);
}

function onCloseEditModalbtn() {
    var modal = document.querySelector('.modal-edit');
    modal.style.display = "none";
    onWindowEditModalModeClick()
}

function onWindowEditModalModeClick() {
    var modal = document.querySelector('.modal-edit');
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

function onSaveChanges(bookId) {

    var elTxtNewBookPrice = document.querySelector('.txt-edit-book-price');
    var elTxtNewBookPrev = document.querySelector('.txt-edit-book-prev');
    var elTxtNewImgUrl = document.querySelector('.txt-edit-url');

    var newBookPrev = elTxtNewBookPrev.value;
    var newBookPrice = `$${elTxtNewBookPrice.value}`;
    var newImgUrl = `<img class="book-img" src=${elTxtNewImgUrl.value} alt="oops! img failed to load">`;
    editBook(bookId, newBookPrice, newImgUrl, newBookPrev);
    renderTable();

    elTxtNewBookPrev.value = '';
    elTxtNewBookPrice.value = '';
    elTxtNewImgUrl.value = '';
}

// Read Book
function onOpenReadModal(bookId) {
    var modal = document.querySelector('.modal-book-details');
    modal.style.display = 'flex';
    var reqBook = getBooksInfo(bookId);

    renderReadModal(reqBook.name, reqBook.prev, reqBook.imgUrl, reqBook.author, reqBook.price, reqBook.id)
    renderUpdatingRatingBtn(bookId);
    renderReaderRating(bookId);


    onWindowEditModalModeClick()
}

function onCloseReadModalbtn() {
    var modal = document.querySelector('.modal-book-details');
    modal.style.display = "none";
    onWindowEditModalModeClick()
}

function onWindowEditModalModeClick() {
    var modal = document.querySelector('.modal-book-details');
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

function onUpdateRating(bookId) {
    var elTxtNewBookRatig = document.querySelector('.new-rating');
    var newRating = elTxtNewBookRatig.value

    updateRating(bookId, newRating)
    renderReaderRating(bookId)
    renderTable();
    elTxtNewBookRatig.value = '';
}

// Sorting
function onSortChanged(sortedBy) {

    setBookSort(sortedBy);
    renderTable();
}

function onSortChangedBtn(sortedBy) {
    setBookSort(sortedBy.innerHTML);
    renderTable();
}

// Redering

function renderReaderRating(bookId) {
    var openedBook = getBooksInfo(bookId);
    var strHTML = `${openedBook.rating}`
    var elRating = document.querySelector('.book-dets-rating')
    elRating.innerHTML = strHTML;

    doTrans();
}

function renderUpdatingRatingBtn(bookId) {
    var strHTML = `<button data-trans="update-rating-btn" class="new-rating-btn" onclick="onUpdateRating(${bookId})">Update Rating</button>`
    var elBtn = document.querySelector('.btn-location')
    elBtn.innerHTML = strHTML;

    doTrans();
}

function renderSaveEditModalBtn(bookId) {
    var strHTML = `<button data-trans="edit-modal-btn" onclick = "onSaveChanges(${bookId})" class="edit-book-btn" >Save Changes</button >`
    var elTable = document.querySelector('.save-changes-btn')
    elTable.innerHTML = strHTML;

    doTrans();
}


function renderTable() {
    var bookLibrary = getBooksForDisplay();
    var readyStrHtml = bookLibrary.map(function (book) {
        var strHTML = ``;
        strHTML += `<tr>
        <td>
        <div class="action-container">
        <button data-trans="table-read-btn" class="read-btn" onclick="onOpenReadModal(${book.id})">Read</button>
        <button data-trans="table-edit-btn" class="edit-btn" onclick="onOpenEditBookModal(${book.id})">Edit</button>
        <button data-trans="table-delete-btn" class="delete-btn" onclick="onDeleteBook(event, ${book.id})">Delete</button>
        </div>
        </td>
        <td>${book.id}</td>
        <td><h3>${book.name}</h3><span class="author">${book.author}</span></td>
        <td>${myFormatCurrency(book.price)}</td>
        <td>${book.rating}</td>
        </tr>`;
        return strHTML;
    })

    var elTable = document.querySelector('.table-body')
    elTable.innerHTML = readyStrHtml.join('');

    doTrans();
    renderPageToBtns();
}

function renderReadModal(name, prev, imgUrl, author, price, id) {
    var strHtml = `<div class="modal-book-details-content">
    <div class="img-container">
        <div class="book-dets-img">${imgUrl}</div>
        <div class="book-dets-prev">${prev}</div>
        <div onclick="onCloseReadModalbtn()" class="close x-read">&times;</div>
    </div>
    <div class="name-and-author">
        <h2 class="book-dets-name">${name}</h2>
        <span class="book-dets-author">${author}</span>
    </div>
    <div class="book-num-info">
    <div>
        <span data-trans="price-inread"></span>
        <div class="book-dets-price">${myFormatCurrency(price)}</div>
        </div>
        <div class="book-dets-rating-container">
            <span data-trans="rating-inread"></span>
            <div class="book-dets-rating"></div>
            <div class="new-rating-container">
                <input class="new-rating" type="number" value="1" min="0" max="9">
                <section class="btn-location"></section>
            </div>
        </div>
        <div>
        <span data-trans="id-inread"></span>
        <div class="book-dets-id">${id}</div>
        </div>
    </div>
</div>`;

    var elModal = document.querySelector('.modal-book-details');
    elModal.innerHTML = strHtml;
    doTrans();
}

function renderPageToBtns() {
    var pageCount = getPageCount();

    var strHTML = ``
    for (var i = 0; i < pageCount; i++) {
        strHTML += `<button class="page-to-btn" onclick="onGoToPage(${i + 1})">${i + 1}</button>`
    }

    var elPageSelectorBtns = document.querySelector('.selcet-page-btn-container');
    elPageSelectorBtns.innerHTML = strHTML;
}