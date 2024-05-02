const mongoose = require("mongoose");
const toJSON = require("./plugins/toJSON.plugin");
const { paginate } = require("./plugins");

const MovieSchema = mongoose.Schema(
    {
        title: { 
            type: String, 
            required: true 
        },
        genre: { 
            type: String 
        },
        showtimes: [
            { 
                type: String
            }
        ]
    }
);

MovieSchema.plugin(toJSON)
MovieSchema.plugin(paginate)
const Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie