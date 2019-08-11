// Validator 
// https://www.npmjs.com/package/validator
// a middleware library for server-side data validation
const Validator = require("validator");
// isEmpty
// https://beginnersbook.com/2017/10/java-string-isempty-method-with-example/
// checks if string is empty
const isEmpty = require("is-empty");

// validateApplicantInput
// takes in applicant form data 
module.exports = function validateApplicantInput(data) {
    // Instantiate errors object
    let errors = {};
    console.log("we made it 1!")
    // Convert empty fields to an empty string for validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    console.log("we made it 2!")
    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }
    console.log("applied!")
    // Return errors object with any and all errors contained 
    // isValid boolean checks to see if we have any errors
    return {
        errors,
        isValid: isEmpty(errors)
    };
};