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
    }
}