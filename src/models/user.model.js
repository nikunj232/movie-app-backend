const mongoose = require("mongoose");
const toJSON = require("./plugins/toJSON.plugin");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
    {
        firstname: { 
            type: String, 
            required: true, 
        },
        lastname: { 
            type: String, 
            required: true, 
        },
        email: { 
            type: String, 
            required: true, 
        },
        password: { 
            type: String, 
            required: true 
        },
        // bookings: [
        //     { 
        //         type: mongoose.Schema.Types.ObjectId, 
        //         ref: 'Booking' 
        //     }
        // ]
    }
);
  
/**
 * Check if password matches the user's password.
 * @param {string} password
 * @returns {Promise<boolean>}
 */
UserSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};
UserSchema.plugin(toJSON)
const User = mongoose.model('User', UserSchema);

module.exports = User
