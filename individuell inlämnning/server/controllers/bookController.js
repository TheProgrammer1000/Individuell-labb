const { getAllBooks } = require('../responsitories/bookResponsitory');

async function get(req, res) {
  const data = await getAllBooks();

  res.json(data);
}

module.exports = {
  get
};
