'use strict';

let Writable = require('stream').Writable,
    TwitterStream = require('twitter-stream-api'),
    config = require('../config/config');

const Twitter = new TwitterStream(config.twitter);

let Output = Writable({objectMode: true});
Output._write = function (obj, enc, next) {
    // the tweet json
    console.log(JSON.stringify(obj));
    // the tweet id and text
    console.log(obj.id, obj.text);
    next();
};

function twitterStreaming() {
    // listen to #pokemongo
    Twitter.stream('statuses/filter', {track: ['#pokemongo']});

    //Twitter stream events
    Twitter.on('connection success', function (uri) {
        console.log('Twitter stream connection success', uri);
    });

    Twitter.on('connection aborted', function () {
        console.log('Twitter stream connection aborted');
    });

    Twitter.on('connection error network', function () {
        console.log('Twitter stream connection error network');
    });

    Twitter.on('connection error stall', function () {
        console.log('Twitter stream connection error stall');
    });

    Twitter.on('connection error http', function (err) {
        console.log('Twitter stream connection error http', err);
    });

    Twitter.on('connection rate limit', function () {
        console.log('Twitter stream connection rate limit');
    });

    Twitter.on('connection error unknown', function () {
        console.log('Twitter stream connection error unknown');
    });

    Twitter.on('data keep-alive', function () {
        console.log('Twitter stream data keep-alive');
    });

    Twitter.on('data error', function () {
        console.log('Twitter stream data error');
    });

    Twitter.pipe(Output);
}

module.exports = {
    startStreaming: twitterStreaming
};