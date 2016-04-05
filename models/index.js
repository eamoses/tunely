// var mongoose = require("mongoose");
// mongoose.connect(process.env.MONGOLAB_URI ||
//                   process.env.MONGOHQ_URL ||
//                   "mongodb://localhost/tunely");
//
// module.exports.Album = require("./album.js");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tunely_test");

var Album = require('./album');

module.exports.Album = Album;
module.exports.Song = require('./song');
