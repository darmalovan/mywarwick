/*
  Attempt to register service worker - we don't do notifications or offline but it's nice to keep it
  up to date.
*/
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
