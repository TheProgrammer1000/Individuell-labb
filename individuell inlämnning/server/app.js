const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// TJAAA

const bookRouter = require('./routes/book');

app.use('/books', bookRouter);

app.listen(3000, () => {
  console.log('Listing on port 3000!');
});
