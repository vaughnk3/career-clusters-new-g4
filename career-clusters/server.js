const express = require('express');
//const mysqlConnection = require('./dbConfig');
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

//Test Connection
pool.getConnection((err, connection) => {
  if(err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('MySQL connection established successfully');
    connection.release();
  }
})

//************************************************************************/
//GENERAL VIEW SELECT ALL CLUSTERS
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
//************************************************************************/


//************************************************************************/
//SELECT ALL SUBCLUSTERS PERTAINING TO THE CLUSTER ID PASSED IN FOR GENERAL VIEW
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
//************************************************************************/


//************************************************************************/
// GET ALL FIELD INFORMATION PERTAINING TO THE SUBCLUSTER ID PASSED FOR GENERAL VIEW.
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
//************************************************************************/


//************************************************************************/
// GET ALL CLUSTERS FOR THE CLUSTER MANAGEMENT PAGE LIST -- STAFF VIEW/ADMIN VIEW
app.get('/login/staffclusters/clustermanagementpage', (req, res) => {
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
//************************************************************************/


//************************************************************************/
//GET ALL CLUSTERS FOR THE STAFF VIEW PAGE -- STAFF/ADMIN
app.get('/login/staffclusters', (req, res) => {
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
//************************************************************************/


//************************************************************************/
//GRAB SUB CLUSTERS FOR STAFF /ADMIN VIEW
app.get('/login/staffclusters/staffsubclusters/:clusterId', (req, res) => {
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
//************************************************************************/


//************************************************************************/
//GRAB ALL SUBCLUSTER FIEDLDS -- THIS IS FOR STAFF VIEW /ADMIN
app.get('/login/staffclusters/staffsubclusters/staffsubclusterinfo/:subclusterId', (req, res) => {
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
//************************************************************************/

app.post('/login/staffclusters/clustermanagementpage/add-cluster', (req, res) => {
  const { clusterName } = req.body;
  pool.query(
    'INSERT INTO Cluster (clusterName) VALUES (?)',
    [clusterName],
    (error, results, fields) => {
      if(error) {
        console.error('Error adding Cluster:', error);
        res.status(500).send('Error adding Cluster');
      } else {
        console.log('Cluster added successfully');
        res.status(200).send('Cluster added successfully')
      }
    }
  )
})



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});