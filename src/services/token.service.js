const moment = require("moment");
const { Token } = require("../models");
const jwt = require("jsonwebtoken");
const { config } = require("../config");
const { TOKEN_TYPES } = require("../helpers/constant.helper");


module.exports.generateToken = (userId, expires, type, secret = config.jwt.secret) => {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, secret);
};
  
module.exports.saveToken = async (token, userId, expires, type, blacklisted = false) => {
    const tokenDoc = await Token.create({
      token,
      user: userId,
      expires: expires.toDate(),
      type,
      blacklisted,
    });
    return tokenDoc;
};

module.exports.generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(
      config.jwt.accessExpirationMinutes,
      "year"
    );
    const accessToken = this.generateToken(
      user.id,
      accessTokenExpires,
      TOKEN_TYPES.access
    );
  
    const refreshTokenExpires = moment().add(
      config.jwt.refreshExpirationDays,
      "year"
    );
    const refreshToken = this.generateToken(
      user.id,
      refreshTokenExpires,
      TOKEN_TYPES.refresh
    );
    const tokenExist = await Token.find({ user:user.id, type: TOKEN_TYPES.refresh})
    if(tokenExist.length) {
        const deleteExistingToken = await Token.deleteMany({ user:user.id, type: TOKEN_TYPES.refresh})
    }

    await this.saveToken(
      refreshToken,
      user.id,
      refreshTokenExpires,
      TOKEN_TYPES.refresh
    );
  
    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
};  