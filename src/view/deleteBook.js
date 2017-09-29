pl.view.deleteBook = {
    setupUI() {
        let deleteButton = document.forms['Book'].commit;
        let select = document.forms['Book'].selectBook;
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
            select.add(option, null);
        });
        deleteButton.addEventListener("click",
            pl.view.deleteBook.handleDeleteButtonClickEvent);
        window.addEventListener("beforeunload", () => Book.saveAll());
    },
    handleDeleteButtonClickEvent() {
        let select = document.forms['Book'].selectBook;
        let isbn = select.value;
        if (isbn) {
            Book.destroy(isbn);
            select.remove(select.selectedIndex);
        }
    }
};
