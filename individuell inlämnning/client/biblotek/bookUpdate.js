const form_create = document.querySelector('#form-create');

async function getAllBooks() {
  const data = await loadAllBooks();

  console.log('data: ', data);

  for (let i = 0; i < data.length; i++) {
    form_create.innerHTML += `
    <label for="author">Author</label>
    <input
      type="text"
      placeholder="author..."
      id="author"
      name="author"
      value="${data[i].author}"
    />

    <label for="title">Title</label>
    <input type="text" placeholder="title..." id="title" name="title" value="${
      data[i].title
    }"/>

    <label for="genre">Genre</label>
    <input type="text" placeholder="genre..." id="genre" name="genre" value="${
      data[i].genre
    }"/>

    <label for="year">Year</label>
    <input type="number" placeholder="year..." id="year" name="year" value="${
      data[i].year
    }"/>

    <input type="button" value="Borrow" onclick="borrowBook(${data[i].id}, ${
      data[i].bookCount
    })">
    <input type="button" value="Return Book" onclick="returnBook(${
      data[i].id
    }, ${data[i].bookCount})">

    <input type="button" value="Update" onclick='updateBook(${JSON.stringify(
      data[i]
    )})'>

    <input type="button" value="Delete" onclick="deleteBook(${data[i].id})">

    <br>
    <br>

    `;
  }
}

async function returnBook(id, bookCount) {
  console.log('id: ', id);
  console.log('bookCount: ', bookCount);

  if (bookCount === 0) {
    alert('Du har inte lånat den!');
  } else {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'Update book return',
        id: id,
        bookCount: bookCount
      })
    };
    const response = await fetch('http://localhost:3000/books/update', options);
    console.log(response);
  }
}

async function borrowBook(id, bookCount) {
  console.log('id: ', id);
  console.log('bookCount: ', bookCount);

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'Update borrow',
      id: id,
      bookCount: bookCount
    })
  };
  const response = await fetch('http://localhost:3000/books/update', options);
  console.log(response);
}

async function updateBook(bookInput) {
  console.log('bookInput: ', bookInput);

  const books = await loadAllBooks();

  const author = document.querySelectorAll('#author');
  const title = document.querySelectorAll('#title');
  const genre = document.querySelectorAll('#genre');
  const year = document.querySelectorAll('#year');
  let isValueEmpty = false;
  for (let i = 0; i < author.length; i++) {
    if (author[i].value === '') {
      isValueEmpty = true;
    }
  }
  for (let i = 0; i < title.length; i++) {
    if (title[i].value === '') {
      isValueEmpty = true;
    }
  }
  for (let i = 0; i < genre.length; i++) {
    if (genre[i].value === '') {
      isValueEmpty = true;
    }
  }
  for (let i = 0; i < year.length; i++) {
    if (year[i].value === '') {
      isValueEmpty = true;
    }
  }
  if (isValueEmpty === true) {
    alert('Allt behöver vara skrivit i textfälten!');
  } else {
    for (let i = 0; i < books.length; i++) {
      if (books[i].id === bookInput.id) {
        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: 'Update book',
            id: bookInput.id,
            title: title[i].value,
            author: author[i].value,
            genre: genre[i].value,
            year: year[i].value
          })
        };
        const response = await fetch(
          'http://localhost:3000/books/update',
          options
        );
        console.log(response);
        break;
      }
    }
  }
}

async function deleteBook(id) {
  console.log('id: ', id);

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id })
  };

  const response = await fetch('http://localhost:3000/books/delete', options);
  console.log(response);

  location.reload();
}

async function loadAllBooks() {
  const options = {
    method: 'GET',
    header: {
      'Accept:': 'application/json'
    }
  };

  const response = await fetch('http://localhost:3000/books', options);
  return await response.json();
}

getAllBooks();

function createValidation() {
  // if (
  // author.value !== '' &&
  // title.value !== '' &&
  // genre.value !== '' &&
  // year.value !== ''
  // ) {
  // console.log('SUBMIT');
  // } else {
  // alert('Alla fälten måste vara ifyllda!');
  // }
}
