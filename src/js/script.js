{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      book: '.books-list'
    },
    book: {
      image: '.book__image'
    }
  };

  const classNames = {
    book: {
      favorite: 'favorite',
    },
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const app = {
    renderBooks: function () {
      dataSource.books.forEach(this.renderBook);
    },
    renderBook: function (bookData) {
      const generatedHTML = templates.book(bookData);
      const domElement = utils.createDOMFromHTML(generatedHTML);
      const bookContainer = document.querySelector(select.containerOf.book);
      bookContainer.appendChild(domElement);
    },

    favoriteBooks: [],

    initActions: function () {
      const bookContainer = document.querySelector(select.containerOf.book);

      bookContainer.addEventListener('dblclick', (event) => {
        event.preventDefault();

        if (!event.target.offsetParent.classList.contains('book__image')) {
          return;
        }

        const currentBookLink = event.target.offsetParent;
        const dataId = currentBookLink.getAttribute('data-id');

        if (this.favoriteBooks.includes(dataId)) {
          const index = this.favoriteBooks.findIndex((bookId) => bookId === dataId);
          this.favoriteBooks.splice(index, 1);
        } else {
          this.favoriteBooks.push(dataId);
        }

        currentBookLink.classList.toggle(classNames.book.favorite);
      });
    },

    init: function () {
      this.renderBooks();
      this.initActions();
    },
  };

  app.init();
}