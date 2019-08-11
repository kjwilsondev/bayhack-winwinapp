const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateApplicantInput = require("../../auth/apply");
const validateLoginInput = require("../../auth/login");

// Load User model
const User = require("../../models/User");

// @route POST api/users/apply
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
                // artist category
                // age
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

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt
        .compare(password, user.password)
        .then(isMatch => {
            if (isMatch) {
                // If user matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Signs token with hashing algorithm
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                .status(400)
                .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

module.exports = router;