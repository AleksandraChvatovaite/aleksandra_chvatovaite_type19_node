require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const usersRouter = require('./routes/v1/usersRoutes');
const shopItemRouter = require('./routes/v1/shopItemsRoutes');

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
app.use('/v1/api', usersRouter);
app.use('v1/api/', shopItemRouter);

// connect

app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});
