const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models');
const config = require('./config');
const { TOKEN_TYPES } = require('../helpers/constant.helper');
const httpStatus = require('http-status');

const jwtOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
    try {
        // if (payload.exp < moment().unix()) {
        //     throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
        // }
        if (payload.type !== TOKEN_TYPES.access) {
            throw new Error('Invalid token type');
        }
        const user = await User.findOne({ _id: payload.sub, deleted_at: null });

        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
    jwtStrategy,
};
