const asyncHandler = require("../middleware/asyncHandler");
const Movie = require("../models/movie.model");

// @desc    Post movie
// @route   POST api/admin/movie
// @access  Private/Admin
exports.postMovie = asyncHandler(async (req, res, next) => {
    req.body.genres = req.body.genres.split(",");
    req.body.cast = req.body.cast.split(",");
    req.body.keywords = req.body.keywords.split(",");
    
    const movie = await Movie.create({
        ...req.body,
        poster: req.files.poster[0].path.split("public")[1],
        movie: req.files.movie[0].path.split("public")[1],
    });
    res.status(201).json({ success: true, data: movie });
});

// @desc    update movie
// @route   PUT api/admin/movie/:id
// @access  Private/Admin
exports.updateMovie = asyncHandler(async (req, res, next) => {
    const { genres, cast, keywords } = req.body
    if (req.files) {
        if (req.files.movie) {
            req.body.movie = req.files.movie[0].path.split("public")[1];
        }
        if (req.files.poster) {
            req.body.poster = req.files.poster[0].path.split("public")[1];
        }
    }
    if (genres) req.body.genres = genres.split(",");
    if (cast) req.body.cast = cast.split(",");
    if (keywords) req.body.keywords = keywords.split(",");
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({ success: true, data: movie });
});

// @desc    delete movie
// @route   DELETE api/admin/movie/:id
// @access  Private/Admin
exports.deleteMovie = asyncHandler(async (req, res, next) => {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
});


