import { handleMessageFromClient } from './Utilities/messageHandler';
import setupWorkbox from './setupWorkbox';
import registerRoutes from './registerRoutes';
import registerMessageHandlers from './registerMessageHandlers';

setupWorkbox();

registerRoutes();

registerMessageHandlers();

self.addEventListener('install', function(event) {
    console.log('Caching installed');
    event.waitUntil(
        
      caches.open(cacheName).then(function(cache) {
        return cache.addAll(
          [
            '/css/bootstrap.css',
            '/css/main.css',
            '/js/bootstrap.min.js',
            '/js/jquery.min.js',
            '/offline.html'
          ]
        );
      })
    );
  });

self.addEventListener('message', e => {
    const { type, payload } = e.data;

    handleMessageFromClient(type, payload, e);
});
