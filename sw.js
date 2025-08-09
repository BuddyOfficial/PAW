const CACHE_NAME = 'dogstube-cache-v1';
const urlsToCache = [
  '/',
  '/offline.html' // صفحة احتياطية للوضع دون اتصال (سننشئها)
  // يمكنك إضافة روابط CSS و JS الرئيسية هنا
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجد الملف في الكاش، قم بإرجاعه
        if (response) {
          return response;
        }
        // وإلا، اطلبه من الشبكة
        return fetch(event.request).catch(() => {
          // إذا فشل الطلب (لا يوجد انترنت)، أرجع الصفحة الاحتياطية
          return caches.match('/offline.html');
        });
      })
  );
});
