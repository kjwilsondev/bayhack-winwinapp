const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateApplicantInput = require("../../validation/apply");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// If user is a new user, fill in the fields (name, email, password) with data sent in the body of the request
// Use bcryptjs to hash the password before storing it in your database
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/apply", (req, res) => {
    // Form validation
    const { errors, isValid } = validateApplicantInput(req.body);
    // Check validation
    // MongoDB User.findOne() to see if the user already exists
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Check if user exists
    User.findOne({ email: req.body.email }).then(user => {
        // if a user is found
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            // Fills user response into User mongo model
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // Hashes password before sending to database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    // err is boolean
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                    .save() // save new user
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });
        }
    });
  });
