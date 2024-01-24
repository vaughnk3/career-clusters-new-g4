const express = require('express');
const mysqlConnection = require('./dbConfig');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Use the mysqlConnection object to perform database operations
// ...

// Start your Express server

app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
  host: 'deltona.birdnest.org',
  user: 'my.vaughnk3',
  password: '09cc!369y',
  database: 'my_vaughnk3_career_cluster',
  waitforConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// pool.connect();

pool.getConnection((err, connection) => {
  if(err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('MySQL connection established successfully');
    connection.release();
  }
})

app.get('/cluster', (req, res) => {
  console.log('Recieved GET request to /cluster')
  pool.query('SELECT * FROM Cluster', (error, results, fields) => {
    if(error) {
      console.error(error);
      console.log('Sad error fetching information from Cluster table')
      res.status(500).send('Error fetching information from Cluster table in database')
    } else {
      res.json(results);
      console.log('Cluster results: ', results)
    }
  })
})

app.get('/cluster/subcluster/:clusterId', (req, res) => {
  const clusterId = req.params.clusterId;
  console.log(`Received GET request to /cluster/subcluster/${clusterId}`);
  pool.query('SELECT * FROM Subcluster WHERE clusterId = ?', [clusterId], (error, results, fields) => {
    if(error) {
      console.error(error);
      console.log('Sad error fetching information from Subcluster table');
      res.status(500).send('Error fetching information from Subcluster table in database');
    } else {
      res.json(results);
      console.log('Subcluster results: ', results);
    }
  })
})

app.get('/cluster/subcluster/subclusterinfo/:subclusterId', (req, res) => {
  const subclusterId = req.params.subclusterId;
  console.log(`Recieved GET request to /cluster/subcluster/subclusterinfo/${subclusterId}`);
  pool.query('SELECT * FROM Field WHERE subclusterId = ?', [subclusterId], (error, results, fields) => {
    if(error) {
      console.error(error);
      console.log('Sad error fetching information from Fields table');
      res.status(500).send('Error fetching information from Fields table in database');
    } else {
      res.json(results);
      console.log('Field results: ', results);
    }
  })
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});