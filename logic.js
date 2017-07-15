const keys = require('./keys.js');
const twitter = require('twitter')
const spotify = require('spotify')
const request = require('request')
const fs = require('fs');

console.log('Node is running maannnn');

tweets();

function tweets() {
  var client = new twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret
});


var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
};
function spotifySong() {

};

function movieThis() {

};
