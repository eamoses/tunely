// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

/*  Approximate schema for these seeds
var SongSchema = new Schema({
  name: String,
  trackNumber: Number,
});
*/


var songsList = [];

songsList.push({ name: 'Swamped',
                   trackNumber: 1
});
songsList.push({ name: "Heaven's a Lie",
                   trackNumber: 2
});
songsList.push({ name: 'Daylight Dancer',
                   trackNumber: 3
});
songsList.push({ name: 'Humane',
                   trackNumber: 4
});
songsList.push({ name: 'Self Deception',
                   trackNumber: 5
});
songsList.push({ name: 'Aeon',
                   trackNumber: 6
});
songsList.push({ name: 'Tight Rope',
                   trackNumber: 7
});

var albumList =[];
albumList.push({
              artistName: 'Nine Inch Nails',
              name: 'The Downward Spiral',
              releaseDate: '1994, March 8',
              genres: [ 'industrial', 'industrial metal' ]
            });
albumList.push({
              artistName: 'Metallica',
              name: 'Metallica',
              releaseDate: '1991, August 12',
              genres: [ 'heavy metal' ]
            });
albumList.push({
              artistName: 'The Prodigy',
              name: 'Music for the Jilted Generation',
              releaseDate: '1994, July 4',
              genres: [ 'electronica', 'breakbeat hardcore', 'rave', 'jungle' ]
            });
albumList.push({
              artistName: 'Johnny Cash',
              name: 'Unchained',
              releaseDate: '1996, November 5',
              genres: [ 'country', 'rock' ]
            });

albumList.forEach(function(album){
  album.songs = songsList;
});

db.Album.remove({}, function(err, albums){

  db.Album.create(albumList, function(err, albums){
    if (err) { return console.log('ERROR', err); }
    console.log("all albums:", albums);
    console.log("created", albums.length, "albums");
    process.exit();
  });

});
