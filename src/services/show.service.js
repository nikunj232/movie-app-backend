const { Show, Booking } = require("../models")
const ApiError = require("../utils/ApiError")

exports.createShow = async (showData) => {
    return Show.create(showData)
}

exports.getAllShow = async (query, options) => {
    const allShow = await Show.paginate(query, options)
    return allShow
}

exports.findShowByTitle = async (title) => {
    const showDoc = await Show.findOne({title})
    return showDoc
}

exports.findShow = async (query, populate) => {
    const showDoc = await Show.findOne(query).populate(populate)
    return showDoc
}

exports.getShowBookedSeat = async (showId) => {
    const showBookedSeat = await Booking.aggregate([
        {
            $match: {
                show: showId
            }
        },
        {
            $unwind: "$seats"
        },
        {
            $group: {
                "_id": "$show",
                "bookedSeats": {
                    $push: "$seats"
                }
            }
        }
    ])
    return showBookedSeat
}

exports.updateShow = async (query, data) => {
    const updatedShowDoc = await Show.updateOne(query, { $set: data }, { new: false })
    return updatedShowDoc
}

exports.deleteShow = async (id) => {
    const deleteShowDoc = await Show.deleteOne({id})
    return deleteShowDoc
}
