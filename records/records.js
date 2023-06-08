/*  @dependencies
    express
*/

const database = require("../database/database")
const express = require("express")
const router = express.Router()
const { v4: uuidv4 } = require("uuid")

let dbPath = "../auth/auth.sqlite"
let authDb

async function main(app, db, db_path) {
    return new Promise(async (resolve, reject) => {
        try {
            dbPath = db_path
            authDb = db
            app.use(router);
            resolve();
        } catch (error) {
            console.log("Error on records.js > main");
            console.log(error);
            reject();
        }
    });
}

// Routes

// get all records
router.post("/api/records/getAllRecords", async (req, res) => {
    try {
        const rows = await database.all(authDb, `SELECT * FROM records ORDER BY id ASC`, [], false);
        res.json({rows: rows}).send();
    } catch (error) {
        console.log("Error on /api/records/getAllRecords");
        console.log(error);
        res.status(401).json({ message: error }).send();
    }
});
// end get all records

// create
router.post("/api/records/create", async (req, res) => {
    try {
        const row = await database.run(authDb, `INSERT INTO records (
            id, date_examined, first_name, middle_name, last_name, sex, birthday, age, email, contact_number, assigned_physician, result
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            uuidv4(),
            req.body.dateExamined,
            req.body.firstName,
            req.body.middleName,
            req.body.lastName,
            req.body.sex,
            req.body.birthday,
            req.body.age,
            req.body.email,
            req.body.contact_number,
            req.body.assignedPhysician,
            req.body.result
        ])
        res.json({ message: `Record created for user ${req.body.firstName + req.body.middleName, + req.body.lastName}` }).send()
    } catch (error) {
        res.status(401).json({message: error}).send()
    }
});
// end create

// end Routes

module.exports = { main, router };
