const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

let encryptionString = 10
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
module.exports.createUser = async (userBody, req) => {
    //  check user mobile number exits
    const usernameExits = await User.findOne({ email: userBody.email });
    if (usernameExits) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already exist!");
    }
    let encryptesPass = await bcrypt.hash(userBody.password, encryptionString)
    console.log(encryptesPass, "encrypted password");
    let userData = {
        ...userBody,
        password: encryptesPass
    }
    return User.create(userData);
};

/**
 * Create a user
 * @param {String} email
 * @returns {Promise<User>}
 */
module.exports.getUserByEmail = async (email, req) => {
    const userDoc = await User.findOne({ email: email });
    
    return userDoc;
};