var ProxyLists = require('proxy-lists');
var proxyChecker = require('proxy-checker');

var options = {
    anonymityLevels: ['elite'],
    sourcesWhiteList: ['freeproxylists','bitproxies', 'hidemyass', 'proxydb'],
    bitproxies: {apiKey: 'J0Rkg7Y4p81lrquleGPU6MER4KYA1APc'}
};

// `gettingProxies` is an event emitter object.
var gettingProxies = ProxyLists.getProxies(options);
var proxySet = new Set();
gettingProxies.on('data', function(proxies) {
    console.log(proxies);
    for(var i = 0; i < proxies.length; i++) {
        proxy = proxies[i];
        proxyChecker.checkProxy(proxy.ipAddress, proxy.port, {url: 'http://www.pokeradar.io/api/v1/submissions?minLatitude=33.756886&maxLatitude=33.773&minLongitude=-118.175&maxLongitude=-118.1569', regex: /pokemonId/}, function(host, port, ok, statusCode, err) {
            if(ok){
                proxySet.add(host + ":" + port);
                console.log(proxySet);
            }
        })
    }
});

gettingProxies.on('error', function(error) {
    // Some error has occurred.
    console.error(error);
});

gettingProxies.once('end', function() {
    console.log(proxySet);
});


