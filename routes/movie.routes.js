const router = require("express").Router();

const { getMovies, getMovie } = require("../controllers/movie.controller");

router.get("/", getMovies);
router.get("/:id", getMovie)

module.exports = router;
