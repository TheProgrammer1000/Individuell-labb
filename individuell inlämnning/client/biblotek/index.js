const bookListUL = document.querySelector('#bookList');
const bookTitelInput = document.querySelector('#book-titel-input');

let searchFilter = `default-author`;

console.log(window.location.href);

addEventListener('input', (event) => {
  if (searchFilter === 'default-author') {
    authorSearch(event.target.value);
    console.log('default-author');
  } else if (searchFilter === 'default-title') {
    console.log('Tjabba');
    titleSerach(event.target.value);
  }
});

function changeFilterSearch(filterSeachValue) {
  searchFilter = filterSeachValue;
  console.log('searchFilter: ', searchFilter);
}

async function titleSerach(inputValue) {
  bookListUL.innerHTML = ``;
  const books = await loadAllBooks();

  printBooks(
    books.filter((book) => {
      return book.title.toLowerCase().trim().includes(inputValue.toLowerCase());
    })
  );
}

async function authorSearch(inputValue) {
  bookListUL.innerHTML = ``;
  const books = await loadAllBooks();
  printBooks(
    books.filter((book) => {
      return book.author
        .toLowerCase()
        .trim()
        .includes(inputValue.toLowerCase());
    })
  );
}

async function loadAllBooks() {
  const options = {
    method: 'GET',
    header: {
      'Accept:': 'application/json'
    }
  };

  const response = await fetch('http://localhost:3000/books', options);

  console.log('response: ');

  return await response.json();
}

async function printBooks(booksInput) {
  const booksFinal = await loadAllBooks();
  console.log('booksFinal: ', booksFinal);

  if (typeof booksInput !== 'undefined') {
    for (const book of booksInput) {
      let li = document.createElement('li');
      li.innerText = `Author:  ${book.author}
      Title: ${book.title}
      Year: ${book.year}
      Genre: ${book.genre}
      Books avaible: ${5 - book.bookCount}
      Borrowed books: ${book.bookCount}

      `;

      bookListUL.appendChild(li);
    }
  } else {
    console.log('Den är undefined');
    const books = await loadAllBooks();
    console.log('books: ', books);

    for (const book of books) {
      let li = document.createElement('li');
      li.innerText = `Author:  ${book.author}
      Title: ${book.title}
      Year: ${book.year}
      Genre: ${book.genre}
      Books avaible: ${5 - book.bookCount}
      Borrowed books: ${book.bookCount}


      `;

      bookListUL.appendChild(li);
    }
  }
}
printBooks();
