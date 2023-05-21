const { v4: uuidv4 } = require('uuid')
const database = require('./database')
const bcrypt = require('bcrypt')

async function createInitialTables(db) {
    // users table
    await database.createTable(db, 'users', `
        id TEXT UNIQUE PRIMARY KEY,
        role TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL
    `,)
    // end users table
}

async function createInitialRows(db) {
    // users
        // admin
        var hashedPassword = await bcrypt.hash('admin1', 10)
        await database.run(db, `
            INSERT INTO users (
                id, role, username, password, first_name, last_name
            ) VALUES (
                ?, ?, ?, ?, ?, ?
            )
        `, [
            uuidv4(), 'admin', 'admin1', hashedPassword, 'admin', 'one'
        ], true)
        // end admin
    // end users
}

module.exports = {createInitialTables, createInitialRows}