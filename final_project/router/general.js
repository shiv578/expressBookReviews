const axios = require('axios');

// Task 10: Get all books using Promises
public_users.get('/', function (req, res) {
  const getBooks = new Promise((resolve, reject) => {
    resolve(books);
  });
  getBooks.then((books) => res.status(200).send(JSON.stringify(books, null, 4)));
});

// Task 11: Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  new Promise((resolve, reject) => {
    if (books[isbn]) resolve(books[isbn]);
    else reject({message: "Not found"});
  })
  .then(book => res.status(200).json(book))
  .catch(err => res.status(404).json(err));
});

// Task 12: Get book details based on Auth
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  const bookList = Object.values(books).filter(b => b.author === author);
  res.status(200).json(bookList);
});

// Task 13: Get book details based on Title using Async/Await
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  const bookList = Object.values(books).filter(b => b.title === title);
  res.status(200).json(bookList);
});