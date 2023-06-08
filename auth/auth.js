/*  @dependencies
    bcrypt
    connect-sqlite3
    express
    express-session
    passport
    passport-local
    uuid
*/

const bcrypt = require("bcrypt")
const passport = require("passport")
const database = require("../database/database")
const express = require("express")
const LocalStrategy = require("passport-local")
const router = express.Router()
const session = require("express-session")
const SQLiteStore = require("connect-sqlite3")(session)
const { v4: uuidv4 } = require("uuid")

let dbPath = "../auth/auth.sqlite"
let authDb

async function main(app, db, db_path) {
    return new Promise(async (resolve, reject) => {
        try {
            dbPath = db_path
            app.use(
                session({
                    secret: "zrfvnzr",
                    resave: false,
                    saveUninitialized: false,
                    store: new SQLiteStore({ db: "session.db", dir: "./auth" }),
                })
            );
            authDb = db
            app.use(passport.initialize());
            app.use(passport.session());
            await configureLocalStrategy(authDb);
            app.use(router);
            resolve();
        } catch (error) {
            console.log("Error on auth.js > main");
            console.log(error);
            reject();
        }
    });
}

async function configureLocalStrategy(db) {
    return new Promise(async (resolve, reject) => {
        try {
            // Local Strategy Configuration
            passport.use(
                new LocalStrategy(async function verify(username, password, done) {
                    try {
                        const getUser = "SELECT * FROM users WHERE username = ?";
                        const db = await database.openOrCreateDB(dbPath);
                        const result = await database.get(db, getUser, [username], true);
                        if (!result) {
                            return done(null, false);
                        }
                        if (await bcrypt.compare(password, result.password)) {
                            // Success
                            return done(null, result);
                        } else {
                            console.log("LocalStrategy > verify > password does not match hashedPassword");
                            return done(null, false);
                        }
                    } catch (err) {
                        console.log("Error on LocalStrategy > verify");
                        console.log(err);
                        return done(null, false);
                    }
                })
            );

            passport.serializeUser(function (user, cb) {
                process.nextTick(function () {
                    // console.log('serializingUser > user is', user) // temp
                    cb(null, user);
                });
            });

            passport.deserializeUser(function (user, cb) {
                process.nextTick(function () {
                    // console.log('deserializeUser > user is', user) // temp
                    return cb(null, user);
                });
            });

            // end LocalStrategy Configuration
            resolve();
        } catch (error) {
            console.log("Error on auth.js > configureLocalStrategy"); // temp
            console.log(error); // temp
            reject();
        }
    });
}

// Routes

// get all users
router.post("/api/auth/getAllUsers", async (req, res) => {
    try {
        const rows = await database.all(authDb, `SELECT id, role, username, first_name, last_name FROM users ORDER BY role ASC`, [], false);
        res.json({ rows: rows }).send()
    } catch (error) {
        console.log("Error on /api/getAllUsers"); // temp
        console.log(error); // temp
        res.json({ message: error }).send();
    }
});
// end get all users

// authorize
router.post("/api/auth/authorize", (req, res) => {
    if (req.user) {
        res.json({
            id: req.user.id,
            username: req.user.username,
            role: req.user.role,
            first_name: req.user.first_name,
            last_name: req.user.last_name
        }).send();
    } else {
        res.status(401).json({ message: "User not logged in" }).send();
    }
});
// end authorize

// register
router.post("/api/users/create", async (req, res) => {
    // check if username already exists
    try {
        const row = await database.get(authDb, `SELECT * FROM users WHERE username = ?`, [req.body.username])
        if (row) {
            // username already exists
            res.status(401).json({ message: "User already exists" }).send()
        } else {
            // insert new user
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const row = await database.run(authDb, `INSERT INTO users (id, role, username, password, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?)`, [uuidv4(), req.body.role, req.body.username, hashedPassword, req.body.firstName, req.body.lastName])
            res.json({ message: `Register success for user ${req.body.username}` }).send()
        }
    } catch (error) {
        console.log(error) // temp
        res.status(401).json({message: error}).send()
    }
});
// end register

// delete user
router.post("/api/users/delete", async (req, res) => {
    try {
        await database.run(authDb, `DELETE FROM users WHERE id = ?`, req.body.id)
        res.status(200).json({message: 'User deleted'}).send()
    } catch (error) {
        res.status(401).json({message: error}).send()
    }
})
// end delete user

// edit user
router.post("/api/users/edit", async (req, res) => {
    try {
        const row = await database.get(authDb, `SELECT * FROM users WHERE id = ?`, [req.body.id])
        if (!row) {
            throw 'No user found'
        } else {
            if (req.body.newPassword) {
                await database.run(authDb, `UPDATE users SET role = ?, username = ?, first_name = ?, last_name = ?, password = ? WHERE id = ?`, [
                    req.body.role, req.body.username, req.body.first_name, req.body.last_name, bcrypt.hash(req.body.newPassword, 10), req.body.id
                ])
            } else {
                await database.run(authDb, `UPDATE users SET role = ?, username = ?, first_name = ?, last_name = ? WHERE id = ?`, [
                    req.body.role, req.body.username, req.body.first_name, req.body.last_name, req.body.id
                ])
            }
            res.status(200).json({message: 'User updated'}).send()
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({message: error}).send()
    }
})
// end edit user

// login
router.post("/api/auth/login", (req, res) => {
    passport.authenticate("local", (err, user, info, status) => {
        if (user) {
            req.logIn(user, (err) => {
                if (err) {
                    console.log("Error on req.logIn"); // temp
                    console.log(err);
                    res.status(401).json({ message: "Login error", redirect: "/login?error=1" }).send();
                } else {
                    res.json({ message: "Login success", role: user.role }).send();
                }
            });
        } else {
            res.status(401).json({ message: "Login error", redirect: "/login?error=1" }).send();
        }
    })(req, res);
});
// end login

// logout
router.post("/api/auth/logout", function (req, res) {
    try {
        req.logout(function (err) {
            if (err) {
                res.json({ redirect: "/toLoggedOut" }).send();
            }
            res.json({ redirect: "/toLoggedOut" }).send();
        });
    } catch (error) {
        res.json({ message: error }).send();
    }
});
// end logout

// logout redirect
router.get("/toLoggedOut", (req, res) => {
    res.redirect("/login?loggedOut=1");
});
// end logout redirect

// sql console
router.post("/api/sql", async (req, res) => {
    try {
        const response = await database.run(authDb, req.body.statement)
        res.status(200).json({result: response}).send()
    } catch (error) {
        res.status(401).json({message: error}).send()
    }
})
// end sql console

// end Routes

module.exports = { main, router };
