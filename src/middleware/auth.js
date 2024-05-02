const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
// const Role = require('../models/role.model');
// const { Permission } = require('../models');
// const { validateAccessPermission } = require('../services/auth.service');

// const { generateMessage } = require('../helper/function.helper');
const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
    if (err || info || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!"));
    }
    const {password, ...userDetails} = user
    req.user = userDetails;

    resolve();
};

/**
 * Auth middleware.
 * @param  {Array} requiredRights
 * @returns
 */
exports.auth =
    (...requiredRights) =>
    async (req, res, next) => {
        return new Promise((resolve, reject) => {
            passport.authenticate(
                'jwt',
                { session: false },
                verifyCallback(req, resolve, reject, requiredRights)
            )(req, res, next);
        })
            .then(() => next())
            .catch((err) => next(err));
    };

/**
 * If token then decode else give access to get
 * @returns
 */
exports.authorizeV3 = () => async (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        return new Promise(() => {
            passport.authenticate('jwt', { session: false })(req, res, next);
        })
            .then(() => next())
            .catch((err) => next(err));
    }

    next();
};
