# Video Sunum

## Sunum Videosu
**API Test Videosu:** [H-News REST API Test](https://youtu.be/OeKdMS0eJAo)

**Frontend Test Videosu:** [H-News Frontend Test](https://youtu.be/5EFnN_NnKZs)

---

## Sunum Yapısı

### 1. Açılış Konuşması
"Merhaba, ben Havva Çiğse Şahin. Süleyman Demirel Üniversitesi Bilgisayar Mühendisliği öğrencisiyim. H-News projesini geliştirdim. Bu proje kullanıcıların güncel haberlere kolayca erişebileceği, favori haberlerini kaydedebileceği ve offline okuyabileceği modern bir haber uygulamasıdır."

---

**B) Gereksinim Sunumu**

1. Haberleri Listeleme
   - API: `GET /news`
   - Demo: Ana sayfada tüm haberlerin listelenmesi

2. Haberleri Filtreleme
   - API: `GET /news?category={kategori}`
   - Demo: Kategori seçerek filtreleme

3. Haberin Detaylarını Görüntüleme
   - API: `GET /news/{id}`
   - Demo: Habere tıklayarak detay modalı

4. Haberleri Okundu/Okunmadı İşaretleme
   - API: `PUT /news/{id}/read`
   - Demo: Okundu butonu ve görsel değişim

5. Haberler Arasında Arama
   - API: `GET /news/search?q={kelime}`
   - Demo: Arama kutusuna yazarak sonuçlar

6. Haberi Favorilere Ekleme
   - API: `POST /favorites`
   - Demo: Favori butonu ile ekleme

7. Favori Haberleri Görüntüleme
   - API: `GET /favorites`
   - Demo: Favoriler sayfası

8. Favorilerden Haberi Kaldırma
   - API: `DELETE /favorites/{id}`
   - Demo: Favoriden çıkarma

9. Favori Haberlere Not veya Kategori Ekleme
   - API: `PUT /favorites/{id}`
   - Demo: Not ve etiket ekleme

10. Haberleri Tarihe Göre Sıralama
    - API: `GET /news?sort=date`
    - Demo: Tarihe göre sıralama butonu

11. En Popüler Haberleri Görüntüleme
    - API: `GET /news?sort=popular`
    - Demo: Popüler sıralama

12. Son Eklenen Haberleri Görüntüleme
    - API: `GET /news?sort=recent`
    - Demo: Son eklenen sıralama

13. Offline Okumak İçin Haber Kaydetme
    - API: `POST /offline-news`
    - Demo: Offline kaydet butonu

14. Offline Haberleri Görüntüleme
    - API: `GET /offline-news`
    - Demo: Offline haberler sayfası

15. Offline Haberi Silme
    - API: `DELETE /offline-news/{id}`
    - Demo: Offline silme

---

### 3. Kapanış Konuşması

"H-News projemi tamamladım. 15 gereksinimin tamamını başarıyla geliştirdim. Backend Render'da, Frontend Vercel'de canlı olarak çalışmaktadır. Teşekkürler!"

---

## Sunum Hazırlık Kontrol Listesi

- Tüm gereksinimler çalışır durumda 
- Backend canlı: https://h-news.onrender.com 
- Frontend canlı: https://h-news-eight.vercel.app 
- Postman koleksiyonu hazır 
- Demo senaryoları hazırlandı 
