// Jwt Strategy
// A Passport strategy for authenticating with a JSON Web Token. 
// This module lets you authenticate endpoints using a JSON web token.
const JwtStrategy = require("passport-jwt").Strategy;
// Extract Jwt
const ExtractJwt = require("passport-jwt").ExtractJwt;
// Mongoose Modeling
const mongoose = require("mongoose");
const User = mongoose.model("users");
// Secret
const keys = require("../config/keys");

// Authentication Info for Passport
const opts = {};
// creates a new extractor that looks for the JWT
// in the authorization header with the scheme 'bearer'
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                // if user not found
                return done(null, false);
            })
            .catch(err => console.log(err));
        })
    );
};