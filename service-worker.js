const CACHE_NAME='jr-apostilas-premium-v2-clinico-geral';
const ASSETS=[
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
  '/premium/',
  '/premium/index.html',
  '/lei-organica-jipa.pdf',
  '/estatuto-servidores-jipa.pdf',
  '/especificas-medicine.pdf',
  '/sus-1000-questoes.pdf',
  '/sus-legislacao.pdf #U2714 (ok)'
];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME?caches.delete(k):null))));
  self.clients.claim();
});

self.addEventListener('fetch',event=>{
  event.respondWith(fetch(event.request).catch(()=>caches.match(event.request)));
});
