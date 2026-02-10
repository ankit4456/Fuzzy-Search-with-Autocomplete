const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/search', require('./routes/search'));

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Fuzzy Search API is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Fuzzy Search API',
    endpoints: {
      search: 'GET /api/search?q=keyword',
      item: 'GET /api/search/item/:id',
      health: 'GET /api/health'
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
