const asyncHandler = require("../middleware/asyncHandler");
const Movie = require("../models/movie.model");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all movies
// @route   GET api/movies
// @access  Public
exports.getMovies = asyncHandler(async (req, res, next) => {
    const { search, genres } = req.query;
    const query = {};
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { overview: { $regex: search, $options: 'i' } },
        ];
        query.keywords = { $in: [search.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())]};
    }
    if (genres) {
        query.genres = { $in: genres.split(',') };
    }
    const movies = await Movie.find(query);
    res.status(200).json({ success: true, data: movies });
});

// @desc    Get single movie
// @route   GET api/movies/:id
// @access  Public
exports.getMovie = asyncHandler(async (req, res, next) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
        return next(new ErrorResponse(`Movie not found`, 404));
    }
    res.status(200).json({ success: true, data: movie });
});
