const express = require("express")
const { Controller, movieController } = require("../controllers")
const validate = require("../middleware/validate")
const { bookValidations, movieValidations } = require("../validations")

const router = express.Router()

router.post(
    "/",
    validate(movieValidations.createMovie),
    movieController.createMovie
)

router.get(
    "/:movieId",
    validate(movieValidations.getMovie),
    movieController.getMovie
)

router.put(
    "/:movieId/show",
    validate(movieValidations.getMovie),
    movieController.getMovieShowAvailability
)

router.get(
    "/",
    validate(movieValidations.getAllMovie),
    movieController.getAllMovie
)

router.put(
    "/:movieId",
    validate(movieValidations.updateMovie),
    movieController.updateMovie
)

router.delete(
    "/:movieId",
    validate(movieValidations.deleteMovie),
    movieController.deleteMovie
)


module.exports = router