import express from 'express';
import cors from 'cors';
import client from './database/db.js';
import { migrateTables } from './database/migrations.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

client.connect();

//create
app.post('/migrations', migrateTables);


app.listen(port, () => {
  console.log(`Server connected at  http://localhost:${port}`);
});