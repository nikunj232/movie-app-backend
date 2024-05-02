const Joi = require("joi");

module.exports.createMovie = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        genre: Joi.string().required(),
        showtimes: Joi.array().items(Joi.string())
    })
}

module.exports.getAllMovie = {
    query: Joi.object().keys({
        limit: Joi.number().integer().default(10),
        page: Joi.number().integer().default(1),
        search: Joi.string().allow(""),
    }),
}

module.exports.getMovie = {
    params: Joi.object().keys({
        movieId: Joi.string().required()
    }),
}

module.exports.getMovieShow = {
    params: Joi.object().keys({
        movieId: Joi.string().required()
    }),
    body: Joi.object().keys({
        date:Joi.string().required(),
        showtime:Joi.string().required()
    })
}

module.exports.updateMovie = {
    params: Joi.object().keys({
        movieId: Joi.string().required()
    }),
    body: Joi.object().keys({
        title: Joi.string().required(),
        genre: Joi.string().required(),
        showtimes: Joi.array().items(Joi.string())
    })
}

module.exports.deleteMovie = {
    params: Joi.object().keys({
        movieId: Joi.string().required()
    }),
}
