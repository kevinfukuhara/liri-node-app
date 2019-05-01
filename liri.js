// require the correct npm packages
// var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

//add code to read and set any environment variables with the dotenv package:
// var dotenv = require("dotenv").config();
require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

// Create checks to fill in gaps in user input
function main(userapi, searchTerm) {
    switch (userapi) {
        case 'concert-this':
        bandLookup(searchTerm);
        break;
        case 'movie-this':
        movieLookup(searchTerm);
        break;
        case 'spotify-this-song':
        musicLookup(searchTerm);
        break;
        case 'do-what-it-says':
        doWhat();
        break;
        default:
        console.log("Not a valid API we've provided you.\n");
        console.log("Choose from: \n  concert-this\n  movie-this\n  spotify-this-song\n  do-what-it-says\n\nExiting program.");
        break;
    };
    logCommand(userapi, searchTerm);
};

// Define functions for API Calls
function bandLookup(search) {
    // Use axios package to call to BandsInTown API.
    axios({
        method: 'get',
        url: "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp",
        responseType: 'json'
    })
        .then(function (response) {
            // console.log(JSON.stringify(response.data));
            console.log("--------------------------------------------------------------------");
            for (var i = 0; i < response.data.length; i++) {
                var concert =
                    "Venue Name: " + response.data[i].venue.name +
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY") +
                    "\n--------------------------------------------------------------------";
                console.log(concert);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};

function movieLookup(search) {
    // Use axios package to call to BandsInTown API.
    axios({
        method: 'get',
        url: "http://www.omdbapi.com/?t=" + search + "&plot=short&apikey=trilogy",
        responseType: 'json'
    })
        .then(function (response) {
            // console.log(JSON.stringify(response.data));
            var res = response.data;
            console.log(
                "-------------------------------------------------------------------" +
                "\nTitle: " + res.Title +
                "\nRelease Year: " + res.Year +
                "\nIMDB Rating: " + res.Ratings[0].Value +
                "\nRotten Tomatoes: " + res.Ratings[2].Value +
                "\nCountry of Origrin: " + res.Country +
                "\nLanguage: " + res.Language +
                "\nPlot: " + res.Plot +
                "\nCast: " + res.Actors
            )
        })
        .catch(function (error) {
            console.log(error);
        });
};

function musicLookup(search) {
    // Use spotify package to query for response
    if (search === "") {
        search = "artist:Ace Of Base"
        // artist = "The Ace"
    }

    spotify
        .request('https://api.spotify.com/v1/search?q=' + search + '&type=track&limit=5')
        .then(function (data) {
            var track = data.tracks.items[0];
            // console.log(data.tracks.items[0]);
            // for (var i = 0; i < data.tracks.items.length; i++) {
            // var track = data.tracks.items[i];
            console.log(
                "-------------------------------------------------------------------" +
                // "\nArtist: " + track.artists[i].name +
                "\nArtist: " + track.artists[0].name +
                "\nSong Name: " + track.name +
                "\nPreview link to song: " + track.preview_url +
                "\nAlbum song is from: " + track.album.name
            );
            // }

        })
        .catch(function (err) {
            console.error('Error occurred: ' + err);
        });
}

function doWhat() {
    // Read the file random.txt to get the command and run whatever we have to here.
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        // We will then print the contents of data
        // console.log(data);
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // Run the Liri function wiht the arguments from text file
        main(dataArr[0], dataArr[1]);
    });
}

function logCommand(api, search) {
    var logEvent = api + " " + search + " @ " + moment().format('LLLL') + "\n";
    // console.log(event);
    fs.appendFile("log.txt", logEvent, function (error) {
        // If an error was experienced we will log it.
        if (error) {
            console.log(err);
        }

        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
            console.log("Content Added!");
        }
    });
}

main(process.argv[2], process.argv.slice(3, process.argv.length).join(" "));



