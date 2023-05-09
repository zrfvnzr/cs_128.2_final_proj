const { v4: uuidv4 } = require('uuid')
const database = require('./database')
const bcrypt = require('bcrypt')

async function createInitialTables(db) {
  // user table
  await database.createTable(db, 'user', `
    id TEXT UNIQUE PRIMARY KEY,
    role TEXT,
    username TEXT UNIQUE,
    password TEXT
  `,)
  // end user table
}

async function createInitialRows(db) {
  // users
    // admin
    var hashedPassword = await bcrypt.hash('admin', 10)
    await database.run(db, `
      INSERT INTO user (
        id, role, username, password
      ) VALUES (
        ?, ?, ?, ?
      )
    `, [
      uuidv4(), 'admin', 'admin', hashedPassword
    ], true)
    // end admin
  // end users
}

module.exports = {createInitialTables, createInitialRows}