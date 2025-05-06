import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/lib/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});