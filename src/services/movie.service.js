const { Movie } = require("../models")
const ApiError = require("../utils/ApiError")

exports.createMovie = async (reqBody, req) => {
    const movieExist = await Movie.findOne({title: reqBody.title})
    console.log(movieExist, "existing book");
    if (!!movieExist) {
        throw new ApiError(400, "Movie title already exist!", req)
    }
    return Movie.create(reqBody)

}

exports.getAllMovie = async (query, options) => {
    const allMovie = await Movie.paginate(query, options)
    return allMovie
}

exports.findMovieByTitle = async (title) => {
    const movieDoc = await Movie.findOne({title})
    return movieDoc
}

exports.findMovie = async (query) => {
    const movieDoc = await Movie.findOne(query)
    return movieDoc
}

exports.updateMovie = async (query, data) => {
    const updatedMovieDoc = await Movie.findOneAndUpdate(query, { $set: data }, { new: false })
    return updatedMovieDoc
}

exports.deleteMovie = async (id) => {
    const deleteMovieDoc = await Movie.deleteOne({id})
    return deleteMovieDoc
}
