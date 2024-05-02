const { mongo } = require("mongoose");
const { str2regex } = require("../helpers/function.helper");
const { bookingService, showService } = require("../services");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const { default: mongoose } = require("mongoose");

module.exports.createBooking = catchAsync(async (req, res) => {
    let showDetails
    showDetails = await showService.findShow({_id: req.body.show})

    let bookingData = {
        show: showDetails._id,
        user: req.user._id,
        seats: req.body.seats
    }
    const createdBooking = await bookingService.createBooking(bookingData, req)
    console.log({id: showDetails.id}, {available_seats: showDetails.available_seats - req.body.seats.length}, "===============================================available seats");
    const updatedShowDetails = await showService.updateShow(({_id: showDetails.id}), {available_seats: showDetails.available_seats - req.body.seats.length})
    seatNumberString = req.body.seats.join(", ")
    res
        .status(201)
        .json({success:true, data:createdBooking, message:`Your seat Number ${seatNumberString} Booked successfully!`})
})

module.exports.getAllBooking = catchAsync(async (req, res) => {
    const { search } = pick(req.query, ["search"]);
    const options = pick(req.query, ["limit", "page"]);
    const searchRegx = str2regex(search??'')
    options.populate = "show user"
    const query = {
        user: req.user._id ,
    }

    const filteredBooking = await bookingService.getUSerBookingHistory(req.body, query, options)
    res
        .status(200)
        .json({success:true, data:filteredBooking, message:"Booking data get successfully!"})
})

module.exports.getBooking = catchAsync(async (req, res) => {
    const {bookingId} = req.params
    const bookingData = await bookingService.findBooking({id: bookingId})
    
    res
        .status(200)
        .json({success:true, data: bookingData , message:"Booking get successfully!"})
})

module.exports.deleteBooking = catchAsync(async (req, res) => {
    const {bookingId} = req.params
    const deletedBooking = await bookingService.deleteBooking({_id: bookingId, user:req.user._id})
    console.log(deletedBooking, "deleted data", {id: bookingId, user:req.user._doc._id});
    res
        .status(200)
        .json({success:true, message:"Booking deleted successfully!"})
})

module.exports.updateBooking = catchAsync(async (req, res) => {
    const {bookingId} = req.params

    const updatedBooking = await bookingService.updateBooking({id: bookingId}, req.body)
    res
        .status(200)
        .json({success:true, message:"Booking updated successfully!"})
})
