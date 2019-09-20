import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';

ReactDOM.render(< App />, document.getElementById('root'));
{/* registerServiceWorker(); */ }
unregister();

caches.keys().then(async (cacheNames) => {
    return await Promise.all(
        cacheNames.filter((cacheName) => {
            return true
        }).map((cacheName) => {
            return caches.delete(cacheName);
        })
    );
})