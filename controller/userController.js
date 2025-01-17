const db = require('../db');
const { v4: uuidv4 } = require('uuid');
// Get all users
exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

// Get a single user by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

// Create a new user
// exports.createUser = async(req, res) => {
//  try {
//     const { name, email, phone } = req.body;
//     db.query(
//       'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)',
//       [name, email, phone],
//       (err, results) => {
//         if (err) {
//           res.status(500).json({ error: err.message });
//         } else {
//           res.status(201).json({ id: results.insertId, name, email, phone });
//         }
//       }
//     );
//  } catch (error) {
//     res.status(500).json(error.message)
//  }
// };
exports.createUser = (req, res) => {
    const { name, email, phone } = req.body;
    const id = uuidv4();

    // Promise-based handling
    new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO users (id, name, email, phone) VALUES (?, ?, ?, ?)',
        [id, name, email, phone],
        (err, results) => {
          if (err) reject(err);
          else resolve(results); 
        }
      );
    })
      .then((results) => {
        res.status(201).json({data: {
            id,
            name,
            email,
            phone,
          },});
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  };
  
// Update an existing user
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  db.query(
    'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?',
    [name, email, phone, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({ message: 'User updated successfully' });
      }
    }
  );
};

// Delete a user
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'User deleted successfully' });
    }
  });
};
// add a score to user

exports.createScore = (req, res) => {
  const { assignment, participation, attendance } = req.body;
  const id = uuidv4();
let userId = req.params.id
  // Promise-based handling
  new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO score (id,userId, assignment, participation, attendance) VALUES (?,?, ?, ?, ?)',
      [id, userId, assignment, participation, attendance],
      (err, results) => {
        if (err) reject(err);
        else resolve(results); 
      }
    );
  })
    .then((results) => {
      res.status(201).json({data: {
          id,
          userId,
          assignment,
          participation,
          attendance
        },});
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
}; 

exports.getAllUsersInfo = (req, res) => {
  db.query('SELECT name, email, phone, assignment, attendance, participation FROM users  INNER JOIN score ON users.id = score.userId', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};