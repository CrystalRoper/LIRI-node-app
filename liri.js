import { spotify } from "./keys";

require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var command = process.argv[2];
var query = process.argv.slice(3).join(" ");

//OMDb API Key: 4240c9a4

//Display options to the user of what inputs are possible and a description of what they do.
console.log("\n--------------------------\nWelcome to LIRI - the Language Interpretation and Recognition Interface.\n--------------------------\n \nTry one of the following commands:\n--------------------------\n  \nconcert-this <artist/band name here> - This will provide you the name of the venue, venue location, and date of event for that band. \n--------------------------\n \nspotify-this-song <song name here> - This will provide you the name of the artist, a preview link to Spotify, and the albumn name that the song is from. \n--------------------------\n \nmovie-this '<movie name here> - This will provide you information about that movie such as release year, IMDB rating, Rotten Tomatoes rating, and more. \n--------------------------\n \ndo-what-it-says - This will randomize one of the commands above. \n--------------------------\n")

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
        break;
}

//Input "node liri.js concert-this <artist/band name here>" This will search the Bands in Town Artist Events API 
//("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") 
//for an artist and render the following information about each event to the terminal::
function concertThis() {
    axios.get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log("Venue list for " + query +
                //Name of the venue
                "\nEvent: " + response.VenueData.name +
                //Venue location
                "\nLocation: " + response.VenueData.city + ", " + response.VenueData.region +
                //Date of the Event (use moment to format this as MM/DD/YYYY)
                "\nDate: " + response.EventData.datetime
            );
        }
    );

}

//**********************//

//Input "node liri.js spotify-this-song <song name here>" 
//This will show the following information about the song in your terminal/bash window
function spotifyThis() {
    spotify
        .search({ type: 'track', query: query })
        .then(function (response) {
            console.log("Song info for " + query +
                //Artist(s)
                "Artist(s): " + response.data.artists +
                //The song's name

                //A preview link of the song from Spotify

                //The album that the song is from

                );
        })
        .catch(function (err) {
            //If no song is provided then your program will default to "The Sign" by Ace of Base
            console.log(err);
        });

}

//You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.

//**********************//

// Input node liri.js movie-this '<movie name here>'
//This will output the following information to your terminal/bash window:
function movieThis() {
    axios.get("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log(
                //* Title of the movie.
                //* Year the movie came out.
                //* IMDB Rating of the movie.
                //* Rotten Tomatoes Rating of the movie.
                //* Country where the movie was produced.
                //* Language of the movie.
                //* Plot of the movie.
                //* Actors in the movie.
            );
        }
    );


}
//If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
//You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. 
//You may use trilogy.

//**********************//

// Input node liri.js do-what-it-says
//Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
function doIt() {

}
//It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
//Edit the text in random.txt to test out the feature for movie-this and concert-this.

//**********************//

//BONUS


//In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
//Make sure you append each command you run to the log.txt file. 
//Do not overwrite your file each time you run a command.