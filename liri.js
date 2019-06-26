require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var fs = require("fs");

function concertCommand(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(response => {
            for (i = 0; i < response.data.length; i++) {
                console.log(response.data[i].venue.name)
                console.log(response.data[i].venue.city)
                console.log(response.data[i].datetime)
            }
        })
}

var getArtistNames = function(artist) {
    return artist.name;
}

function spotifySong(song) {
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var songs = data.tracks.items;

        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log("artist(s): " + songs[i].artists.map(getArtistNames));
            console.log("song name: " + songs[i].name);
            console.log("preview song: " + songs[i].uri);
            console.log("album: " + songs[i].album.name);
            console.log("-----------------------------------");
        }
    });
};

function moviePick(movie) {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&apikey=824ba9b")
        .then(response => {
            var info = response.data
            console.log(info.Title);
            console.log(info.Year);
            console.log(info.imdbRating);
            console.log(info.Actors);
        })
}

function says() {
    fs.readFile('random.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);

        var array = data.split(",")
        picker(array[0], array[1])
    });
}


function picker(expression, term) {
    switch (expression) {
        case "concert-this":
            concertCommand(term)
            break;
        case "spotify-this-song":
            spotifySong(term)
            break;
        case "movie-this":
            moviePick(term)
            break;
        case "do-what-it-says":
            says(term)
            break;
        default:
            console.log("error");
    }
}

picker(process.argv[2], process.argv.slice(3).join(" "));