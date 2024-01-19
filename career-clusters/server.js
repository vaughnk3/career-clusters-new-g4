const express = require('express');
const mysqlConnection = require('./dbConfig');

const app = express();

// Use the mysqlConnection object to perform database operations
// ...

// Start your Express server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});