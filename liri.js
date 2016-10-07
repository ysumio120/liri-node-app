var keys = require("./key.js");

var Twitter = require('twitter');
var Spotify = require('spotify');
var Request = require('request');
var fs = require('fs');

var commandLine = process.argv;

var command = commandLine[2];

// Initial run
commands(command);

function commands(command) {
	log(command);
	log("--------------------------------------");
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
		default:
			console.log("ERROR");
	}
}

function myTweets() {
	var client = new Twitter(keys.twitterKeys);
	var params = {
		screen_name: "realDonaldTrump",
		count: 20
	};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for(var i = 0; i < tweets.length; i++) {
				var tweet = tweets[i].created_at  + "\n" + tweets[i].text + "\n";
				log(tweet);

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
    			log("Artist(s):\t" + artists + "\n"
    			+ "Name:\t\t" + track.name + "\n"
    			+ "Preview:\t" + track.preview_url + "\n"
    			+ "Album:\t\t" + track.album.name + "\n");
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
	    			log("Artist(s):\t" + artists + "\n"
	    			+ "Name:\t\t" + track.name + "\n"
	    			+ "Preview:\t" + track.preview_url + "\n"
	    			+ "Album:\t\t" + track.album.name + "\n");
	    			return;
	    		}
    		}
    	});
	});
}

function movieThis() {
	var query = process.argv[3];
	var options = {
		uri: 'http://www.omdbapi.com/?r=json&plot=full&y&tomatoes=true&t=' + query,
		json: true 
	};
	Request(options, function (error, response, body) {
 	 	log("Title:\t\t\t" + body.Title + "\n"
 	 	+ "Year:\t\t\t" + body.Year + "\n" 
 	 	+ "IMDB Rating:\t\t" + body.imdbRating + "\n"
 	 	+ "Country:\t\t" + body.Country + "\n"
 	 	+ "Language:\t\t" + body.Language + "\n"
 	 	+ "Plot:\t\t\t" + body.Plot + "\n"
 	 	+ "Actors:\t\t\t" + body.Actors + "\n"
 	 	+ "Rotten Tomatoes Rating:\t" + body.tomatoRating + "\n"
 	 	+ "Rotten Tomatoes URL:\t" + body.tomatoURL + "\n");
	});
}
function doIt() {
	fs.readFile("random.txt", "utf8", function(err, data) {
		var comma = data.indexOf(",");
		var command = data.substring(0, comma);
		process.argv[3] = data.substring(comma + 1);
		var track = process.argv[3];
		if(track[0] == "\"" && track[track.length-1] == "\"") {
			process.argv[3] = track.substring(1, track.length-1);
		}
		commands(command);
	});
}

function log(buffer) {
	fs.appendFile("log.txt", buffer + "\n", function(err) {
		if(!err) {
			//console.log("ERROR");	
		}
		console.log(buffer);
	});
}