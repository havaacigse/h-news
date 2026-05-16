# H-News

---

## Proje Hakkında

![gorsel](news.jpeg) 

**Proje Tanımı:**  
> H-News, kullanıcıların güncel haberleri web ve mobil platformlar üzerinden takip edebildiği bir haber uygulamasıdır. Kullanıcılar uygulama üzerinden haberleri listeleyebilir, kategoriye göre filtreleyebilir, haberler arasında arama yapabilir ve haber detaylarını görüntüleyebilir. Ayrıca haberleri favorilere ekleyebilir, favori haberlerine not veya etiket ekleyebilir, haberleri offline okumak için kaydedebilir ve okundu / okunmadı durumlarını yönetebilir.
>


**Proje Kategorisi:**  
> Haber Uygulaması / Mobil Haber Sistemi / Web ve Mobil Haber Platformu

**Referans Uygulama:**  
> [Google News](https://news.google.com)  

---

## Proje Linkleri

- **REST API Adresi:** [https://h-news.onrender.com](https://h-news.onrender.com)
- **Web Frontend Adresi:** [https://h-news-eight.vercel.app](https://h-news-eight.vercel.app)

---

## Proje Ekibi

**Grup Adı:**  
> Hava

**Ekip Üyeleri:**  
- Havva Çiğse Şahin

---

## Dokümantasyon

Proje dokümantasyonuna aşağıdaki linklerden erişebilirsiniz:

1. [Gereksinim Analizi](Gereksinim-Analizi.md)
2. [REST API Tasarımı](API-Tasarimi.md)
3. [REST API](Rest-API.md)
4. [Web Front-End](WebFrontEnd.md)
5. [Mobil Front-End](MobilFrontEnd.md)
6. [Mobil Backend](MobilBackEnd.md)
7. [Mobil Gereksinim Analizi](MobilGereksinimAnalizi.md)
8. [Mobil Mimari](MobilMimari.md)
9. [Mobil Test Senaryoları](MobilTestSenaryolari.md)
10. [Video Sunum](Sunum.md)
11. [Backend Dokümantasyonu](backend/README.md)

---

## Projeyi Klonlama ve Düzenleme

**ÖNEMLİ:** Aşağıdaki işlemleri proje sahibi veya proje üzerinde yetkili olan ekip üyesi yapmalıdır.

### Projeyi Klonlama

Projeyi yerel bilgisayarınıza klonlamak için:

```bash
git clone https://github.com/havaacigse/h-news.git
```

Proje klasörüne geçmek için:

```bash
cd h-news
```

---

### Backend’i Yerel Ortamda Çalıştırma

Backend klasörüne geçin:

```bash
cd backend
npm install
npm run dev
```

Backend varsayılan olarak şu adreste çalışır:

```text
http://localhost:3000
```

Test edilebilecek temel adresler:

```text
http://localhost:3000/health
http://localhost:3000/api/news
http://localhost:3000/api/news/popular
http://localhost:3000/api/news/recent
http://localhost:3000/api/news/search?q=teknoloji
```

---

### Web Frontend

Web frontend, vize aşamasında H-News projesinin web arayüzü olarak geliştirilmiştir.

Web arayüzünde temel olarak şu özellikler hedeflenmiştir:

- Haberleri listeleme
- Haber detaylarını görüntüleme
- Haberleri kategoriye göre filtreleme
- Haberlerde arama yapma
- Favori haberleri görüntüleme
- Offline okuma mantığını destekleyen yapı

Detaylı bilgi için:

[Web Front-End Dokümantasyonu](WebFrontEnd.md)

---

### Mobil Uygulamayı Çalıştırma

Mobil uygulama SwiftUI ile geliştirilmiştir.

Çalıştırmak için:

1. `h_news.xcodeproj` dosyasını Xcode ile açın.
2. iPhone simulator veya gerçek cihaz seçin.
3. Backend çalışıyorsa uygulama REST API üzerinden veri çeker.
4. Backend çalışmıyorsa uygulama mock fallback mekanizması ile temel akışı göstermeye devam eder.
5. Xcode üzerinden **Run** butonuna basın.

Mobil uygulama API base URL:

```text
http://localhost:3000/api
```

Mobil uygulamada bulunan temel ekranlar:

- Ana Sayfa
- Haber Detay Sayfası
- Arama Sayfası
- Favoriler Sayfası
- Offline Haberler Sayfası
- Profil / İstatistik Sayfası

Detaylı bilgi için:

[Mobil Front-End Dokümantasyonu](MobilFrontEnd.md)

---

### Docker ile Çalıştırma

Proje kök dizinindeyken Docker servislerini başlatmak için:

```bash
docker compose up -d --build
```

Çalışan servisleri görmek için:

```bash
docker compose ps
```

Servisleri durdurmak için:

```bash
docker compose down
```

Volume temizliği de yapmak gerekirse:

```bash
docker compose down -v
```

Docker ile çalışan servisler:

| Servis | Açıklama | Erişim |
|---|---|---|
| backend | Node.js Express REST API | `http://localhost:3000` |
| redis | Haber endpointleri için cache servisi | `localhost:6379` |
| rabbitmq | Event queue ve yönetim paneli | `http://localhost:15672` |

Backend container içinde bağlantılar environment variable üzerinden yapılır:

```text
REDIS_URL=redis://redis:6379
RABBITMQ_URL=amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@rabbitmq:5672
```

> RabbitMQ kullanıcı adı ve şifresi public repoda paylaşılmaz. Bu değerler local `.env` dosyasında tanımlanır.

---

### REST API

Backend tarafında geliştirilen REST API, mobil ve web arayüzlerinin haber verilerine erişmesini sağlar.

Temel endpointler:

| Metot | Endpoint | Açıklama |
|---|---|---|
| GET | `/health` | Backend, Redis ve RabbitMQ durumunu gösterir |
| GET | `/api/news` | Haberleri listeler |
| GET | `/api/news?category=Teknoloji` | Kategoriye göre haberleri filtreler |
| GET | `/api/news/:id` | Haber detayını getirir |
| GET | `/api/news/search?q=kelime` | Haberlerde arama yapar |
| GET | `/api/news/popular` | Popüler haberleri getirir |
| GET | `/api/news/recent` | Son eklenen haberleri getirir |
| PATCH | `/api/news/:id/read` | Haberi okundu olarak işaretler |
| PATCH | `/api/news/:id/unread` | Haberi okunmadı olarak işaretler |
| POST | `/api/favorites/:newsId` | Haberi favorilere ekler |
| GET | `/api/favorites` | Favori haberleri getirir |
| DELETE | `/api/favorites/:newsId` | Haberi favorilerden kaldırır |
| PATCH | `/api/favorites/:newsId` | Favori not / etiket günceller |
| POST | `/api/offline/:newsId` | Haberi offline kaydeder |
| GET | `/api/offline` | Offline haberleri getirir |
| DELETE | `/api/offline/:newsId` | Offline haberi siler |

Detaylı bilgi için:

[REST API Dokümantasyonu](Rest-API.md)  
[Backend Dokümantasyonu](backend/README.md)

---

### Redis Önbelleği

Redis, sık kullanılan haber GET endpointlerinde cache mekanizması olarak kullanılır.

Cache kullanılan endpointler:

- `GET /api/news`
- `GET /api/news?category=...`
- `GET /api/news/popular`
- `GET /api/news/recent`
- `GET /api/news/search?q=...`

Örnek cache key yapısı:

- `news:all`
- `news:category:<category>`
- `news:popular`
- `news:recent`
- `news:search:<query>`

Redis çalışmıyorsa backend çökmez; mock/static data üzerinden cevap vermeye devam eder.

---

### RabbitMQ

RabbitMQ, kullanıcı aksiyonlarını event olarak kuyruğa göndermek için kullanılır.

Kuyruk adı:

```text
h_news_events
```

Yayınlanan örnek eventler:

- `news.viewed`
- `news.searched`
- `news.favorited`
- `news.unfavorited`
- `news.offline_saved`
- `news.offline_removed`
- `news.read_marked`
- `news.unread_marked`
- `favorite.updated`

RabbitMQ çalışmıyorsa backend çökmez; event publish işlemi atlanır ve API response dönmeye devam eder.

---

### CI/CD

GitHub Actions workflow dosyası:

```text
.github/workflows/backend-ci.yml
```

Workflow şu kontrolleri yapar:

1. Repository checkout
2. Node.js 20 kurulumu
3. Backend dependency install
4. `npm test`
5. `node --check` ile syntax kontrolü
6. `docker compose config`
7. Backend Docker image build kontrolü

Bu workflow `push` ve `pull_request` durumlarında otomatik çalışır.

---

### Final Kapsamı

Bu proje final aşamasında aşağıdaki başlıkları kapsayacak şekilde geliştirilmiştir:

1. Mobil FrontEnd
2. REST API + UI Bağlantısı
3. RabbitMQ / Kafka
4. Redis / Memcache
5. Docker
6. CI/CD
7. Cep Telefonu / Simulator Demo
8. Demo Gösterim

Detaylı teknik açıklamalar ilgili dokümantasyon dosyalarında yer almaktadır.

---

### Temel Özellikler

1. Haberleri listeler.
2. Haberleri filtreler.
3. Haberin detaylarını görüntüler.
4. Haberleri okundu / okunmadı olarak işaretler.
5. Haberler arasında arama yapar.
6. Haberi favorilere ekler.
7. Favori haberlerini görüntüler.
8. Favorilerden haberi kaldırır.
9. Favori haberlere not veya kategori ekler.
10. Haberleri yayınlanma tarihine göre sıralar.
11. En popüler haberleri görüntüler.
12. Son eklenen haberleri görüntüler.
13. Offline okumak için haber kaydeder.
14. Offline haberleri görüntüler.
15. Offline haberi siler.

---

### Demo Akışı

Final demo akışı için önerilen sıra:

1. `docker compose up -d --build` ile servisleri başlat.
2. `/health` endpointinde Redis ve RabbitMQ durumunu göster.
3. RabbitMQ paneline giriş yap.
4. Xcode simulator’da mobil uygulamayı aç.
5. Ana sayfada haberlerin listelendiğini göster.
6. Kategori filtreleme yap.
7. Haber araması yap.
8. Haber detayına gir.
9. Haberi favoriye ekle ve Favoriler ekranında göster.
10. Favori habere not / etiket ekle.
11. Haberi offline kaydet ve Offline ekranında göster.
12. Haberi okundu / okunmadı işaretle.
13. RabbitMQ kuyruğunda event oluştuğunu göster.
14. GitHub Actions CI/CD workflow’unu göster.

Detaylı demo akışı için:

[Video Sunum / Sunum Dokümantasyonu](Sunum.md)

---

### Projeyi Düzenleme

Projede yapılan temel geliştirmeler:

1. **Web Frontend**
   - Vize aşamasında haber uygulamasının web arayüzü hazırlanmıştır.

2. **REST API**
   - Haber, favori, offline ve okundu / okunmadı işlemleri için backend servisleri hazırlanmıştır.

3. **Mobil Frontend**
   - SwiftUI ile iOS mobil uygulama geliştirilmiştir.

4. **REST API + UI Bağlantısı**
   - Mobil uygulama URLSession ile backend REST API’ye bağlanmıştır.

5. **RabbitMQ**
   - Kullanıcı aksiyonları event olarak RabbitMQ kuyruğuna gönderilmektedir.

6. **Redis**
   - Sık kullanılan haber endpointlerinde cache mekanizması kullanılmaktadır.

7. **Docker**
   - Backend, Redis ve RabbitMQ servisleri Docker Compose ile tek komutla çalıştırılabilir.

8. **CI/CD**
   - GitHub Actions ile backend install, test, syntax check ve Docker build kontrolü yapılmaktadır.

---

### Değişiklikleri Kaydetme

Projede değişiklik yaptıktan sonra:

```bash
git add .
git commit -m "Proje güncellendi"
git push origin main
```

---

### Notlar

- Public repoya gerçek kullanıcı adı, şifre, token veya secret değerleri eklenmemelidir.
- `.env` ve `backend/.env` dosyaları GitHub’a gönderilmemelidir.
- Docker kullanmadan önce Docker Desktop çalışır durumda olmalıdır.
- RabbitMQ ve Redis servisleri Docker Compose ile ayağa kaldırılabilir.
- Backend API başarısız olduğunda mobil uygulama mock fallback mekanizması ile çalışmaya devam eder.
- Final demo akışı için `Sunum.md` dosyası takip edilebilir.
