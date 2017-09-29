 pl.view.listBooks = {
     setupUI() {
         let tableBody = document.querySelector("table#books>tbody");
         let keys = [],
             row = {};

         Book.loadAll();
         keys = Object.keys(Book.instances);

         keys.forEach(key => {
             row = tableBody.insertRow(-1);
             row.insertCell(-1).textContent = Book.instances[key].isbn;
             row.insertCell(-1).textContent = Book.instances[key].title;
             row.insertCell(-1).textContent = Book.instances[key].year;
         });
     }
 };
