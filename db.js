const oracledb = require('oracledb');
require('dotenv').config();

// Enable automatic commits for DML operations
oracledb.autoCommit = true;

async function initializePool() {
    try {
        await oracledb.createPool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectionString: process.env.DB_CONNECTION_STRING
        });
        console.log("Database connection pool established successfully!");
    } catch (err) {
        console.error("Database connection failed: ", err);
        process.exit(1);
    }
}

async function closePool() {
    try {
        await oracledb.getPool().close(10);
        console.log("Database pool closed.");
    } catch (err) {
        console.error("Error closing database pool: ", err);
    }
}

module.exports = {
    initializePool,
    closePool,
    oracledb
};