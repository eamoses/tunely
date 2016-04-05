var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SongSchema = new Schema({
  name: String,
  trackNumber: Number,
});

//exporting the song schema to mongoose and index.js model
var Song = mongoose.model('Song', SongSchema);
module.exports = Song;
