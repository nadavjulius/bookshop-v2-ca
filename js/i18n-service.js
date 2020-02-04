var gTrans = {
    filter: {
        en: 'Sort Books',
        he: 'סדר ספרים לפי',
    },
    'logo-sub': {
        en: 'by BlackCoffeeProductions',
        he: 'בחסות BlackCoffeeProductions',
    },
    'filter-name': {
        en: 'Name',
        he: 'שם',
    },
    'filter-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'filter-rating': {
        en: 'rating',
        he: 'דירוג',
    },
    'logo': {
        en: 'Amazon 2.0',
        es: 'Hacer',
        he: 'אמאזון 2.0',
    },
    'add-new-book': {
        en: 'Add New Book',
        he: 'הוסף ספר חדש',
    },
    'thead-id': {
        en: 'Id',
        he: 'מזהה',
    },
    'thead-title': {
        en: 'Title',
        he: 'כותרת',
    },
    'thead-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'model-add-new': {
        en: '📝 Add New Book',
        he: '📝 הוסף ספר חדש'
    },
    'model-add-new-name': {
        en: 'Book Name',
        he: 'שם הספר'
    },
    'model-add-new-author': {
        en: 'Author Name',
        he: 'שם המחבר'
    },
    'model-add-new-price': {
        en: 'Book Price',
        he: 'מחיר'
    },
    'model-add-new-prev': {
        en: 'Book Preview',
        he: 'תקציר'
    },
    'model-add-new-rating': {
        en: 'Rate your book from 1-9',
        he: 'דירוג'
    },
    'model-add-new-link': {
        en: 'Link to Books Cover Image',
        he: 'קישור לתמונה'
    },
    'model-add-new-btn': {
        en: 'Add Book',
        he: 'הוסף ספר'
    },
    'edit-modal': {
        en: '📝 Edit Book',
        he: 'ערוך ספר'
    },
    'edit-modal-price': {
        en: 'Book Price',
        he: 'מחיר'
    },
    'edit-modal-prev': {
        en: 'Book Preview',
        he: 'תקציר'
    },
    'edit-modal-img': {
        en: 'Link to Books Cover Image',
        he: 'תמונה לספר'
    },
    'edit-modal-btn': {
        en: 'Save Changes',
        he: 'שמור שינוים'
    },
    'table-delete-btn': {
        en: 'Delete',
        he: 'מחק'
    },
    'table-edit-btn': {
        en: 'Edit',
        he: 'ערוך'
    },
    'table-read-btn': {
        en: 'Read',
        he: 'עיין'
    },
    'update-rating-btn': {
        en: 'Update Rating',
        he: 'עדכון דירוג'
    },
    'rating-inread': {
        en: 'Rating',
        he: 'דירוג'
    },
    'id-inread': {
        en: 'id',
        he: 'מזהה'
    },
    'price-inread': {
        en: 'Price',
        he: 'מחיר'
    },

}

var gCurrLang = 'en';

function doTrans() {
    // For each el get the data-trans and use getTrans to replace the innerText 
    var els = document.querySelectorAll('[data-trans]');
    els.forEach(el => {
        var txt = getTrans(el.dataset.trans);
        // If this is an input, translate the placeholder
        if (el.placeholder) el.placeholder = txt;
        else el.innerText = txt;
    })
}


function getTrans(transKey) {
    var langMap = gTrans[transKey]
    if (!langMap) return 'UNKNOWN';
    var txt = langMap[gCurrLang]
    // If translation not found - use english
    if (!txt) txt = langMap['en'];
    return txt;
}


function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {
    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };
    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}


function kmToMiles(km) {
    return km / 1.609;
}

function myFormatCurrency(num) {
    return gCurrLang === 'he' ? USDtoNIS(num) : num + '$'
}

function USDtoNIS(usd) {
    return Math.ceil(usd * 3.45) + '₪'
}