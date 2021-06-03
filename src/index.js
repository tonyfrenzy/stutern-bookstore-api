import express from 'express';
import cors from 'cors';
import client from './database/db.js';
import { migrateTables } from './database/migrations.js';
import { createBook, getBooks, getBook, updateBook, deleteBook } from './database/queries.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

client.connect();

// create
app.post('/migrations', migrateTables);
app.post('/books', createBook);

// read
app.get('/books', getBooks);
app.get('/books/:id', getBook);

// update
app.patch('/books/:id', updateBook);

// delete
app.delete('/books/:id', deleteBook);


app.listen(port, () => {
  console.log(`Server connected at  http://localhost:${port}`);
});