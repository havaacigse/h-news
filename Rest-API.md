# H-News REST API Metotları

**API Domain Adresi:** https://h-news.onrender.com

**API Test Videosu:** [Proje bitiminde eklenecek]

## 1. Haberleri Listeleme
- **Endpoint:** `GET /news`
- **Response:** `200 OK` - Sistemdeki tüm güncel haberler listelendi

## 2. Haberleri Filtreleme
- **Endpoint:** `GET /news?category={kategori}`
- **Query Parameters:**
  - `category` (string, required) - Filtrelemek için kategori
- **Response:** `200 OK` - Seçilen kategoriye ait haberler listelendi

## 3. Haberin Detaylarını Görüntüleme
- **Endpoint:** `GET /news/{id}`
- **Path Parameters:**
  - `id` (string, required) - Haber ID'si
- **Response:** `200 OK` - Haberin başlık, içerik ve görselleri getirildi

## 4. Haberleri Okundu / Okunmadı Olarak İşaretleme
- **Endpoint:** `PUT /news/{id}/read`
- **Path Parameters:**
  - `id` (string, required) - Haber ID'si
- **Authentication:** Bearer Token gerekli
- **Request Body:**
  ```json
  {
    "read": true
  }
  ```
- **Response:** `200 OK` - Haber okundu/okunmadı durumu güncellendi

## 5. Haberler Arasında Arama
- **Endpoint:** `GET /news/search?q={anahtarKelime}`
- **Query Parameters:**
  - `q` (string, required) - Aranacak kelime
- **Response:** `200 OK` - Arama sonuçları listelendi

## 6. Haberi Favorilere Ekleme
- **Endpoint:** `POST /favorites`
- **Authentication:** Bearer Token gerekli
- **Request Body:**
  ```json
  {
    "newsId": "haber_12345"
  }
  ```
- **Response:** `201 Created` - Haber favorilere eklendi

## 7. Favori Haberleri Görüntüleme
- **Endpoint:** `GET /favorites`
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - Favorilere eklenen haberler listelendi

## 8. Favorilerden Haberi Kaldırma
- **Endpoint:** `DELETE /favorites/{id}`
- **Path Parameters:**
  - `id` (string, required) - Favori haber ID'si
- **Authentication:** Bearer Token gerekli
- **Response:** `204 No Content` - Favori haber kaldırıldı

## 9. Favori Haberlere Not veya Kategori Ekleme
- **Endpoint:** `PUT /favorites/{id}`
- **Path Parameters:**
  - `id` (string, required) - Favori haber ID'si
- **Authentication:** Bearer Token gerekli
- **Request Body:**
  ```json
  {
    "note": "Önemli haber",
    "tag": "Teknoloji"
  }
  ```
- **Response:** `200 OK` - Favori haber güncellendi

## 10. Haberleri Yayınlanma Tarihine Göre Sıralama
- **Endpoint:** `GET /news?sort=date`
- **Query Parameters:**
  - `sort` (string, required) - "date" ile sıralama
- **Response:** `200 OK` - Haberler yayınlanma tarihine göre sıralandı

## 11. En Popüler Haberleri Görüntüleme
- **Endpoint:** `GET /news?sort=popular`
- **Query Parameters:**
  - `sort` (string, required) - "popular" ile sıralama
- **Response:** `200 OK` - En popüler haberler listelendi

## 12. Son Eklenen Haberleri Görüntüleme
- **Endpoint:** `GET /news?sort=recent`
- **Query Parameters:**
  - `sort` (string, required) - "recent" ile sıralama
- **Response:** `200 OK` - Son eklenen haberler listelendi

## 13. Offline Okumak İçin Haber Kaydetme
- **Endpoint:** `POST /offline-news`
- **Authentication:** Bearer Token gerekli
- **Request Body:**
  ```json
  {
    "newsId": "haber_12345"
  }
  ```
- **Response:** `201 Created` - Haber offline olarak kaydedildi

## 14. Offline Haberleri Görüntüleme
- **Endpoint:** `GET /offline-news`
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - Kaydedilen offline haberler listelendi

## 15. Offline Haberi Silme
- **Endpoint:** `DELETE /offline-news/{id}`
- **Path Parameters:**
  - `id` (string, required) - Offline haber ID'si
- **Authentication:** Bearer Token gerekli
- **Response:** `204 No Content` - Offline haber silindi
