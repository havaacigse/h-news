# H-News Backend

H-News mobil uygulaması için hazırlanmış sade Node.js + Express REST API iskeletidir. Bu sürümde veritabanı, Redis ve Docker entegrasyonu yoktur. Haber verileri backend içinde mock/static olarak tutulur. RabbitMQ, kullanıcı aksiyonlarını event olarak kuyruğa göndermek için kullanılır.

## Kurulum

```bash
cd backend
npm install
```

## Çalıştırma

```bash
npm start
```

Geliştirme modunda çalıştırmak için:

```bash
npm run dev
```

Varsayılan adres:

```text
http://localhost:3000
```

RabbitMQ varsayılan adresi:

```text
amqp://<username>:<password>@localhost:5672
```

RabbitMQ çalışmıyorsa backend kapanmaz. API cevapları dönmeye devam eder, sadece event publish işlemleri console warning olarak atlanır.

Redis varsayılan adresi:

```text
redis://localhost:6379
```

Redis çalışmıyorsa backend kapanmaz. Haber GET endpointleri mock/static data üzerinden cevap vermeye devam eder.

## Test

```bash
npm test
```

## Endpoint Listesi

### Health

```text
GET /health
```

### News

```text
GET /api/news
GET /api/news?category=Teknoloji
GET /api/news/:id
GET /api/news/search?q=kelime
GET /api/news/popular
GET /api/news/recent
PATCH /api/news/:id/read
PATCH /api/news/:id/unread
```

### Favorites

```text
POST /api/favorites/:newsId
GET /api/favorites
DELETE /api/favorites/:newsId
PATCH /api/favorites/:newsId
```

`PATCH /api/favorites/:newsId` için örnek body:

```json
{
  "note": "Ders sunumunda kullanılabilir",
  "tag": "Ders İçin"
}
```

### Offline

```text
POST /api/offline/:newsId
GET /api/offline
DELETE /api/offline/:newsId
```

## Örnek İstekler

Tüm haberleri listeleme:

```bash
curl http://localhost:3000/api/news
```

Kategoriye göre filtreleme:

```bash
curl "http://localhost:3000/api/news?category=Teknoloji"
```

Haber arama:

```bash
curl "http://localhost:3000/api/news/search?q=spor"
```

Favoriye ekleme:

```bash
curl -X POST http://localhost:3000/api/favorites/1
```

Favori notu ve etiketi güncelleme:

```bash
curl -X PATCH http://localhost:3000/api/favorites/1 \
  -H "Content-Type: application/json" \
  -d '{"note":"Önemli haber", "tag":"Önemli"}'
```

Offline kaydetme:

```bash
curl -X POST http://localhost:3000/api/offline/1
```

Okundu işaretleme:

```bash
curl -X PATCH http://localhost:3000/api/news/1/read
```

## Response Formatı

Başarılı cevap:

```json
{
  "success": true,
  "data": []
}
```

Hata cevabı:

```json
{
  "success": false,
  "message": "News not found"
}
```

## RabbitMQ Kullanımı

RabbitMQ, mobil uygulamadan gelen kullanıcı davranışlarını analiz, loglama veya öneri sistemi için event olarak kaydetmeye hazır hale getirir. Eventler `h_news_events` kuyruğuna gönderilir.

`.env` ile ayarlanabilen değerler:

```text
RABBITMQ_USER=your_rabbitmq_user
RABBITMQ_PASSWORD=your_rabbitmq_password
RABBITMQ_URL=amqp://your_rabbitmq_user:your_rabbitmq_password@localhost:5672
RABBITMQ_QUEUE=h_news_events
```

Publish edilen eventler:

```text
news.viewed
news.searched
news.read_marked
news.unread_marked
news.favorited
news.unfavorited
favorite.updated
news.offline_saved
news.offline_removed
```

Event formatı:

```json
{
  "eventType": "news.viewed",
  "payload": {
    "newsId": "1",
    "timestamp": "2026-05-16T09:00:00.000Z"
  },
  "timestamp": "2026-05-16T09:00:00.000Z"
}
```

Health endpoint RabbitMQ durumunu gösterir:

```bash
curl http://localhost:3000/health
```

Örnek cevap:

```json
{
  "success": true,
  "message": "H-News API is running",
  "services": {
    "rabbitmq": "enabled"
  }
}
```

Demo sırasında RabbitMQ eventlerini göstermek için RabbitMQ management paneli kullanılabilir. Panel açıkken `h_news_events` kuyruğu izlenir ve mobil uygulamadan haber detayı, arama, favori veya offline işlemi yapılır.

## Redis Cache Kullanımı

Redis, sık kullanılan haber listeleme endpointlerinin daha hızlı cevap vermesi için cache katmanı olarak kullanılır. Cache süresi varsayılan olarak 60 saniyedir.

`.env` ile ayarlanabilen değerler:

```text
REDIS_URL=redis://localhost:6379
CACHE_TTL_SECONDS=60
```

Cache kullanılan endpointler:

```text
GET /api/news
GET /api/news?category=Teknoloji
GET /api/news/popular
GET /api/news/recent
GET /api/news/search?q=kelime
```

Cache key yapısı:

```text
news:all
news:category:<category>
news:popular
news:recent
news:search:<query>
```

Favori, offline ve okundu/okunmadı işlemlerinden sonra temel haber cacheleri temizlenir:

```text
news:all
news:popular
news:recent
```

Kategori ve arama cacheleri kısa TTL ile yenilenir. Bu yaklaşım öğrenci projesi için sade, açıklanabilir ve demo açısından yeterlidir.

Health endpoint Redis durumunu da gösterir:

```json
{
  "success": true,
  "message": "H-News API is running",
  "services": {
    "rabbitmq": "disabled",
    "redis": "disabled"
  }
}
```

Demo sırasında Redis cache kullanımı şu şekilde anlatılabilir: İlk `GET /api/news` isteği mock data üzerinden gelir ve Redis'e yazılır. Sonraki isteklerde Redis bağlıysa aynı veri cache üzerinden okunur. Redis kapalıysa backend normal JSON cevabı döndürmeye devam eder.

## Docker ile Çalıştırma

Proje kök klasöründen çalıştırılır:

```bash
docker compose up --build
```

Docker Compose şu servisleri başlatır:

```text
backend
redis
rabbitmq
```

Servis adresleri:

```text
API: http://localhost:3000
Redis: localhost:6379
RabbitMQ: localhost:5672
RabbitMQ Panel: http://localhost:15672
```

RabbitMQ management paneli için varsayılan bilgiler:

```text
Kullanıcı adı: <RABBITMQ_USER>
Şifre: <RABBITMQ_PASSWORD>
```

Demo ortamında RabbitMQ için varsayılan kullanıcı yerine local `.env` dosyasında tanımlanan özel kullanıcı kullanılır. Gerçek kullanıcı adı, şifre, token ve secret değerleri public repoya eklenmemiştir.

Backend container içinde Redis ve RabbitMQ bağlantıları servis adlarıyla yapılır:

```text
REDIS_URL=redis://redis:6379
RABBITMQ_URL=amqp://<username>:<password>@rabbitmq:5672
```

Health kontrolü:

```bash
curl http://localhost:3000/health
```

## CI/CD

Backend için GitHub Actions workflow'u proje kökünde bulunur:

```text
.github/workflows/backend-ci.yml
```

Workflow `push` ve `pull_request` olaylarında çalışır. Backend bağımlılıklarını kurar, `npm test` çalıştırır, temel JavaScript dosyaları için `node --check` ile syntax kontrolü yapar ve backend Docker image build adımını doğrular.
