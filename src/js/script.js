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
    },
    filters: {
      section: '.filters',
    }
  };

  const classNames = {
    book: {
      favorite: 'favorite',
      hidden: 'hidden',
    },
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const app = {
    renderBooks: function () {
      dataSource.books.forEach((book) => {
        this.renderBook(book);
      });

    },
    determineRatingBgc: function (rating) {
      if (rating < 6) {
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }
      if (rating >= 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }
      if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    },
    renderBook: function (bookData) {
      const bookDataWithRating = Object.assign({}, bookData, {
        ratingWidth: bookData.rating * 10,
        ratingBgc: this.determineRatingBgc(bookData.rating),
      });

      const generatedHTML = templates.book(bookDataWithRating);
      const domElement = utils.createDOMFromHTML(generatedHTML);
      const bookContainer = document.querySelector(select.containerOf.book);
      bookContainer.appendChild(domElement);
    },

    favoriteBooks: [],
    filters: [],

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

      const filtersContainer = document.querySelector(select.filters.section);

      filtersContainer.addEventListener('click', (event) => {
        const filter = event.target.value;
        if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.getAttribute('name') === 'filter') {
          if (event.target.checked) {
            this.filters.push(filter);
          } else {
            const index = this.filters.findIndex((item) => item === filter);
            this.filters.splice(index, 1);
          }
        }

        this.filterBooks();
      });
    },

    filterBooks: function () {
      const allBooks = document.querySelectorAll(select.book.image);

      for (let book of allBooks) {
        const dataId = parseInt(book.getAttribute('data-id'));
        const bookDetails = dataSource.books.find((bookData) => bookData.id === dataId);
        const bookCategories = this.getBookCategories(bookDetails);

        if (this.shouldHideBook(bookCategories)) {
          book.classList.add(classNames.book.hidden);
        } else {
          book.classList.remove(classNames.book.hidden);
        }
      }
    },

    getBookCategories: function (book) {
      const categories = [];

      if (book.details.adults) {
        categories.push('adults');
      }
      if (book.details.nonFiction) {
        categories.push('nonFiction');
      }
      return categories;
    },

    shouldHideBook: function (bookCategories) {
      return this.filters.some((filterName) => !bookCategories.includes(filterName));
    },

    init: function () {
      this.renderBooks();
      this.initActions();
    },
  };

  app.init();
}