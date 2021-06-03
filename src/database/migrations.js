import pool from './db.js';

export const migrateTables = async (req, res) => {
  try {      
    const tableQueries = `
      CREATE TABLE IF NOT EXISTS authors ( 
          id SERIAL PRIMARY KEY, 
          name VARCHAR(100), 
          email VARCHAR(100) 
          );
      CREATE TABLE IF NOT EXISTS books ( 
          id SERIAL PRIMARY KEY, 
          isbn VARCHAR(100),
          title VARCHAR(100),  
          description VARCHAR(100), 
          author VARCHAR(100),
          price VARCHAR(100),
          image TEXT
          );
      `;
      
    const response = await pool.query(tableQueries);
    console.log('Tables migrated successfully.' );

    if (response) {
      return res.status(201).json({ 
        status: 'success', 
        // data: response, 
        message: 'Tables migrated successfully.' 
      });
    }
  } catch (err) {
    console.log(err);
  }
};