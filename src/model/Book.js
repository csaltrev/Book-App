function Book(slots) {
    this.isbn = "";
    this.title = "";
    this.year = 0;
    if (arguments.length > 0) {
        this.setIsbn(slots.isbn);
        this.setTitle(slots.title);
        this.setYear(slots.year);
        if (slots.edition) this.setEdition(slots.edition);
    }
}

Book.checkISBN = function(id) {
    if (!id) {
        return new NoConstraintViolation();
    } else if (typeof(id) !== "string" || id.trim() === "") {
        return new RangeConstraintViolation(
            "The ISBN must be a non-empty string!");
    } else if (!/\b\d{9}(\d|X)\b/.test(id)) {
        return new PatternConstraintViolation(
            "The ISBN must be a 10-digit string or " +
            "a 9-digit string followed by 'X'!");
    } else {
        return new NoConstraintViolation();
    }
};

Book.checkIsbnAsId = function(id) {
    let constraintViolation = Book.checkIsbn(id);
    if ((constraintViolation instanceof NoConstraintViolation)) {
        if (!id) {
            constraintViolation = new MandatoryValueConstraintViolation(
                "A value for the ISBN must be provided!");
        } else if (Book.instances[id]) {
            constraintViolation = new UniquenessConstraintViolation(
                "There is already a book record with this ISBN!");
        } else {
            constraintViolation = new NoConstraintViolation();
        }
    }
    return constraintViolation;
};

Book.instances = {};

Book.add = function(slots) {
    let book = new Book(slots);
    Book.instances[slots.isbn] = book;
    console.log(`Book ${slots.isbn} created!`);
};

Book.loadAll = function() {
    let keys = [],
        booksString = "",
        books = {};
    try {
        if (localStorage["books"]) booksString = localStorage["books"];
    } catch (e) {
        alert(`Error when retrieving from Local Storage: ${e}`);
    }
    if (booksString) {
        books = JSON.parse(booksString);
        keys = Object.keys(books);
        console.log(`${keys.length} books loaded.`);
        keys.forEach(key => Book.instances[key] = new Book(books[key]));
    }
};

Book.update = function(slots) {
    let book = Book.instances[slots.isbn];
    let year = parseInt(slots.year);
    if (book.title !== slots.title) book.title = slots.title;
    if (book.year !== year) book.year = year;
    console.log(`Book ${slots.isbn} modified!`);
};

Book.destroy = function(isbn) {
    if (Book.instances[isbn]) {
        delete Book.instances[isbn];
        console.log(`Book ${isbn} deleted.`);
    } else {
        console.log(`There is no book with ISBN ${isbn} in the database!`);
    }
};

Book.saveAll = function() {
    let booksString = "",
        error = false,
        numberOfBooks = Object.keys(Book.instances).length;
    try {
        booksString = JSON.stringify(Book.instances);
        localStorage["books"] = booksString;
    } catch (e) {
        alert(`Error when writing to Local Storage:" ${e}`);
        error = true;
    }
    if (!error) console.log(`${numberOfBooks} books saved.`);
};

Book.createTestData = function() {
    Book.instances["006251587X"] = new Book({ isbn: "006251587X", title: "Weaving the Web", year: 2000 });
    Book.instances["0465026567"] = new Book({ isbn: "0465026567", title: "Gödel, Escher, Bach", year: 1999 });
    Book.instances["0465030793"] = new Book({ isbn: "0465030793", title: "I Am A Strange Loop", year: 2008 });
    Book.saveAll();
};

Book.clearData = function() {
    if (confirm("Do you really want to delete all book data?")) {
        localStorage["books"] = "{}";
        console.log("Successfully deleted all books.");
    }
};
