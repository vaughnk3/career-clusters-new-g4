const express = require('express');
//const mysqlConnection = require('./dbConfig');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });
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



//IMAGE POST FROM CLUSTER MANAGEMENT
app.post('/imag-cluster-replace', upload.single('image'), (req, res) => {
  const image = req.file.buffer;
  const clusterId = req.body.id;
  pool.query('UPDATE Cluster SET img = ? WHERE id = ?', 
  [image, clusterId], 
  (error, results, fields) => {
    if(error) {
      console.error("Error adding demographic information: ", error);
      res.status(500).send("Error adding demographic information");
    } else {
      console.log("Added demographic information successfully");
      res.status(200).send("Added demographic information successfully");
    }
  }
  )
})


app.get('/n-image/:id', async (req, res) => {
  const { id } = req.params;
  console.log("id: ", id)
  pool.query('SELECT img FROM Cluster WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error("Error fetching image: ", error);
      return res.status(500).send("Error fetching image");
    }
    if (results.length > 0) {
      const image = results[0].img;
      res.writeHead(200, {
        'Content-Type': 'image/png', // Or the correct content type for your image
      });
      res.end(image);
    } else {
      res.status(404).send('Image not found');
    }
  });
});









//************************************************************************/
//Excel sheet get cluster names and click rates. 
app.get('/excel-clusters', (req, res) => {
  console.log('Recieved GET request to /cluster')
  pool.query('SELECT clusterName, clickCount FROM Cluster', (error, results, fields) => {
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
//Excel sheet get cluster names and click rates. 
app.get('/dem-info', (req, res) => {
  console.log('Recieved GET request to /cluster')
  pool.query('SELECT * FROM UserDemographicInfo', (error, results, fields) => {
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
//GENERAL VIEW SELECT ALL CLUSTERS
app.get('/gen-subclusters', (req, res) => {
  console.log('Recieved GET request to /cluster')
  pool.query('SELECT subclusterName, clickCount FROM Subcluster', (error, results, fields) => {
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
// Send collected demographic information to database
app.post('/demographicinfo', (req, res) => {
  const { school, gradeLevel, desiredCareerField, currentAge } = req.body;
  pool.query(
    'INSERT INTO UserDemographicInfo (userID, school, gradeLevel, desiredCareerField, currentAge) VALUES (NULL, ?, ?, ?, ?)',
    [school, gradeLevel, desiredCareerField, currentAge ],
    (error, results, fields) => {
      if(error) {
        console.error("Error adding demographic information: ", error);
        res.status(500).send("Error adding demographic information");
      } else {
        console.log("Added demographic information successfully");
        res.status(200).send("Added demographic information successfully");
      }
    }
  )
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
// Gets all the subclusters to be displayed on subcluster managment page
app.get('/subclustermanagementpage', (req, res) => {
  console.log('JDFSJFDLKFHJSKDFHKJDSHFK')
  pool.query('SELECT * FROM Subcluster', (error, results, fields) => {
    if(error) {
      console.error(error);
      console.log('Sad error fetching information from Cluster table')
      res.status(500).send('Error fetching information from Cluster table in database')
    } else {
      res.json(results);
      console.log('Subcluster :) results: ', results)
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
//*********************************************************************kek***/


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
// Update request to update a subcluster name based on ID
app.post('/subclustermanagementpage/edit-subcluster-name', (req, res) => {
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
app.post('/subclustermanagementpage/edit-subcluster-descrip', (req, res) => {
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
app.post('/subclustermanagementpage/edit-subcluster-education', (req, res) => {
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
app.post('/subclustermanagementpage/edit-subcluster-salary', (req, res) => {
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
app.post('/subclustermanagementpage/delete-subcluster', (req, res) => {
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
app.post('/subclustermanagementpage/edit-subcluster-growthrate', (req, res) => {
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
// Insert request for adding subcluster into subcluster table
app.post('/subclustermanagementpage/add-subcluster', (req, res) => {
  const { newSCName, clusterID} = req.body;
  pool.query(
    'INSERT INTO Subcluster (clusterId, subclusterName) VALUES (?, ?)',
    [clusterID, newSCName],
    (error, results, fields) => {
      if(error) {
        console.error('Error inserting subcluster: ', error);
        res.status(500).send('Error inserting subcluster :(');
      } else {
        const subclusterID = results.insertId;
        console.log("SUBCLUSTER ID (SERVER>JS)   ",subclusterID );
        console.log('Inserted into subcuster successfully ', newSCName);
        res.status(200).json({subclusterID});
      }
    }
  )
})

app.post('/subclustermanagementpage/add-subcluster-field', (req, res) => {
  const { subclusterID, newSCName, newSCDescrip, newSCsalary, newSCEdLevel, newSCGrowthRate} = req.body;
  pool.query(
    'INSERT INTO Field (subclusterID, fieldName, description, avgSalary, educationLvl, growthRate) VALUES (?, ?, ?, ?, ?, ?)',
    [subclusterID, newSCName, newSCDescrip, newSCsalary, newSCEdLevel, newSCGrowthRate],
    (error, results, fields) => {
      if(error) {
        console.error("Error inserting field: ", error);
        res.status(500).send('Error inserting field :(');
      } else {
        console.log('Inserted into field successfully :)', newSCName);
        res.status(200).send('Field inserted successfully!!');
      }
    }
  )
})

//************************************************************************/
//GENERAL VIEW SELECT ALL CLUSTERS
app.get('/subclustermanagementpage/fetch-clusters', (req, res) => {
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});