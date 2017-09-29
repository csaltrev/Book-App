pl.view.updateBook = {
    setupUI() {
        let form = document.forms['Book'],
            saveButton = form.commit,
            selectBook = form.selectBook;
        let keys = [],
            book = null,
            option = null;

        Book.loadAll();
        keys = Object.keys(Book.instances);
        keys.forEach(key => {
            book = Book.instances[key];
            option = document.createElement("option");
            option.text = book.title;
            option.value = book.isbn;
            selectBook.add(option, null);
        });

        selectBook.addEventListener("change", () => {
            let book = null,
                key = selectBook.value;
            if (key) {
                book = Book.instances[key];
                form.isbn.value = book.isbn;
                form.title.value = book.title;
                form.year.value = book.year;
            } else form.reset();
        });
        saveButton.addEventListener("click",
            pl.view.updateBook.handleUpdateButtonClickEvent);
        window.addEventListener("beforeunload", () => Book.saveAll());
    },
    handleUpdateButtonClickEvent() {
        let form = document.forms['Book'];
        const slots = {
            isbn: form.isbn.value,
            title: form.title.value,
            year: form.year.value
        };
        Book.update(slots);
        form.reset();
    }
};
