var cacheName = 'v1';
var cacheFiles = [
	'/restaurant-review-app/',
	'/restaurant-review-app/index.html',
	'/restaurant-review-app/restaurant.html',
	'/restaurant-review-app/css/styles.css',
	'/restaurant-review-app/data/restaurants.json',
	'/restaurant-review-app/js/dbhelper.js',
	'/restaurant-review-app/js/restaurant_info.js',
	'/restaurant-review-app/js/main.js',
	'/restaurant-review-app/img/1.jpg',
	'/restaurant-review-app/img/2.jpg',
	'/restaurant-review-app/img/3.jpg',
	'/restaurant-review-app/img/4.jpg',
	'/restaurant-review-app/img/5.jpg',
	'/restaurant-review-app/img/6.jpg',
	'/restaurant-review-app/img/7.jpg',
	'/restaurant-review-app/img/8.jpg',
	'/restaurant-review-app/img/9.jpg',
	'/restaurant-review-app/restaurnt-/img/10.jpg'
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


// fire every time any resource controlled by a service worker 
// is fetched, which includes the documents inside the specified 
// scope, and any resources referenced in those documents
self.addEventListener('fetch', function(e) {
	console.log("[ServiceWorker] fetching");

    // hijacks our HTTP responses and updates them
	e.respondWith(
		caches.match(e.request).then(function(response) {
			// if the resources isn't in the cache, request it 
			// from the network
			return response || fetch(e.request).then(function(response) {
				// cloning the response is necessary because request and 
				// response streams can only be read once.  In order to 
				// return the response to the browser and put it in the 
				// cache we have to clone it
				let responseClone = response.clone();
				caches.open(cacheName).then(function(cache) {
					// use put to add the resource to the cache
					cache.put(e.request, responseClone);
				});

				return response;
			});

		}).catch(function() {
			//  fallback image for failure to update
			return caches.match('./img/1.jpg');
		})
	);
});






