var keys = require('./keys.js').keys;
var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var method, args;

function liri() {
    switch (method) {
        case "my-tweets":
            var twitter = new Twitter({
                consumer_key: keys.twitter.consumer_key,
                consumer_secret: keys.twitter.consumer_secret,
                access_token_key: keys.twitter.access_token_key,
                access_token_secret: keys.twitter.access_token_secret
            });

            twitter.get('statuses/user_timeline' , {
                screen_name: 'Take0ff_OW'
            }, (err, tweets, response) => {
                if (!err) {
                    for (var index = 0; index < tweets.length; index++) {
                        var element = tweets[index];
                        console.log('${element.created_at}: ${element.text}');
                    }
                } else {
                    console.log(err);
                }
            });
            break;
        case "spotify-this-song":
            var spotify = new Spotify({
                id: keys.spotify.client_id,
                secret: keys.spotify.client_secret
            });
            if (args.length > 0) {
                var song = Array.isArray(args) ? args.join("") : args;
                spotify.search({
                    type: "track",
                    query: song,
                });
                .then((response) => {
                    var tracks = response.tracks.items;
                    console.log("Artists: " + tracks[0].artists[0].name + "\n" + "Album: " + tracks[0].album.name + "\n" + "Song: " + tracks[0].name + "\n" + "URL: " + tracks[0].external_urls.spotify);
                }
                .catch((err) => {
                    console.log(err);
                })
            } else {
                spotify.search({
                    type: "track",
                    query: "Error",
                });
                .then((response) => {
                    var tracks = response.tracks.items;
                    console.log("Artists: " + tracks[6].artists[0].name + "\n" + "Album: " + tracks[6].album.name + "\n" + "Song: " + tracks[6].name + "\n" + "URL: " + tracks[6].external_urls.spotify);
                }
                .catch((err) => {
                    console.log(err);
                });
            }
            break;
        case "movie-this":
            if (args.length > 0) {
                var movie = Array.isArray(args) ? args.join(" ") : args;
                var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece"
                request(url, (err, repsonse, body) => {
                    if (!err && response.statusCode === 200) {
                        var data = JSON.parse(body);
                        console.log("Title: " + data.Title + "\n" + "Release Date: " + data.Year + "\n" + "IMDB Rating: " + data.Ratings[0].Value + "\n" + "Rotten Tomatoes Rating: " + data.Ratings[1].Value + "\n" + "Produced in: " + data.Country + "\n" + "Language: " + data.Language + "\n" + "Plot: " + data.Plot + "\n" + "Actors: " + data.Actors + "\n");
                    } else {
                        console.log(err);
                    }
                });
            } else {
                var movie = "Godfather";
                var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece"
                request(url, (err, response, body) => {
                    if (!error && response.statusCode === 200) {
                        var data = JSON.parse(body);
                        console.log("Title: " + data.Title + "\n" + "Release Date: " + data.Year + "\n" + "IMDB Rating: " + data.Ratings[0].Value + "\n" + "Rotten Tomatoes Rating: " + data.Ratings[1].Value + "\n" + "Produced in: " + data.Country + "\n" + "Language: " + data.Language + "\n" + "Plot: " + data.Plot + "\n" + "Actors: " + data.Actors + "\n");
            } else {
                console.log(err);
            }
        });
        break;
    }
}
if (process.argv[2] === "do-what-it-says") {
    fs.readFile("./random.txt", "UtF8", (err, data) => {
        method = data.split(",")[0];
        args = data.split(",")[1];
        liri();
    });
} else {
    args = process.argv.slice(3);
    method = process.argv[2];
    liri();
}