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
        query.title = { $regex: search, $options: 'i' };
    }
    if (genres) {
        query.genres = { $in: genres.split(',') };
    }
    const movies = await Movie.find(query);
    const genresSet = Array.from(new Set(movies.map(movie => movie.genres).flat()));
    const suggestedMovies = await Movie.find({ genres: { $in: genresSet } });
    const uniqueSuggestedMovies = [...movies, ...suggestedMovies].filter((movie, index, self) =>
        index === self.findIndex((m) => (
            m._id.toString() === movie._id.toString()
        ))
    );
    res.status(200).json({ success: true, data: uniqueSuggestedMovies });
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
