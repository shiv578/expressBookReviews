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

// Task 9: Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let filtered_book = books[isbn];
  
  if (filtered_book) {
      let review = req.query.review;
      let reviewer = req.session.authorization['username'];
      
      if (review) {
          filtered_book['reviews'][reviewer] = review;
          books[isbn] = filtered_book;
      }
      return res.status(200).send(`The review for the book with ISBN ${isbn} has been added/updated.`);
  } else {
      return res.status(404).json({message: "ISBN not found"});
  }
});

// Task 10: Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let reviewer = req.session.authorization['username'];
  let filtered_book = books[isbn];

  if (filtered_book) {
      delete filtered_book['reviews'][reviewer];
      return res.status(200).send(`Reviews for ISBN ${isbn} posted by ${reviewer} deleted.`);
  } else {
      return res.status(404).json({message: "ISBN not found"});
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;