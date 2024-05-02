const { Book, Booking } = require("../models")
const ApiError = require("../utils/ApiError")

exports.createBooking = async (bookingData, req) => {
    const bookingExist = await Booking.findOne({show: bookingData.show, seats: {$in: bookingData.seats}})
    console.log(bookingExist, "===================booking exist==================");
    if (!!bookingExist) {
        throw new ApiError(400, "Seat already booked!", req)
    }
    return Booking.create(bookingData)
}

exports.getAllBooking = async (query, options) => {
    const allBooking = await Booking.paginate(query, options)
    return allBooking
}

exports.getUSerBookingHistory = async (reqBody, query, options) => {
    const skip = ((options.page || 1) - 1) * options.limit
    const allBooking = await Booking.aggregate([
        {
            $match: query
        },
        {
            $lookup: {
                from: "shows",
                foreignField: "_id",
                localField: "show",
                as: "show",
                pipeline: [
                    {
                        $lookup: {
                            from: "movies",
                            localField: "movie",
                            foreignField: "_id",
                            as: "movie",
                        }
                    },            
                    {
                        $unwind: {
                            path: "$movie",
                            preserveNullAndEmptyArrays: true
                        }
                    }
                ]
            }
        },
        {
            $unwind: {
                path: "$show",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "user",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $facet: {
                pagination: [
                    {
                        $count: 'totalResults',
                    },
                    {
                        $addFields: {
                            page: options.page,
                            limit: options.limit,
                            totalPages: {
                                $ceil: {
                                    $divide: ['$totalResults', options.limit],
                                },
                            },
                        },
                    },
                ],
                data: [
                    { $skip: skip },
                    {
                        $limit: options.limit,
                    }
                ],
            },
        },
        {
            $unwind: {
                path: '$pagination',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [
                        {
                            results: '$data',
                        },
                        '$pagination',
                    ],
                },
            },
        }
    ])
    return allBooking[0]
}

exports.getAllBooking = async (query, options) => {
    const allBooking = await Booking.paginate(query, options)
    return allBooking
}

exports.findBooking = async (query) => {
    const bookingDoc = await Booking.findOne(query)
    return bookingDoc
}

exports.deleteBooking = async (id) => {
    const deleteBookingDoc = await Booking.deleteOne({id})
    return deleteBookingDoc
}
