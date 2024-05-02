const Joi = require("joi");

module.exports.createBooking = {
    body: Joi.object().keys({
        show: Joi.string().required(),
        seats: Joi.array().items(Joi.string())
    })
}

module.exports.getAllBooking = {
    query: Joi.object().keys({
        limit: Joi.number().integer().default(10),
        page: Joi.number().integer().default(1),
        search: Joi.string().allow(""),
    }),
}

module.exports.getBooking = {
    params: Joi.object().keys({
        bookingId: Joi.string().required()
    }),
}

module.exports.deleteBooking = {
    params: Joi.object().keys({
        bookingId: Joi.string().required()
    }),
}
