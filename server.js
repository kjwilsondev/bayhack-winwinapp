// Pull in required dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const logger = require('morgan');
const users = require("./controllers/api/users");

// Initialize app using express()
const app = express();
app.use(logger('dev'));
// Bodyparser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Config
// MongoURI pulled from keys.js file
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
.connect(db,{ useNewUrlParser: true })
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));

// Passport Middleware
app.use(passport.initialize());
require("./config/passport")(passport);

app.get('/', (req, res) => {
    return res.json('Welcome to KJs API')
})

// Controllers
app.use("/api/users", users);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`UC the vibes ~ port ${port}`));