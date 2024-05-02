const { default: mongoose } = require("mongoose");
const { str2regex } = require("../helpers/function.helper");
const { movieService, showService } = require("../services");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

module.exports.createMovie = catchAsync(async (req, res) => {
    const createdMovie = await movieService.createMovie(req.body, req)
    res
        .status(201)
        .json({success:true, data:createdMovie, message:"Movie created successfully!"})
})

module.exports.getAllMovie = catchAsync(async (req, res) => {
    const { search } = pick(req.query, ["search"]);
    const options = pick(req.query, ["limit", "page"]);
    const searchRegx = str2regex(search??'')
    const query = {
        title: { $regex:searchRegx, $options: 'i'} ,
    }

    const filteredMovie = await movieService.getAllMovie(query, options)
    res
        .status(200)
        .json({success:true, data:filteredMovie, message:"Movie data get successfully!"})
})

module.exports.getMovie = catchAsync(async (req, res) => {
    const {movieId} = req.params
    const movieData = await movieService.findMovie({id: movieId})
    
    res
        .status(200)
        .json({success:true, data: movieData , message:"Movie get successfully!"})
})

module.exports.getMovieShowAvailability = catchAsync(async (req, res) => {
    const {movieId} = req.params
    const {showtime, date} = req.body
    let resData = {
        bookedSeat: []
    }
    const showData = await showService.findShow({movie: new mongoose.Types.ObjectId(movieId), date, time: showtime}, "movie")
    console.log(showData, "show details");
    console.log({movie: movieId, time: showtime, date }, "movie details");
    if(!showData){
        const showData = await showService.createShow({movie: movieId, time: showtime, date })
        resData = { 
            showData,
            bookedSeat : []
        }
    }else{
        const showBookedSeat = await showService.getShowBookedSeat(showData._id)
        resData = { 
            showData,
            bookedSeat : showBookedSeat[0]?.bookedSeats
        }
    }
    
    res
        .status(200)
        .json({success:true, ...resData , message:"Movie get successfully!"})
})

module.exports.deleteMovie = catchAsync(async (req, res) => {
    const {movieId} = req.params
    const deletedMovie = await movieService.deleteMovie(movieId)

    res
        .status(200)
        .json({success:true, message:"Movie deleted successfully!"})
})

module.exports.updateMovie = catchAsync(async (req, res) => {
    const {movieId} = req.params

    const updatedMovie = await movieService.updateMovie({id: movieId}, req.body)
    res
        .status(200)
        .json({success:true, message:"Movie updated successfully!"})
})
