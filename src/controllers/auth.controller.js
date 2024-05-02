const httpStatus = require("http-status");
const { userService, tokenService } = require("../services");
const catchAsync = require("../utils/catchAsync")

module.exports.register = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body, req);
    const tokens = await tokenService.generateAuthTokens(user);
    let {password, ...userData} = user._doc
    res
        .status(200)
        .json({ sucess: true, message: "You are registered successfully!", user: userData, tokens });
})


module.exports.login = catchAsync(async (req, res) => {
    const { body } = req;

    let emailExist = await userService.getUserByEmail(body.email); // Get user by email.

    if (!emailExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "Email doesn't exist!"); // If email doesn't exist, throw an error.
    }

    if (!emailExist.password || !(await emailExist.isPasswordMatch(body.password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Password is Incorrect!"); // If password doesn't match the user's password, throw an error.
    }

    let {password, ...userData} = emailExist._doc;
    let tokens = await tokenService.generateAuthTokens(emailExist); // Generate auth token.

    res.status(httpStatus.OK).json({ success: true, message: "You are logged in successfully!", user: userData, tokens });
})

module.exports.getProgileData = catchAsync(async (req, res) => {
    
    res.status(httpStatus.OK).json({ success: true,message: "You are logged in successfully!", data: {user: req.user._doc} });
})