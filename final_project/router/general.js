const axios = require('axios');

const axios = require('axios');

// Task 10: Get all books using Promises and Axios
public_users.get('/', function (req, res) {
  axios.get("http://localhost:5000/") 
    .then(() => res.status(200).send(JSON.stringify(books, null, 4)))
    .catch(err => res.status(500).json({message: "Error fetching books"}));
});

// Task 11: Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  axios.get(`http://localhost:5000/isbn/${isbn}`)
    .then(() => res.status(200).json(books[isbn]))
    .catch(() => res.status(404).json({message: "Not found"}));
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