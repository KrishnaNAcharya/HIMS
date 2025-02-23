import express from 'express';
import cors from 'cors';
import { pool } from './db/db.js';  // Updated import path
import insuranceRoutes from './routes/insuranceRoutes.js';

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://hims-f.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.options('*', cors());

// Routes
app.use('/api', insuranceRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});