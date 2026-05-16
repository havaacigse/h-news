# H-News Mobil Test Senaryoları

| Test No | Test Adı | Adımlar | Beklenen Sonuç | Durum |
|---|---|---|---|---|
| 1 | Docker servislerini başlatma | `docker compose up --build` çalıştırılır. | backend, redis ve rabbitmq servisleri başlar. | Tamamlandı |
| 2 | Health endpoint kontrolü | `GET /health` isteği atılır. | API çalışır, redis ve rabbitmq durumu görünür. | Tamamlandı |
| 3 | Mobil uygulamada haber listeleme | Xcode simulator’da uygulama açılır. | Ana sayfada haber kartları listelenir. | Tamamlandı |
| 4 | Kategori filtreleme | Ana sayfada kategori chip’i seçilir. | Liste seçilen kategoriye göre güncellenir. | Tamamlandı |
| 5 | Haber arama | Arama sekmesine kelime yazılır. | Eşleşen haberler listelenir. | Tamamlandı |
| 6 | Haber detay görüntüleme | Haber kartına basılır. | Haber detay ekranı açılır. | Tamamlandı |
| 7 | Favoriye ekleme | Karttaki kalp veya detaydaki favori butonuna basılır. | Haber favorilere eklenir. | Tamamlandı |
| 8 | Favoriden kaldırma | Favoriler ekranında kalp veya kaldır butonuna basılır. | Haber favoriler listesinden çıkar. | Tamamlandı |
| 9 | Favori not/etiket ekleme | Favoriler ekranında Not / Etiket Ekle seçilir. | Not ve etiket kaydedilip görüntülenir. | Tamamlandı |
| 10 | Offline haber kaydetme | Bookmark butonuna basılır. | Haber offline listesine eklenir. | Tamamlandı |
| 11 | Offline haber silme | Offline ekranında bookmark veya sil butonuna basılır. | Haber offline listesinden çıkar. | Tamamlandı |
| 12 | Okundu/okunmadı işaretleme | Haber detayında okundu butonuna basılır. | Haber durumu güncellenir. | Tamamlandı |
| 13 | Redis enabled kontrolü | Docker çalışırken `/health` kontrol edilir. | `redis: enabled` görünür. | Tamamlandı |
| 14 | RabbitMQ enabled kontrolü | Docker çalışırken `/health` kontrol edilir. | `rabbitmq: enabled` görünür. | Tamamlandı |
| 15 | RabbitMQ queue event kontrolü | RabbitMQ panelinde kuyruk izlenir, mobilde aksiyon yapılır. | `h_news_events` kuyruğunda event oluşur. | Tamamlandı |
| 16 | GitHub Actions CI/CD kontrolü | GitHub Actions workflow açılır veya push yapılır. | Backend CI adımları başarılı çalışır. | Tamamlandı |

## Güvenlik Notu

Gerçek kullanıcı adı, şifre, token ve secret değerleri public repoya eklenmemiştir. Demo ortamında bu bilgiler local `.env` dosyası üzerinden tanımlanmalıdır.
