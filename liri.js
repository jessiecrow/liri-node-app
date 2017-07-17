var keys = require('./keys.js');
var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var method, args;

function liri() {
    switch (method) {
        case "my-tweets":
            var twitter = new Twitter({
                consumer_key: keys.twitter 
            })
    }
}