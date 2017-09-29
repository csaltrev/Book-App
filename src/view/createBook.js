pl.view.createBook = {
    setupUI() {
        let saveButton = document.forms['Book'].commit;

        Book.loadAll();

        saveButton.addEventListener("click", pl.view.createBook.handleSaveButtonClickEvent);
        window.addEventListener("beforeunload", () => Book.saveAll());
    },
    handleSaveButtonClickEvent() {
        let form = document.forms['Book'];
        let slots = {
            isbn: form.isbn.value,
            title: form.title.value,
            year: form.year.value
        };
        Book.add(slots);
        form.reset();
    }
};
