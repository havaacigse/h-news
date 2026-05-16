# H-News Final Sunumu

## Proje Adı

H-News Mobil Haber Uygulaması

## Problem Tanımı

Kullanıcılar güncel haberleri mobil cihazlarından hızlıca takip etmek, haberlerde arama yapmak, ilgilendikleri haberleri favorilere eklemek ve bazı haberleri offline okumak istemektedir.

## Çözüm

H-News, SwiftUI ile geliştirilmiş mobil frontend ve Node.js Express ile geliştirilmiş REST API backend’den oluşur. Kullanıcı aksiyonları RabbitMQ ile event olarak yayınlanır, sık kullanılan haber endpointleri Redis ile cachelenir ve tüm backend servisleri Docker Compose ile başlatılır.

## Kullanılan Teknolojiler

- SwiftUI
- MVVM
- URLSession
- Node.js
- Express.js
- RabbitMQ
- Redis
- Docker Compose
- GitHub Actions

## Mobil Frontend

- Ana sayfada haber listeleme
- Kategori filtreleme
- Haber arama
- Haber detay ekranı
- Favoriler
- Favori not ve etiket
- Offline haberler
- Profil istatistikleri

## REST API Bağlantısı

Mobil uygulama URLSession ile backend REST API’ye bağlanır. API başarısız olursa mock fallback mekanizması devreye girer ve demo akışı bozulmaz.

## RabbitMQ

RabbitMQ kullanıcı aksiyonlarını event olarak yayınlamak için kullanılır.

Örnek eventler:

- news.viewed
- news.searched
- news.favorited
- news.offline_saved
- news.read_marked

Kuyruk adı:

```text
h_news_events
```

## Redis

Redis haber listeleme, arama, popüler haberler ve son eklenen haberler için cache katmanı olarak kullanılır.

Örnek cache keyleri:

- news:all
- news:popular
- news:recent
- news:search:<query>

## Docker

Docker Compose şu servisleri başlatır:

- backend
- redis
- rabbitmq

Komut:

```bash
docker compose up --build
```

## CI/CD

GitHub Actions backend için otomatik kontrol yapar:

- npm ci
- npm test
- node --check
- docker compose config
- docker build

## Demo Akışı

1. `docker compose up --build`
2. `/health` endpointinde redis ve rabbitmq enabled göster
3. RabbitMQ paneline local `.env` içinde tanımlanan kullanıcı adı ve şifre ile giriş yap
4. Mobil uygulamayı Xcode simulator’da aç
5. Haberleri listele
6. Arama yap
7. Favoriye ekle
8. Offline kaydet
9. Okundu işaretle
10. RabbitMQ queue’da event oluştuğunu göster
11. GitHub Actions workflow’u göster

## Güvenlik Notu

Gerçek kullanıcı adı, şifre, token ve secret değerleri public repoya eklenmemiştir. Demo ortamında bu bilgiler local `.env` dosyası üzerinden tanımlanmalıdır.

## Sonuç

H-News projesi mobil frontend, REST API bağlantısı, RabbitMQ, Redis, Docker ve CI/CD başlıklarını kapsayan, savunulabilir ve öğrenci seviyesine uygun tam bir yazılım mühendisliği final projesidir.
