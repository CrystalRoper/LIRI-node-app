var fs = require("fs");
require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var command = process.argv[2];
var query = process.argv.slice(3).join(" ");

fs.readFile(".env", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
        return console.log(error);
    }

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

});



//Display options to the user of what inputs are possible and a description of what they do.
console.log("\n--------------------------\nWelcome to LIRI - the Language Interpretation and Recognition Interface.\n--------------------------\n \nTry one of the following commands:\n--------------------------\n  \nconcert-this <artist/band name here> - This will provide you the name of the venue, venue location, and date of event for that band. \n--------------------------\n \nspotify-this-song <song name here> - This will provide you the name of the artist, a preview link to Spotify, and the albumn name that the song is from. \n--------------------------\n \nmovie-this '<movie name here> - This will provide you information about that movie such as release year, IMDB rating, Rotten Tomatoes rating, and more. \n--------------------------\n \ndo-what-it-says - This will randomize one of the commands above. \n--------------------------\n")

runCommand();

function runCommand() {
    //A switch-case to handle our four possible user commands, and a function for each. 
    switch (command) {
        case "concert-this":
            concertThis();
            break;

        case "spotify-this-song":
            spotifyThis();
            break;

        case "movie-this":
            movieThis();
            break;

        case "do-what-it-says":
            doIt();
            //runCommand();
            break;
    };
}

//Input "node liri.js concert-this <artist/band name here>" This will search the Bands in Town Artist Events API 
//("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") 
//for an artist and render the following information about each event to the terminal::
function concertThis() {
    if (!query) {
        query = "Weird Al";
    }
    axios.get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp")
        .then(function (response) {
            var data = response.data[0];
            console.log("Venue list for " + query +
                //Name of the venue
                "\nEvent: " + data.venue.name +
                //Venue location
                "\nLocation: " + data.venue.city + ", " + data.venue.region +
                //Date of the Event (use moment to format this as MM/DD/YYYY)
                "\nDate: " + data.datetime
            )
        })
        .catch(function (err) {
            console.log(err);
        });

}

//**********************//

//Input "node liri.js spotify-this-song <song name here>" 
//This will show the following information about the song in your terminal/bash window
function spotifyThis() {
    //If no song is provided then your program will default to "The Sign" by Ace of Base
    if (!query) {
        query = "The Sign";
    }
    spotify
        .search({ type: 'track', query: query })
        .then(function (response) {
            console.log("Song info for " + query);

            for (var i = 0; i < response.tracks.items.length; i++) {
                var data = response.tracks.items[i];
                var artistList = "";

                for (var x = 0; x < data.album.artists.length; x++) {
                    artistList = "\t" + data.album.artists[x].name + "\n";
                }

                console.log(
                    //Artist(s)
                    "\nArtist(s): " + artistList +
                    //The song's name
                    "\nSong Name: " + data.album.name +
                    //A preview link of the song from Spotify
                    "\nPreview Link: " + data.preview_url +
                    //The album that the song is from
                    "\nAlbum: " + data.album.name +
                    "\n-------------------------\n"
                );
            }


        })
        .catch(function (err) {
            console.log(err);
        });

}

//You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.

//**********************//

// Input node liri.js movie-this '<movie name here>'
//This will output the following information to your terminal/bash window:
function movieThis() {
    //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    if (!query) {
        query = "Mr. Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + query + "&apikey=trilogy")
        .then(function (response) {
            console.log("Movie info for " + query);
            var data = response.data;

            console.log(
                //* Title of the movie.
                "\nTitle: " + data.Title +
                //* Year the movie came out.
                "\nRelease Year: " + data.Year +
                //* IMDB Rating of the movie.
                "\nIMDB Rating: " + data.imdbRating +
                //* Rotten Tomatoes Rating of the movie.
                "\nRotten Tomatoes Rating: " + data.Ratings[1].Value +
                //* Country where the movie was produced.
                "\nProduction Country: " + data.Country +
                //* Language of the movie.
                "\nLanguage: " + data.Language +
                //* Plot of the movie.
                "\nPlot: " + data.Plot +
                //* Actors in the movie.
                "\nActors: " + data.Actors
            );
        }
        )
        .catch(function (error) {
            console.log(error);
        });


}

//You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. 
//You may use trilogy.

//**********************//

// Input node liri.js do-what-it-says
//Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
function doIt() {
    fs.readFile("random.txt", "utf8", (err, data) => {
        if (err) throw err;
        var randomizedString = data.split(",");
        var commandList = [];
        var queryList = [];

        for (var i = 0; i < randomizedString.length; i += 2) {
            commandList.push(randomizedString[i]);
            queryList.push(randomizedString[i + 1]);
        }

        var randomIndex = Math.floor(Math.random() * commandList.length);
        command = commandList[randomIndex];
        query = queryList[randomIndex];

        console.log(command + " " + query);
        runCommand();
    });
}
//It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
//Edit the text in random.txt to test out the feature for movie-this and concert-this.

//**********************//

//BONUS


//In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
//Make sure you append each command you run to the log.txt file. 
//Do not overwrite your file each time you run a command.

