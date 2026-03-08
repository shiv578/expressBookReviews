const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
  // Returns true if the username is not already taken
  let userswithsamename = users.filter((user) => user.username === username);
  return userswithsamename.length === 0;
}

const authenticatedUser = (username, password)=>{
  // Returns true if username and password match our records
  let validusers = users.filter((user) => (user.username === username && user.password === password));
  return validusers.length > 0;
}

// Task 8: Login a registered user
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
      return res.status(400).json({message: "Missing username or password"});
  }

  if (authenticatedUser(username, password)) {
    // Generate JWT Access Token
    let accessToken = jwt.sign({ data: password }, 'access', { expiresIn: 60 * 60 });

    // Store token in session
    req.session.authorization = { accessToken, username };
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});
// In auth_users.js, ensure your review routes look like this:

// Add or modify a book review
regd_users.put("/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.session.authorization['username'];
  
  if (books[isbn]) {
      books[isbn].reviews[username] = review;
      return res.status(200).json({message: "Review successfully added/updated"});
  }
  return res.status(404).json({message: "Book not found"});
});

// Delete a book review
regd_users.delete("/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization['username'];
  
  if (books[isbn] && books[isbn].reviews[username]) {
      delete books[isbn].reviews[username];
      return res.status(200).json({message: "Review for ISBN 1 deleted"});
  }
  return res.status(404).json({message: "Review not found"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;