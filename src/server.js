require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const testConnection = require('./routes/v1/testRoutes');

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.json('Hello World');
});

// Use routes

testConnection();
// connect

app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});
