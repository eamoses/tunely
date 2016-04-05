var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Song = require('./song');

var AlbumSchema = new Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  genres: [ String ],
  songs: [Song.schema]
});

//exporting the album schema to mongoose and index.js model
var Album = mongoose.model('Album', AlbumSchema);
module.exports = Album;
