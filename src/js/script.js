{
  ('use strict');

  const select = {
    templateOf: {
      book: '#template-book',
    },
    wrapper: {
      bookList: '.books-list',
      cover: '.books-list .book__image',
    },
    class: {
      favoriteBook: 'favorite',
    },
  };

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const bookContainer = document.querySelector(select.wrapper.bookList);
  const allBooks = [];

  function render() {
    for (let book of dataSource.books) {
      const generatedHTML = templates.booksList(book);
      /* create element using utils.createElementFromHTML */
      const element = utils.createDOMFromHTML(generatedHTML);
      /* add element to menu */
      bookContainer.appendChild(element);
      allBooks.push(element);
    }
  }

  render();
}