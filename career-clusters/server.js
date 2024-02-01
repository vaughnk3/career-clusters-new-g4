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
// Get list of schools for demographic page
app.get('/school', (req, res) => {
  console.log('Recieved GET request to /school')
  pool.query('SELECT * FROM School ORDER BY schoolName', (error, results, fields) => {
    if(error) {
      console.error(error);
      console.log('Sad error fetching information from School table')
      res.status(500).send('Error fetching information from School table in database')
    } else {
      res.json(results);
      console.log('School results: ', results)
    }
  })
})
//************************************************************************/


//************************************************************************/
//GENERAL VIEW SELECT ALL CLUSTERS
app.get('/cluster', (req, res) => {
  console.log('Recieved GET request to /cluster')
  pool.query('SELECT * FROM Cluster ORDER BY clusterName', (error, results, fields) => {
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
  pool.query('SELECT * FROM Cluster ORDER BY clusterName', (error, results, fields) => {
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
  pool.query('SELECT * FROM Cluster ORDER BY clusterName', (error, results, fields) => {
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

//************************************************************************/
//ADD CLUSTER
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
//************************************************************************/


//************************************************************************/
// EDIT CLUSTER NAME
app.post('/login/staffclusters/clustermanagementpage/edit-cluster-name', (req, res) => {
  const { clusterName, ID } = req.body;
  pool.query(
    'UPDATE Cluster SET clusterName = ? WHERE id = ?',
    [clusterName, ID],
    (error, results, fields) => {
      if(error) {
        console.error('Error updating Cluster:', error);
        res.status(500).send('Error updatingCluster');
      } else {
        console.log('Cluster name updated successfully   ', ID, clusterName);
        res.status(200).send('Cluster name updated successfully')
      }
    }
  )
})
//************************************************************************/


//************************************************************************/
//DELETE CLUSTER
app.post('/login/staffclusters/clustermanagementpage/delete-cluster', (req, res) => {
  const { ID } = req.body;
  pool.query(
    'DELETE FROM Cluster WHERE id = ?',
    [ID],
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
//************************************************************************/


//************************************************************************/
// Gets all the subclusters to be displayed on subcluster managment page
app.get('/login/staffclusters/staffsubclusters/subclustermanagementpage', (req, res) => {
  console.log('Recieved GET request to /cluster')
  pool.query('SELECT * FROM Subcluster', (error, results, fields) => {
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
// Update request to update a subcluster name based on ID
app.post('/login/staffclusters/staffsubclusters/subclustermanagementpage/edit-subcluster-name', (req, res) => {
  const { subclusterName, ID } = req.body;
  pool.query(
    'UPDATE Subcluster SET subclusterName = ? WHERE id = ?',
    [subclusterName, ID],
    (error, results, fields) => {
      if(error) {
        console.error('Error updating Cluster:', error);
        res.status(500).send('Error updatingCluster');
      } else {
        console.log('Cluster name updated successfully   ', ID, subclusterName);
        res.status(200).send('Cluster name updated successfully')
      }
    }
  )
})
//************************************************************************/


//************************************************************************/
//Update request for updating a subcluster's description
app.post('/login/staffclusters/staffsubclusters/subclustermanagementpage/edit-subcluster-descrip', (req, res) => {
  const { subclusterDescrip, ID } = req.body;
  pool.query(
    'UPDATE Field SET description = ? WHERE subclusterId = ?',
    [subclusterDescrip, ID],
    (error, results, fields) => {
      if(error) {
        console.error('Error updating Cluster:', error);
        res.status(500).send('Error updatingCluster');
      } else {
        console.log('Cluster name updated successfully   ', ID, subclusterDescrip);
        res.status(200).send('Cluster name updated successfully')
      }
    }
  )
})
//************************************************************************/


//************************************************************************/
// Update request for updating the education level of a subcluster
app.post('/login/staffclusters/staffsubclusters/subclustermanagementpage/edit-subcluster-education', (req, res) => {
  const { subclusterEducation, ID } = req.body;
  pool.query(
    'UPDATE Field SET educationLvl = ? WHERE subclusterId = ?',
    [subclusterEducation, ID],
    (error, results, fields) => {
      if(error) {
        console.error('Error updating Cluster:', error);
        res.status(500).send('Error updatingCluster');
      } else {
        console.log('Cluster name updated successfully   ', ID, subclusterEducation);
        res.status(200).send('Cluster name updated successfully')
      }
    }
  )
})
//************************************************************************/


//************************************************************************/
// Update request for updating the salary of a subcluster
app.post('/login/staffclusters/staffsubclusters/subclustermanagementpage/edit-subcluster-salary', (req, res) => {
  const { subclusterSalary, ID } = req.body;
  pool.query(
    'UPDATE Field SET avgSalary = ? WHERE subclusterId = ?',
    [subclusterSalary, ID],
    (error, results, fields) => {
      if(error) {
        console.error('Error updating Cluster:', error);
        res.status(500).send('Error updatingCluster');
      } else {
        console.log('Cluster name updated successfully   ', ID, subclusterSalary);
        res.status(200).send('Cluster name updated successfully')
      }
    }
  )
})
//************************************************************************/


//************************************************************************/
//DELETE SUBCLUSTER
app.post('/login/staffclusters/staffsubclusters/subclustermanagementpage/delete-subcluster', (req, res) => {
  const { ID } = req.body;
  pool.query(
    'DELETE FROM Subcluster WHERE id = ?',
    [ID],
    (error, results, fields) => {
      if(error) {
        console.error('Error deleting subcluster:', error);
        res.status(500).send('Error deleting subCluster');
      } else {
        console.log('Cluster deleted successfully');
        res.status(200).send('Cluster deleted successfully')
      }
    }
  )
})
//************************************************************************/


//************************************************************************/
// Update request for updating the growth rate of a subcluster
app.post('/login/staffclusters/staffsubclusters/subclustermanagementpage/edit-subcluster-growthrate', (req, res) => {
  const { subclusterGrowthRate, ID } = req.body;
  pool.query(
    'UPDATE Field SET growthRate = ? WHERE subclusterId = ?',
    [subclusterGrowthRate, ID],
    (error, results, fields) => {
      if(error) {
        console.error('Error updating Cluster:', error);
        res.status(500).send('Error updatingCluster');
      } else {
        console.log('Cluster name updated successfully   ', ID, subclusterGrowthRate);
        res.status(200).send('Cluster name updated successfully')
      }
    }
  )
})
//************************************************************************/


//************************************************************************/
//GENERAL VIEW SELECT ALL CLUSTERS
app.get('/login/staffclusters/staffsubclusters/subclustermanagementpage/fetch-clusters', (req, res) => {
  console.log('Recieved GET request to /cluster')
  pool.query('SELECT * FROM Cluster ORDER BY clusterName', (error, results, fields) => {
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


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});