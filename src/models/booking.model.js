const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const BookingSchema = new mongoose.Schema(
    {
        user: { 
            type: mongoose.SchemaTypes.ObjectId, 
            ref: 'User' 
        },
        show: { 
            type: mongoose.SchemaTypes.ObjectId, 
            ref: 'Show' 
        },
        seats: { 
            type: [String], 
            required: true 
        }
    }
);

  
BookingSchema.plugin(toJSON)
BookingSchema.plugin(paginate)
const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking
