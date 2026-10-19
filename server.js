const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initializePool } = require('./config/db');
const menuRoutes = require('./routes/menuRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', menuRoutes);

// Root test route
app.get('/', (req, res) => {
    res.json({ message: "Food Delivery and Restaurant Order Management API is running!" });
});

// Start server and initialize database connection pool
async function startServer() {
    await initializePool();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

const restaurantRoutes = require('./routes/restaurantRoutes');
// ...
app.use('/api', restaurantRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api', orderRoutes);

startServer();