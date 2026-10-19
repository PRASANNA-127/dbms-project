const express = require('express');
const router = express.Router();
const { oracledb } = require('../config/db');

// 1. GET all restaurant branches (using SELECT * to prevent column mismatch)
router.get('/branches', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `SELECT * FROM BRANCH`,
            [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching branches:", err);
        res.status(500).json({ error: err.message }); // Send exact error to browser for debugging
    } finally {
        if (connection) {
            try { await connection.close(); } catch (err) { console.error(err); }
        }
    }
});

// 2. GET all dining tables (using SELECT * to prevent column mismatch)
router.get('/tables', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `SELECT * FROM DINING_TABLE`,
            [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching dining tables:", err);
        res.status(500).json({ error: err.message });
    } finally {
        if (connection) {
            try { await connection.close(); } catch (err) { console.error(err); }
        }
    }
});

module.exports = router;