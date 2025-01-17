const express = require('express');

const cors = require('cors');
const userRoutes = require('./router/router');


const app = express();
const PORT = 6754;

// Middleware
app.use(cors());
app.use(express.json());
 
// Routes
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
