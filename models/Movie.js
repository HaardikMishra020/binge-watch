const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
"Title": String,
  "Year": String,
  "Actors":String,
  "Rated": String,
  "Released":String,
  "Runtime": String,
  "Genre": String,
  "Director": String,
  "Writer": String,
  "Plot": String,
  "Language": String,
  "Country": String,
  "Awards": String,
  "Poster": String,
  "Metascore": String,
  "imdbRating": String,
  "imdbVotes": String,
  "imdbID": String,
  "Type": String,
  "DVD": String,
  "BoxOffice": String,
  "Production": String,
  "Website": String,
  "Response": String
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
