# H-News Mobil ve Backend Mimarisi

## Genel Mimari

H-News; SwiftUI mobil uygulama, Node.js Express REST API, Redis cache, RabbitMQ event queue, Docker Compose ve GitHub Actions CI/CD bileşenlerinden oluşan katmanlı bir mobil haber uygulamasıdır.

```text
SwiftUI App
↓
NewsStore / ViewModels
↓
NewsAPIService / APIClient
↓
Node.js Express REST API
↓
Redis Cache
↓
RabbitMQ Event Queue
```

## SwiftUI MVVM Mimarisi

Mobil uygulama MVVM yaklaşımıyla geliştirilmiştir.

- View katmanı: HomeView, SearchView, FavoritesView, OfflineNewsView, ProfileView, NewsDetailView
- ViewModel / Store katmanı: NewsStore
- Model katmanı: News
- Service katmanı: APIClient, NewsAPIService, APIConfig

NewsStore ortak state yönetimini sağlar. SwiftUI ekranları `@EnvironmentObject` ile aynı NewsStore nesnesini kullanır.

## REST API Bağlantısı

Mobil uygulama backend ile URLSession ve async/await kullanarak haberleşir.

- APIConfig base URL değerini tutar.
- APIClient generic GET, POST, PATCH ve DELETE isteklerini yönetir.
- NewsAPIService haber, favori, offline, arama ve okundu işlemlerini endpoint bazında çağırır.

API başarısız olduğunda mobil uygulama mock fallback mekanizmasıyla çalışmaya devam eder.

## Backend Katmanları

Backend Node.js + Express ile geliştirilmiştir.

```text
backend/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── data/
│   │   └── newsData.js
│   ├── routes/
│   │   ├── newsRoutes.js
│   │   ├── favoriteRoutes.js
│   │   └── offlineRoutes.js
│   ├── controllers/
│   │   ├── newsController.js
│   │   ├── favoriteController.js
│   │   └── offlineController.js
│   ├── services/
│   │   ├── newsService.js
│   │   └── cacheService.js
│   └── queue/
│       └── rabbitmq.js
├── Dockerfile
├── package.json
└── README.md
```

### Backend görev ayrımı

- Routes: Endpoint yönlendirmeleri
- Controllers: Request/response ve event/cache yönetimi
- Services: Haber işlemleri ve cache işlemleri
- Data: Mock/static haber verileri
- Queue: RabbitMQ bağlantısı ve event publish işlemleri

## RabbitMQ Kullanımı

RabbitMQ kullanıcı aksiyonlarını event olarak kuyruğa göndermek için kullanılır.

Kuyruk adı:

```text
h_news_events
```

Örnek eventler:

- news.viewed
- news.searched
- news.favorited
- news.unfavorited
- news.offline_saved
- news.offline_removed
- news.read_marked
- news.unread_marked
- favorite.updated

RabbitMQ çalışmıyorsa backend çökmez, sadece event publish işlemi atlanır.

## Redis Kullanımı

Redis sık kullanılan GET endpointlerinde cache için kullanılır.

Cache kullanılan endpointler:

- GET /api/news
- GET /api/news?category=...
- GET /api/news/popular
- GET /api/news/recent
- GET /api/news/search?q=...

Redis çalışmıyorsa backend mock/static data üzerinden cevap vermeye devam eder.

## Docker Mimarisi

Docker Compose üç servisi başlatır:

- backend
- redis
- rabbitmq

Backend container içinde Redis ve RabbitMQ servis adlarıyla bağlanır:

```text
REDIS_URL=redis://redis:6379
RABBITMQ_URL=amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@rabbitmq:5672
```

Güvenlik notu: Gerçek kullanıcı adı, şifre, token ve secret değerleri public repoya eklenmemiştir. Demo ortamında bu bilgiler local `.env` dosyası üzerinden tanımlanmalıdır.
RabbitMQ kullanıcı adı ve şifresi public repoda paylaşılmaz. Bu değerler local `.env` dosyasında `RABBITMQ_USER` ve `RABBITMQ_PASSWORD` olarak tanımlanır.

## CI/CD Mimarisi

GitHub Actions workflow dosyası:

```text
.github/workflows/backend-ci.yml
```

Workflow adımları:

- Repository checkout
- Node.js 20 kurulumu
- npm ci
- npm test
- node --check syntax kontrolü
- docker compose config
- docker build

Bu yapı backend’in kurulabilir, test edilebilir ve Docker ile build edilebilir olduğunu gösterir.
