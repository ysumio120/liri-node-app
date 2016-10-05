var keys = require("./key.js");

var Twitter = require('twitter');
var Spotify = require('spotify');
var Request = require('request');

var commandLine = process.argv;

var command = commandLine[2];

switch (command) {
	case "my-tweets":
		myTweets();
		break;
	case "spotify-this-song":
		spotifySong();
		break;
	case "movie-this":
		movieThis();
		break;
	case "do-what-it-says":
		doIt();
		break;

}

function myTweets() {
	var client = new Twitter(keys.twitterKeys);
	var params = {
		screen_name: "Wintermute1",
		count: 20
	};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for(var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].created_at  + "\n" + tweets[i].text + "\n");
			}
	  	}
	});
}

function spotifySong() {
	Spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
    	if ( err ) {
     	   console.log('Error occurred: ' + err);
     	   return;
    	}
    	for(var i = 0; i < data.tracks.items.length; i++) {
    		var track = data.tracks.items[i];

    		if(track.name.toLowerCase() == process.argv[3].toLowerCase()){
    			var artists = [];
    			for(var j = 0; j < track.artists.length; j++) {
    				artists.push(track.artists[j].name);
    			}
    			console.log("Artist(s):\t" + artists);
    			console.log("Name:\t\t" + track.name);
    			console.log("Preview:\t" + track.preview_url);
    			console.log("Album:\t\t" + track.album.name);
    			return;
    		}
    	}
    	Spotify.search({ type: 'track', query: "The Sign" }, function(err, data) {
    		for(var i = 0; i < data.tracks.items.length; i++) {
	    		var track = data.tracks.items[i];

	    		if(track.name.toLowerCase() == "The Sign".toLowerCase()){
	    			var artists = [];
	    			for(var j = 0; j < track.artists.length; j++) {
	    				artists.push(track.artists[j].name);
	    			}
	    			console.log("Artist(s):\t" + artists);
	    			console.log("Name:\t\t" + track.name);
	    			console.log("Preview:\t" + track.preview_url);
	    			console.log("Album:\t\t" + track.album.name);
	    			return;
	    		}
    		}
    	});
 		//console.log(data.tracks.items[0].name);
    // Do something with 'data' 
	});
}

function movieThis() {
	var query = process.argv[3];
	var options = {
		uri: 'http://www.omdbapi.com/?r=json&plot=full&y&tomatoes=true&t=' + query,
		json: true 
	};
	Request(options, function (error, response, body) {
 	 	console.log(body);
 	 	console.log("Title:\t\t\t" + body.Title);
 	 	console.log("Year:\t\t\t" + body.Year); 
 	 	console.log("IMDB Rating:\t\t" + body.imdbRating);
 	 	console.log("Country:\t\t" + body.Country);
 	 	console.log("Language:\t\t" + body.Language);
 	 	console.log("Plot:\t\t\t" + body.Plot);
 	 	console.log("Actors:\t\t\t" + body.Actors);
 	 	console.log("Rotten Tomatoes Rating:\t" + body.tomatoRating);
 	 	console.log("Rotten Tomatoes URL:\t" + body.tomatoURL);
	});
}
function doIt() {

}

