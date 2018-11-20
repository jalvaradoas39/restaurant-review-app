var cacheName = 'v1';
var cacheFiles = [
	'./',
	'./index.html',
	'./restaurant.html',
	'./css/styles.css',
	'./data/restaurants.json',
	'./js/dbhelper.js',
	'./js/restaurant_info.js',
	'./js/main.js',
	'./img/1.jpg',
	'./img/2.jpg'
];



// the install event is generally used to populate your browser’s 
// offline caching capabilities with the assets you need to run 
// your app offline.
self.addEventListener('install', function(e) {
	console.log('[ServiceWorker] installed'/*, e*/);

	// block other events until completion
	e.waitUntil(
		// create a new cache called v1, which will be version 1 of 
		// our site resources cache. This returns a promise for a created cache
		caches.open(cacheName).then(function(cache) {
			console.log('[ServiceWorker] caching cacheFiles');
			return cache.addAll(cacheFiles);
		})
	)
});


// primary use of activate is for cleanup of resources used 
// in previous versions of a Service worker script
self.addEventListener('activate', function(e) {
	console.log("[ServiceWorker] activated");

	// block other events until completion
	e.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(cache) {
				
				if (cache !== cacheName) {
					console.log("[ServiceWorker] removing old cache from " + cache);
					return caches.delete(cache);
				}

			}))
		})
	)
});


