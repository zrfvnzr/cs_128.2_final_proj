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
    // records table
    await database.createTable(db, 'records', `
        id TEXT UNIQUE PRIMARY KEY,
        date_examined DATE NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        middle_name TEXT NOT NULL,
        sex TEXT NOT NULL,
        birthday DATE NOT NULL,
        age NUMBER NOT NULL,
        email TEXT NOT NULL,
        contact_number TEXT NOT NULL,
        assigned_physician TEXT NOT NULL,
        result TEXT NOT NULL
    `)
    // end records table
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