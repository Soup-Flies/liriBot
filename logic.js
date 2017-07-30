const runAction = process.argv[2];
const searchType = process.argv.slice(3).join(' ');
const keys = require('./keys');
const Twitter = require('twitter')
const Spotify = require('node-spotify-api')
const request = require('request')
const fs = require('fs');
const client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});
const spotify = new Spotify({
  id: "60f5836a18a949b585e1095d7ccfebf9",
  secret: "bec33d5c8e1d4470bd26c03b005dd8f3"
});



function chooseCommand(action, search) {
  switch (action) {
    case "my-tweets":
      twitter();
      break;
    case "spotify-this-song":
      spotifySong(search);
      break;
    case "movie-this":
      movieThis(search);
      break;
    case "do-what-it-says":
      whatItSays();
      break;
    default:
      console.log(`Welcome to nowhere land traveler, care to try again?
        Your command options are: 'my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'`);
  }
}

function twitter() {
  var params = {screen_name: 'nodejs'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (tweet of tweets) {
        console.log(`
          @${tweet.user.screen_name} said:
          ${tweet.text} on:
          ${tweet.created_at}
        `);
      }
      let now = new Date();
      fs.appendFile('./log.txt', `${now}: Called Last 20 Tweets \n`, (err) => {
        if (err) throw err;
        console.log(`The call was logged to log.txt`);
      });
    } else {
      console.log(error);
    };
});
};

function spotifySong(search) {
  spotify.search({ type: 'track', query: search }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {
      data = data.tracks.items[0];
      console.log(`Artist Name: ${data.artists[0].name}`);
      console.log(`Album Name: ${data.album.name}`);
      console.log(`Song name: ${data.name}`);
      console.log(`For a preview click: ${data.external_urls.spotify}`);
      let now = new Date();
      fs.appendFile('./log.txt', `${now}: Called Spotify Music search with ${search} \n`, (err) => {
        if (err) throw err;
        console.log(`The call was logged to log.txt`);
      });
    };
  });
};

function movieThis(search) {
  request('http://www.omdbapi.com/?t='+ (search || 'mr+nobody') + '&y=&plot=short&apikey=40e9cece',
		function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			console.log('Title: ' + data.Title);
			console.log('Year: ' + data.Year);
			console.log('Rated: ' + data.Rated);
			console.log('IMDB Rating: ' + data.imdbRating);
			console.log('Country: ' + data.County);
			console.log('Language: ' + data.Language);
			console.log('Plot: ' + data.Plot);
			console.log('Actors: ' + data.Actors);
      let now = new Date();
      fs.appendFile('./log.txt', `${now}: Called OMDB Movie search with ${search} \n`, (err) => {
        if (err) throw err;
        console.log(`The call was logged to log.txt`);
      });
    };
  });
};

function whatItSays() {
fs.readFile('./random.txt', 'utf8', (err, data) => {
    if (err) throw err;
    let splitData = data.split(',');
    let action = splitData[0];
    var search = splitData[1];
    let now = new Date();
    fs.appendFile('./log.txt', `${now}: Called do-what-it-says \n`, (err) => {
      if (err) throw err;
      console.log(`The call was logged to log.txt`);
    })
    spotifySong(search);
  });
};

chooseCommand(runAction, searchType);
