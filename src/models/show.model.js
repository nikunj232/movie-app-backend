const mongoose = require("mongoose");
const toJSON = require("./plugins/toJSON.plugin");

const ShowSchema = new mongoose.Schema(
    {
        movie: { 
            type: mongoose.SchemaTypes.ObjectId, 
            ref: 'Movie' 
        },
        date: { 
            type: String, 
            required: true 
        }, // Stores the date of the show
        time: { 
            type: String, 
            required: true 
        }, // Stores the time in HH:MM format (e.g., "14:00", "19:30")
        total_seats: { 
            type: Number, 
            required: true,
            default: 128 
        },
        available_seats: { 
            type: Number, 
            required: true,
            default: 128 
        },
        // bookedSeats: { type: new Array(Number) } // Array of booked seat numbers
    },
    { 
        timestamps: true, 
        versionKey: false 
    }
);

ShowSchema.plugin(toJSON)
const Show = mongoose.model('Show', ShowSchema)

module.exports = Show