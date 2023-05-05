const { selectAllBooks } = require('../db_context');
const bookList = require('../classes/bookList');

async function getAllBooks() {
  const data = await selectAllBooks();

  const books = [];

  data.forEach((book) => {
    books.push(
      new bookList(
        book.book_id,
        book.title,
        book.author,
        book.genre,
        book.year,
        book.book_count
      )
    );
  });

  console.log(books);
  return books;
}

module.exports = {
  getAllBooks
};
