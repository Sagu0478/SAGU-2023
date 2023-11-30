const { query } = require("../../server/db.js");

const Accounts = {
    createTable: async () => {
      const createTableSql = `
        CREATE TABLE IF NOT EXISTS accounts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          first_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          mobile VARCHAR(50),
          password VARCHAR(255) NOT NULL,
          address TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `;
      try {
        await query(createTableSql);
        console.log('Accounts table created or already exists.');
      } catch (error) {
        console.error('Could not create accounts table:', error);
        throw error;
      }
    },
  
    findAll: async () => {
      const findAllSql = 'SELECT * FROM accounts;';
      try {
        const results = await query(findAllSql);
        return results;
      } catch (error) {
        console.error('Could not retrieve accounts:', error);
        throw error;
      }
    },
  
    // ... other CRUD operations for accounts ...
  
  };
  
  module.exports = Accounts;