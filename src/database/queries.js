import client from '../database/db.js';

export const createBook = async (req, res) => {
  const { isbn, title, description, author, price, image } = req.body;
  
  try {
    const booksQuery = "INSERT INTO books (isbn, title, description, author, price, image) VALUES ($1, $2, $3, $4, $5, $6)";
    const values = [isbn, title, description, author, price, image];
    
    const response = await client.query(booksQuery, values);

    if (response) {
      return res.status(201).json({ 
        status: 'success', 
        message: 'book created'
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getBooks = async (req, res) => {
  try {
    const booksQuery = 'SELECT * FROM books ORDER BY id ASC';
    
    const response = await client.query(booksQuery);

    if (response) {
      return res.status(200).json({ 
        status: 'success', 
        message: 'books retrieved',
        data: response.rowCount ? response.rows : '0 books found'
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getBook = async (req, res) => {
  const { id } = req.params;
  try {
    /**
    // Method 1:
    const bookQuery = 'SELECT * FROM books WHERE id=$1';
    const bookId = [id];    
    const response = await client.query(bookQuery, bookId);
    */
   
    // Method 2:
    const bookQuery = `SELECT * FROM books WHERE id=${id}`;
    const response = await client.query(bookQuery);

    if (response) {
      return res.status(200).json({ 
        status: 'success', 
        message: response.rowCount ? 'book retrieved' : 'book not found',
        data: response.rows[0]
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateBook = async (req, res) => {  
  const { isbn, title, description, author, price, image } = req.body;

  const { id } = req.params;
  try {
    const bookUpdateQuery = "UPDATE books SET isbn=$1, title=$2, description=$3, author=$4, price=$5, image=$6 WHERE id=$7";    
    
    const bookData = [isbn, title, description, author, price, image, id];

    const response = await client.query(bookUpdateQuery, bookData);

    if (response) {
      return res.status(200).json({ 
        status: 'success', 
        message: response.rowCount ? 'book updated' : 'book not found'
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteBook = async (req, res) => { 
  const { id } = req.params;
  try {
    const booksQuery = `DELETE FROM books WHERE id=${id}`;
    
    const response = await client.query(booksQuery);

    if (response) {
      return res.status(200).json({ 
        status: 'success', 
        message: response.rowCount ? 'book deleted' : 'book not found'
      });
    }
  } catch (err) {
    console.log(err);
  }
};