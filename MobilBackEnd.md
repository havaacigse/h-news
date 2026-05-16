# H-News Mobil Backend Görevleri

Mobil Front-end ile Back-end Bağlanmış Test Videosu: Link buraya eklenecek

## 1. Haberleri Listeleme Servisi

API Endpoint: GET /api/news

### Görev
Mobil uygulamada ana sayfada haber listesini backend’den çekmek.

### İşlevler
- Haber listesini API’den alma
- Kategori parametresi varsa filtreli haber döndürme
- Redis cache üzerinden hızlı cevap verme
- Mobil UI’da haber kartları ile gösterme

### Teknik Detaylar
- Swift tarafında URLSession kullanılır.
- Backend tarafında Express route/controller yapısı kullanılır.
- Redis cache key: `news:all`, `news:category:<category>`
- Hata durumunda mobilde mock fallback gösterilir.

### Hata Yönetimi
- Backend çalışmıyorsa fallback data kullanılır.
- Boş liste durumunda EmptyStateView gösterilir.

### Mobil ekranla bağlantısı
HomeView içinde haber kartları olarak gösterilir.

## 2. Haber Detay Servisi

API Endpoint: GET /api/news/:id

RabbitMQ Event: news.viewed

### Görev
Seçilen haberin detay bilgisini mobil uygulamaya döndürmek.

### İşlevler
- Haber başlığı, içerik, kategori, tarih ve popülerlik bilgisi döner.
- Haber görüntülendiğinde RabbitMQ event publish edilir.

### Teknik Detaylar
- Backend `newsController.getNewsById` fonksiyonunu kullanır.
- Event payload içinde `newsId` ve `timestamp` bulunur.

### Hata Yönetimi
- Haber bulunamazsa `success: false` ve `News not found` mesajı döner.

### Mobil ekranla bağlantısı
NewsDetailView içinde haber detayları gösterilir.

## 3. Haber Arama Servisi

API Endpoint: GET /api/news/search?q=kelime

Redis Key: `news:search:<query>`

RabbitMQ Event: news.searched

### Görev
Kullanıcının arama kutusuna yazdığı kelimeye göre haberleri döndürmek.

### İşlevler
- Başlık, özet, içerik ve kategori alanlarında arama yapar.
- Redis cache ile tekrar eden aramaları hızlandırır.
- Arama işlemini RabbitMQ event olarak yayınlar.

### Teknik Detaylar
- Query parametresi `q` ile alınır.
- Swift tarafında SearchView, NewsAPIService üzerinden istek yapar.

### Hata Yönetimi
- API başarısız olursa mobil local search fallback çalışır.

### Mobil ekranla bağlantısı
SearchView içinde sonuçlar NewsCardView ile listelenir.

## 4. Popüler Haberler Servisi

API Endpoint: GET /api/news/popular

Redis Key: `news:popular`

### Görev
Popülerlik değerine göre haberleri sıralamak.

### İşlevler
- Haberleri popularity alanına göre büyükten küçüğe sıralar.
- Redis cache kullanır.

### Teknik Detaylar
- Backend `newsService.getPopularNews` fonksiyonunu kullanır.

### Hata Yönetimi
- Redis kapalıysa direkt mock data üzerinden cevap döner.

### Mobil ekranla bağlantısı
HomeView içinde En Popüler seçimiyle gösterilir.

## 5. Son Eklenen Haberler Servisi

API Endpoint: GET /api/news/recent

Redis Key: `news:recent`

### Görev
Haberleri yayınlanma tarihine göre en yeni önce olacak şekilde döndürmek.

### İşlevler
- publishedTimestamp alanına göre sıralama yapar.
- Redis cache kullanır.

### Teknik Detaylar
- Backend `newsService.getRecentNews` fonksiyonunu kullanır.

### Hata Yönetimi
- Redis kapalıysa normal JSON response dönmeye devam eder.

### Mobil ekranla bağlantısı
HomeView içinde Son Eklenenler seçimiyle gösterilir.

## 6. Okundu İşaretleme Servisi

API Endpoint: PATCH /api/news/:id/read

RabbitMQ Event: news.read_marked

### Görev
Bir haberi okundu olarak işaretlemek.

### İşlevler
- Haber isRead değerini true yapar.
- Temel haber cachelerini temizler.
- RabbitMQ event publish eder.

### Teknik Detaylar
- Backend mock data üzerinde state değiştirir.

### Hata Yönetimi
- Haber bulunamazsa 404 response döner.

### Mobil ekranla bağlantısı
NewsDetailView içindeki Okundu İşaretle butonu kullanır.

## 7. Okunmadı İşaretleme Servisi

API Endpoint: PATCH /api/news/:id/unread

RabbitMQ Event: news.unread_marked

### Görev
Bir haberi okunmadı olarak işaretlemek.

### İşlevler
- Haber isRead değerini false yapar.
- Temel haber cachelerini temizler.
- RabbitMQ event publish eder.

### Teknik Detaylar
- Backend mock data üzerinde state değiştirir.

### Hata Yönetimi
- Haber bulunamazsa 404 response döner.

### Mobil ekranla bağlantısı
NewsDetailView içindeki Okunmadı İşaretle butonu kullanır.

## 8. Favoriye Ekleme Servisi

API Endpoint: POST /api/favorites/:newsId

RabbitMQ Event: news.favorited

### Görev
Bir haberi favorilere eklemek.

### İşlevler
- isFavorite değerini true yapar.
- Cache temizler.
- RabbitMQ event publish eder.

### Teknik Detaylar
- NewsStore favori işlemini API’ye gönderir.

### Hata Yönetimi
- API başarısız olursa mobil local state fallback çalışır.

### Mobil ekranla bağlantısı
NewsDetailView ve NewsCardView hızlı kalp butonu kullanır.

## 9. Favorilerden Kaldırma Servisi

API Endpoint: DELETE /api/favorites/:newsId

RabbitMQ Event: news.unfavorited

### Görev
Bir haberi favorilerden kaldırmak.

### İşlevler
- isFavorite değerini false yapar.
- Favori notu ve etiketi temizler.
- RabbitMQ event publish eder.

### Teknik Detaylar
- Backend `newsService.removeFavorite` fonksiyonunu kullanır.

### Hata Yönetimi
- Haber bulunamazsa 404 response döner.

### Mobil ekranla bağlantısı
FavoritesView ve NewsCardView kalp butonu kullanır.

## 10. Favori Haberleri Görüntüleme Servisi

API Endpoint: GET /api/favorites

### Görev
Favori olarak işaretlenen haberleri listelemek.

### İşlevler
- isFavorite true olan haberleri döndürür.
- Mobil favoriler ekranını besler.

### Teknik Detaylar
- Backend mock data üzerinde filtreleme yapar.

### Hata Yönetimi
- Liste boşsa mobil EmptyStateView gösterir.

### Mobil ekranla bağlantısı
FavoritesView içinde kullanılır.

## 11. Favori Not / Etiket Güncelleme Servisi

API Endpoint: PATCH /api/favorites/:newsId

Body: `{ note, tag }`

RabbitMQ Event: favorite.updated

### Görev
Favori habere not ve etiket eklemek veya güncellemek.

### İşlevler
- favoriteNote alanını günceller.
- favoriteTag alanını günceller.
- RabbitMQ event publish eder.

### Teknik Detaylar
- Request body JSON olarak alınır.

### Hata Yönetimi
- API başarısız olursa mobil local state fallback çalışır.

### Mobil ekranla bağlantısı
FavoritesView içindeki favori düzenleme sheet’i kullanır.

## 12. Offline Haber Kaydetme Servisi

API Endpoint: POST /api/offline/:newsId

RabbitMQ Event: news.offline_saved

### Görev
Bir haberi offline okumak için kaydetmek.

### İşlevler
- isOfflineSaved değerini true yapar.
- RabbitMQ event publish eder.

### Teknik Detaylar
- Backend mock data üzerinde state değiştirir.

### Hata Yönetimi
- Haber bulunamazsa 404 response döner.

### Mobil ekranla bağlantısı
NewsDetailView ve NewsCardView bookmark butonu kullanır.

## 13. Offline Haberleri Görüntüleme Servisi

API Endpoint: GET /api/offline

### Görev
Offline kaydedilen haberleri listelemek.

### İşlevler
- isOfflineSaved true olan haberleri döndürür.

### Teknik Detaylar
- Backend `newsService.getOfflineNews` fonksiyonunu kullanır.

### Hata Yönetimi
- Liste boşsa mobil EmptyStateView gösterir.

### Mobil ekranla bağlantısı
OfflineNewsView içinde kullanılır.

## 14. Offline Haber Silme Servisi

API Endpoint: DELETE /api/offline/:newsId

RabbitMQ Event: news.offline_removed

### Görev
Bir haberi offline listesinden kaldırmak.

### İşlevler
- isOfflineSaved değerini false yapar.
- RabbitMQ event publish eder.

### Teknik Detaylar
- Backend mock data üzerinde state değiştirir.

### Hata Yönetimi
- Haber bulunamazsa 404 response döner.

### Mobil ekranla bağlantısı
OfflineNewsView ve NewsCardView bookmark butonu kullanır.

## 15. Health Check Servisi

API Endpoint: GET /health

### Görev
Backend, Redis ve RabbitMQ servis durumlarını göstermek.

### İşlevler
- API’nin çalıştığını gösterir.
- RabbitMQ durumunu enabled/disabled döndürür.
- Redis durumunu enabled/disabled döndürür.

### Teknik Detaylar
Response içinde `rabbitmq` ve `redis` servis bilgileri bulunur.

### Hata Yönetimi
Servislerden biri kapalı olsa bile backend health response döndürür.

### Mobil ekranla bağlantısı
Demo ve sistem kontrolü için kullanılır.

## 16. RabbitMQ Event Yönetimi

Kuyruk adı: `h_news_events`

### Kullanım amacı
Kullanıcı aksiyonlarını asenkron event olarak kuyruğa göndermek.

### Teknik Detaylar
- Paket: amqplib
- Docker servisi: rabbitmq
- Panel: http://localhost:15672
- Kullanıcı: `<RABBITMQ_USER>`
- Şifre: `<RABBITMQ_PASSWORD>`

Gerçek kullanıcı adı, şifre, token ve secret değerleri public repoya eklenmemiştir. Demo ortamında bu bilgiler local `.env` dosyası üzerinden tanımlanmalıdır.

### Hata Yönetimi
RabbitMQ kapalıysa API response dönmeye devam eder.

## 17. Redis Cache Yönetimi

### Kullanım amacı
Sık kullanılan haber GET endpointlerinde cache kullanmak.

### Teknik Detaylar
- Paket: redis
- TTL: 60 saniye
- Cache keyleri: news:all, news:popular, news:recent, news:category, news:search

### Hata Yönetimi
Redis kapalıysa backend mock/static data üzerinden cevap verir.

## 18. Docker ile Backend Çalıştırma

### Servisler
- backend
- redis
- rabbitmq

### Teknik Detaylar
Docker Compose tek komutla tüm backend servislerini başlatır.

```bash
docker compose up --build
```

## 19. CI/CD Backend Kontrolü

Workflow: `.github/workflows/backend-ci.yml`

### Görev
Backend kodunun kurulabilir, test edilebilir ve Docker ile build edilebilir olduğunu kontrol etmek.

### İşlevler
- npm ci
- npm test
- node --check
- docker compose config
- docker build
