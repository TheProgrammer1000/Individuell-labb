const pgp = require('pg-promise')(/* options */);
const db = pgp('postgres://postgres:kalleanka9@localhost:5432/ITHSProjekt');

const { errors } = require('pg-promise');
const bookModel = require('./models/bookModel');
const bookList = require('./classes/bookList');

async function selectAllBooks() {
  let data = await db.many(
    'SELECT book_id, title, author, genre, year, book_count FROM book, book_borrow WHERE book.id = book_borrow.book_id ORDER BY book.title;'
  );
  return data;
}

function insertBook(title, author, genre, year, res) {
  const newBook = new bookModel(title, author, genre, year);

  console.log('newBook: ', newBook);
  try {
    let data = db.none(
      `INSERT INTO book (title, author, genre, year) VALUES ('${newBook.title}', '${newBook.author}', '${newBook.genre}', ${newBook.year})`
    );

    res.status(200).send('CREATED!');
  } catch (err) {
    console.log(err.message);
  }
}

async function updateBook(query) {
  try {
    let data = await db.none(query).catch((err) => {
      console.log(err.message);
      // console.log('HÄR');
    });
    console.log(`SuccessFully Updated.`);
  } catch (error) {
    console.error(error.message);
  }
}

async function deleteBook(id, res) {
  console.log('id: ', id);
  try {
    let data = await db.none(`
    DELETE FROM book_borrow WHERE book_borrow.book_id = ${id};
    DELETE FROM book WHERE book.id = ${id};
    `);
    console.log(`SuccessFully Deleted.`);
    res.status(200).send('Successful Deleted!');
  } catch (error) {
    res.status(404).send('Not Found');
    console.error(error.message);
  }
}

module.exports = {
  selectAllBooks,
  insertBook,
  deleteBook,
  updateBook
};
