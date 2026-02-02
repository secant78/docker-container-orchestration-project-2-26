const express = require('express');
const { Pool } = require('pg');
const Redis = require('ioredis');

const app = express();
const port = process.env.PORT || 3000;

// 1. PostgreSQL Connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.POSTGRES_USER || 'admin',
  password: process.env.POSTGRES_PASSWORD || 'password123',
  database: process.env.POSTGRES_DB || 'myapp',
});

// 2. Redis Connection
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: 6379,
});

app.use(express.json());

// --- ROUTES ---

// Health Check (Crucial for Docker Compose healthcheck)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Test Database & Redis
app.get('/api/test', async (req, res) => {
  try {
    // Test Postgres
    const dbResult = await pool.query('SELECT NOW()');
    
    // Test Redis (increment a counter)
    const visits = await redis.incr('visitor_count');

    res.json({
      status: "Success",
      message: "Connected to PostgreSQL and Redis!",
      dbTime: dbResult.rows[0].now,
      visitorNumber: visits
    });
  } catch (err) {
    res.status(500).json({ status: "Error", error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});