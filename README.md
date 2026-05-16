# H-News

## Proje Hakkında

H-News, Yazılım Mühendisliği dersi final projesi için geliştirilen mobil haber uygulamasıdır. Proje; SwiftUI mobil uygulama, Node.js REST API, RabbitMQ event queue, Redis cache, Docker Compose ve GitHub Actions CI/CD bileşenlerinden oluşur.

## Proje Tanımı

Kullanıcılar H-News mobil uygulaması ile haberleri listeleyebilir, kategoriye göre filtreleyebilir, haberlerde arama yapabilir, haber detaylarını görüntüleyebilir, haberleri favorilere ekleyebilir, offline okumak için kaydedebilir ve okundu/okunmadı durumunu takip edebilir.

## Proje Kategorisi

Mobil haber uygulaması / içerik yönetimi / REST API destekli iOS uygulaması.

## Referans Uygulama

Referans olarak modern mobil haber uygulamalarındaki temel kullanıcı akışları alınmıştır: haber listeleme, detay görüntüleme, arama, favoriler, offline okuma ve kişisel durum takibi.

## Proje Linkleri

- Mobil uygulama: `h_news.xcodeproj`
- Backend API: [backend/README.md](backend/README.md)
- CI/CD workflow: `.github/workflows/backend-ci.yml`

## Proje Ekibi

- Geliştirici: Havva
- Ders: Yazılım Mühendisliği
- Proje adı: H-News

## Kullanılan Teknolojiler

- Swift
- SwiftUI
- MVVM
- URLSession
- Node.js
- Express.js
- RabbitMQ
- Redis
- Docker Compose
- GitHub Actions

## Final Puanlandırma Başlıklarına Göre Durum

| Başlık | Durum | Açıklama |
|---|---|---|
| Mobil FrontEnd | Tamamlandı | SwiftUI |
| REST API + UI Bağlantısı | Tamamlandı | URLSession + Express API |
| RabbitMQ / Kafka | Tamamlandı | RabbitMQ event queue |
| Redis / Memcache | Tamamlandı | Redis cache |
| Docker | Tamamlandı | docker-compose |
| CI/CD | Tamamlandı | GitHub Actions |
| Cep Telefonu | Demo için hazır | Xcode simulator / cihaz |
| Demo Gösterim | Hazır | Sunum.md akışı |

## Özellikler

- Haber listeleme
- Haber detay görüntüleme
- Kategori filtreleme
- Haber arama
- Yayın tarihine göre sıralama
- En popüler haberleri görüntüleme
- Son eklenen haberleri görüntüleme
- Favoriye ekleme ve favoriden kaldırma
- Favori notu ve etiketi ekleme
- Offline haber kaydetme ve silme
- Okundu/okunmadı işaretleme
- Profil istatistikleri
- REST API bağlantısı
- API başarısız olursa mock fallback
- RabbitMQ event publish
- Redis cache
- Docker Compose
- GitHub Actions CI/CD

## Dokümantasyon

- [MobilFrontEnd.md](MobilFrontEnd.md)
- [MobilBackEnd.md](MobilBackEnd.md)
- [MobilGereksinimAnalizi.md](MobilGereksinimAnalizi.md)
- [MobilMimari.md](MobilMimari.md)
- [MobilTestSenaryolari.md](MobilTestSenaryolari.md)
- [Sunum.md](Sunum.md)
- [backend/README.md](backend/README.md)

## Kurulum ve Çalıştırma

Backend bağımlılıklarını kurmak için:

```bash
cd backend
npm install
npm start
```

API adresi:

```text
http://localhost:3000
```

## Docker ile Çalıştırma

Proje kök klasöründe:

```bash
docker compose up --build
```

Servis adresleri:

```text
API: http://localhost:3000
Redis: localhost:6379
RabbitMQ: localhost:5672
RabbitMQ Panel: http://localhost:15672
RabbitMQ Username: hnews
RabbitMQ Password: hnews123
```

Health kontrolü:

```bash
curl http://localhost:3000/health
```

Beklenen servis durumu:

```json
{
  "success": true,
  "message": "H-News API is running",
  "services": {
    "rabbitmq": "enabled",
    "redis": "enabled"
  }
}
```

## Mobil Uygulamayı Çalıştırma

1. `h_news.xcodeproj` dosyasını Xcode ile aç.
2. Backend servislerini Docker Compose ile başlat.
3. Xcode simulator veya gerçek cihaz seç.
4. Uygulamayı çalıştır.
5. Mobil uygulama `http://localhost:3000/api` üzerinden REST API ile haber verilerini çeker.

## Demo Akışı

1. `docker compose up --build` komutunu çalıştır.
2. `/health` endpointinde Redis ve RabbitMQ servislerinin `enabled` olduğunu göster.
3. RabbitMQ paneline `hnews / hnews123` ile giriş yap.
4. Mobil uygulamayı Xcode simulator’da aç.
5. Haberleri listele.
6. Arama yap.
7. Favoriye ekle.
8. Offline kaydet.
9. Okundu işaretle.
10. RabbitMQ kuyruğunda event oluştuğunu göster.
11. GitHub Actions workflow dosyasını göster.

## CI/CD

Proje GitHub Actions ile temel backend CI kontrolü içerir.

Workflow dosyası:

```text
.github/workflows/backend-ci.yml
```

Workflow, `push` ve `pull_request` olduğunda otomatik çalışır. Backend bağımlılıklarını kurar, test komutunu çalıştırır, JavaScript syntax kontrolü yapar, Docker Compose dosyasını doğrular ve backend Docker image build kontrolü gerçekleştirir.
