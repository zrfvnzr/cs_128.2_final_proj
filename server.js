/*  @dependencies
    body-parser
    connect-history-api-fallback
    dotenv
    express
    path
*/

async function main() {
    const express = require('express')
    const app = express()

    require('dotenv').config()

    const bodyParser = require('body-parser')
    app.use(bodyParser.json())

    // Database Module
    const database = require('./database/database')
    const initial = require('./database/initial')
    // end Database Module

    // Auth Module
    const auth = require('./auth/auth')
    const authDb = await database.openOrCreateDB('./auth/auth.sqlite')
    await initial.createInitialTables(authDb)
    await initial.createInitialRows(authDb)
    await auth.main(app, authDb, './auth/auth.sqlite')
    app.use(auth.router)
    // end Auth Module

    // Serving frontend
    const path = require('path');
    app.use(express.static(path.join(__dirname, 'dist')))
    // end Serving frontend

    // Fallback
    app.get('*', (req, res) => {
        res.sendFile(__dirname + '/dist/index.html')
    });

    var history = require('connect-history-api-fallback')
    app.use(history())
    // end Fallback

    app.listen(process.env.PORT, () => {
        console.log('Express app listening on port', process.env.PORT)
    });
}
main();
