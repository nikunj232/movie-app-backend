const express = require("express")
const { Controller, authController } = require("../controllers")
const validate = require("../middleware/validate")
const { bookValidations } = require("../validations")
const { auth } = require("../middleware/auth")

const router = express.Router()

router.post(
    "/register",
    // validate(bookValidations.createBook),
    authController.register
)

router.post(
    "/login",
    // validate(bookValidations.createBook),
    authController.login
)

router.get(
    "/profile",
    auth(),
    authController.getProgileData
)

module.exports = router