const express = require("express")
const authRoute = require("./auth.route")
const movieRoute = require("./movie.route")
const bookingRoute = require("./booking.route")

const router = express.Router()
const defaultRoutes = [
    {
        path: "/auth",
        route: authRoute
    },
    {
        path: "/movies",
        route: movieRoute
    },
    {
        path: "/bookings",
        route: bookingRoute
    },
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
  
module.exports = router