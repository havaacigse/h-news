# H-News Mobil Gereksinim Analizi

## Temel Gereksinimler

| No | Gereksinim | Mobil Ekran | Backend Endpoint | Durum |
|---|---|---|---|---|
| 1 | Haberleri listeler. | Ana Sayfa | GET /api/news | Tamamlandı |
| 2 | Haberleri filtreler. | Ana Sayfa / Kategori Alanı | GET /api/news?category=... | Tamamlandı |
| 3 | Haberin detaylarını görüntüler. | Haber Detay | GET /api/news/:id | Tamamlandı |
| 4 | Haberleri okundu / okunmadı olarak işaretler. | Haber Detay | PATCH /api/news/:id/read, PATCH /api/news/:id/unread | Tamamlandı |
| 5 | Haberler arasında arama yapar. | Arama | GET /api/news/search?q=... | Tamamlandı |
| 6 | Haberi favorilere ekler. | Haber Kartı / Haber Detay | POST /api/favorites/:newsId | Tamamlandı |
| 7 | Favori haberlerini görüntüler. | Favoriler | GET /api/favorites | Tamamlandı |
| 8 | Favorilerden haberi kaldırır. | Favoriler / Haber Kartı | DELETE /api/favorites/:newsId | Tamamlandı |
| 9 | Favori haberlere not veya kategori ekler. | Favoriler | PATCH /api/favorites/:newsId | Tamamlandı |
| 10 | Haberleri yayınlanma tarihine göre sıralar. | Ana Sayfa | GET /api/news/recent | Tamamlandı |
| 11 | En popüler haberleri görüntüler. | Ana Sayfa | GET /api/news/popular | Tamamlandı |
| 12 | Son eklenen haberleri görüntüler. | Ana Sayfa | GET /api/news/recent | Tamamlandı |
| 13 | Offline okumak için haber kaydeder. | Haber Kartı / Haber Detay | POST /api/offline/:newsId | Tamamlandı |
| 14 | Offline haberleri görüntüler. | Offline | GET /api/offline | Tamamlandı |
| 15 | Offline haberi siler. | Offline / Haber Kartı | DELETE /api/offline/:newsId | Tamamlandı |

## Ek Gereksinimler

| No | Ek Gereksinim | Açıklama | Durum |
|---|---|---|---|
| 1 | RabbitMQ event publish | Kullanıcı aksiyonları `h_news_events` kuyruğuna gönderilir. | Tamamlandı |
| 2 | Redis cache | Haber listesi, kategori, arama, popüler ve son haber endpointlerinde cache kullanılır. | Tamamlandı |
| 3 | Docker Compose | backend, redis ve rabbitmq tek komutla başlatılır. | Tamamlandı |
| 4 | GitHub Actions CI/CD | Backend install, test, syntax check ve Docker build kontrolü yapılır. | Tamamlandı |
| 5 | API fallback mekanizması | API başarısız olursa mobil uygulama mock/local state ile devam eder. | Tamamlandı |
| 6 | Profil istatistikleri | Toplam, favori, offline ve okunan haber sayıları gösterilir. | Tamamlandı |
