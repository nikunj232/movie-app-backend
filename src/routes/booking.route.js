const express = require("express")
const { Controller, bookingController } = require("../controllers")
const validate = require("../middleware/validate")
const { bookValidations, bookingValidations } = require("../validations")
const { auth } = require("../middleware/auth")

const router = express.Router()

router.post(
    "/",
    auth(),
    validate(bookingValidations.createBooking),
    bookingController.createBooking
)

router.get(
    "/:bookingId",
    auth(),
    validate(bookingValidations.getBooking),
    bookingController.getBooking
)

router.get(
    "/",
    auth(),
    validate(bookingValidations.getAllBooking),
    bookingController.getAllBooking
)

router.put(
    "/:bookingId",
    validate(bookingValidations.updateBooking),
    bookingController.updateBooking
)

router.delete(
    "/:bookingId",
    auth(),
    validate(bookingValidations.deleteBooking),
    bookingController.deleteBooking
)


module.exports = router