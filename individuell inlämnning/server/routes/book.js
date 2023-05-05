const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookController');
const db = require('../db_context');

const bookList = require('../classes/bookList');

function checkUpdateQuery(req, res, next) {
  if (req.body.type === 'Update book') {
    req.type = 'Update book';
    next();
    return;
  } else if (req.body.type === 'Update borrow') {
    req.type = 'Update borrow';
    next();
    return;
  } else if (req.body.type === 'Update book return') {
    req.type = 'Update book return';
    next();
    return;
  }
}

router.get('/', async (req, res) => {
  controller.get(req, res);
});

router.post('/create', async (req, res) => {
  console.log(req.body);
  db.insertBook(
    req.body.title,
    req.body.author,
    req.body.genre,
    req.body.year,
    res
  );
});

router.delete('/delete', async (req, res) => {
  db.deleteBook(req.body.id, res);
});

router.put('/update', checkUpdateQuery, async (req, res) => {
  if (req.type === 'Update book') {
    const newBook = new bookList(
      req.body.id,
      req.body.title,
      req.body.author,
      req.body.genre,
      req.body.year
    );
    const query = `UPDATE book SET title = '${newBook.title}', author = '${newBook.author}', genre = '${newBook.genre}', year = ${newBook.year} WHERE book.id = ${newBook.id}`;
    db.updateBook(query);
  } else if (req.type === 'Update borrow') {
    console.log('Tjabba!');
    const book = {
      id: req.body.id,
      bookCount: req.body.bookCount
    };

    const query = `UPDATE book_borrow SET book_count = ${Number(
      book.bookCount + 1
    )} WHERE book_id = ${book.id}`;

    db.updateBook(query);
  } else if (req.type === 'Update book return') {
    console.log('TJABAA');
    const book = {
      id: req.body.id,
      bookCount: req.body.bookCount
    };

    const query = `UPDATE book_borrow SET book_count = ${Number(
      book.bookCount - 1
    )} WHERE book_id = ${book.id}`;

    db.updateBook(query);
  }
});

module.exports = router;
