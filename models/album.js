var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  genres: [ String ]
});

//exporting the album schema to mongoose and index.js model
var Album = mongoose.model('Album', AlbumSchema);
module.exports = Album;
