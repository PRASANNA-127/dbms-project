const express = require('express');
const router = express.Router();
const { oracledb } = require('../config/db');

// 1. GET all categories
router.get('/categories', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `SELECT Category_ID, Name FROM CATEGORY ORDER BY Category_ID`,
            [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Error closing connection:", err);
            }
        }
    }
});

// 2. GET all food items with their categories
router.get('/food-items', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `SELECT f.Item_ID, f.Name AS Food_Item, f.Price, c.Name AS Category 
             FROM FOOD_ITEM f 
             JOIN CATEGORY c ON f.Category_ID = c.Category_ID 
             ORDER BY f.Item_ID`,
            [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching food items:", err);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Error closing connection:", err);
            }
        }
    }
});

module.exports = router;