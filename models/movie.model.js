const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  overview: String,
  poster: String,
  language: String,
  popularity: Number,
  keywords: [String],
  cast: [String],
  genres: {
    type: [String],
    enum: [
      "Action",
      "Adventure",
      "Animation",
      "Comedy",
      "Crime",
      "Documentary",
      "Drama",
      "Family",
      "Fantasy",
      "History",
      "Horror",
      "Music",
      "Mystery",
      "Romance",
      "Sci-Fi",
      "Thriller",
      "Sci-fi",
      "Historical Fiction",
      "Biographical",
      "Period Drama"
    ],
    required: [true,
      "Please select proper genre",]
  },
  movie: String,
});

module.exports = mongoose.model("Movie", movieSchema);