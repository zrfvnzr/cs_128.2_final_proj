/*  @dependencies
    bcrypt
    connect-sqlite3
    express
    express-session
    passport
    passport-local
    uuid
*/

const bcrypt = require("bcrypt");
const passport = require("passport");
const database = require("../database/database");
const express = require("express");
const LocalStrategy = require("passport-local");
const router = express.Router();
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const { v4: uuidv4 } = require("uuid");

let dbPath = "../auth/auth.sqlite";

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
            app.use(passport.initialize());
            app.use(passport.session());
            await configureLocalStrategy(db);
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
        const db = await database.openOrCreateDB(dbPath);
        const rows = await database.all(db, `SELECT role, username FROM users ORDER BY role ASC`, [], false);
        res.send(rows);
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
router.post("/api/auth/register", async (req, res) => {
    // check if username already exists
    try {
        const db = await database.openOrCreateDB(dbPath);
        const row = await database.get(db, `SELECT * FROM users WHERE username = ?`, [req.body.username]);
        if (row) {
            // username already exists
            res.status(401).json({ message: "User already exists" }).send();
        } else {
            // insert new user
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const row = await database.run(db, `INSERT INTO users (id, role, username, password, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?)`, [uuidv4(), req.body.role, req.body.username, hashedPassword, req.body.first_name, req.body.last_name]);
            res.json({ message: `Register success for user ${req.body.username}` }).send();
        }
    } catch (error) {
        res.status(401).json({ message: error }).send();
    }
});
// end register

// login
router.post("/api/auth/login", (req, res) => {
    passport.authenticate("local", (err, user, info, status) => {
        if (user) {
            req.logIn(user, (err) => {
                if (err) {
                    console.log("Error on req.logIn"); // temp
                    console.log(err);
                    res.status(401).json({ messsage: "Login error", redirect: "/login?error=1" }).send();
                } else {
                    res.json({ messsage: "Login success", role: user.role }).send();
                }
            });
        } else {
            res.status(401).json({ messsage: "Login error", redirect: "/login?error=1" }).send();
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

// end Routes

module.exports = { main, router };
