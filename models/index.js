// var mongoose = require("mongoose");
// mongoose.connect(process.env.MONGOLAB_URI ||
//                   process.env.MONGOHQ_URL ||
//                   "mongodb://localhost/tunely");
//
// module.exports.Album = require("./album.js");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tunely_test");

//importing album from the album model
var Album = require('./album');
module.exports.Album = Album;
//importing song from song model
var Song = require('./song');
module.exports.Song = Song;
