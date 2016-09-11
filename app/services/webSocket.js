"use strict";

var WebSocket = require('ws'),
    config = require(__base + 'config'),
    store = require(__appbase + 'stores/webSocket');

var options_pokezz = {
    headers: {
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        "Origin": "http://pokezz.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36",
        "Accept-Encoding": "gzip, deflate, sdch",
        "Accept-Language": "de-DE,de;q=0.8,en-US;q=0.6,en;q=0.4"
    }
};
var options_pokedexs = {
    headers: {
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        "Origin": "https://pokedexs.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36",
        "Accept-Encoding": "gzip, deflate, sdch",
        "Accept-Language": "de-DE,de;q=0.8,en-US;q=0.6,en;q=0.4"
    }
};

module.exports = {
    listen: function(){
        var options = collection ==='pokezz' ? options_pokezz : options_pokedexs;
        var scheme = collection === 'pokezz' ? 'ws://' : 'wss://';
        var ws = new WebSocket(scheme + config[collection].host + config[collection].path, options);

        ws.on('open', function open() {
            logger.info("WebSocket opened!");
        });

        ws.on('message', function(message) {
            if (message.startsWith('42')) {
                var arr = JSON.parse(message.substr(2));
                if (arr[0] === 'a') {
                    arr = arr[1].split('~');
                    store.insert(arr);
                } else if (arr[0] === 'b'){
                    store.insert([arr[1]]);
                }
            }
        });

        ws.on('error', function(err) {
            module.exports.listen();
        });

        setInterval(function () {
            ws.send("2", {mask: true});
        }, 25000);
    }
};