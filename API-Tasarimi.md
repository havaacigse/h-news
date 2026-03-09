# H-News REST API Metotları

**API Test Videosu:** [Proje bitiminde eklenecek]

---

## 1. Haberleri Listeleme
- **Endpoint:** `GET /news`
- **Authentication:** Gerekli değil
- **Response:** `200 OK` - Sistemde bulunan tüm haberler başarıyla listelendi

---

## 2. Haber Detayı Görüntüleme
- **Endpoint:** `GET /news/{newsId}`
- **Path Parameters:**
  - `newsId` (string, required) - Görüntülenecek haberin ID değeri
- **Authentication:** Gerekli değil
- **Response:** `200 OK` - Haber detay bilgileri başarıyla getirildi

---

## 3. Haber Arama
- **Endpoint:** `GET /news/search`
- **Query Parameters:**
  - `query` (string, required) - Aranacak anahtar kelime
- **Authentication:** Gerekli değil
- **Response:** `200 OK` - Arama sonuçları başarıyla listelendi

---

## 4. Kategoriye Göre Haber Filtreleme
- **Endpoint:** `GET /news`
- **Query Parameters:**
  - `category` (string, required) - Filtrelenecek haber kategorisi
- **Authentication:** Gerekli değil
- **Response:** `200 OK` - Seçilen kategoriye ait haberler başarıyla listelendi

---

## 5. Popüler Haberleri Görüntüleme
- **Endpoint:** `GET /news/popular`
- **Authentication:** Gerekli değil
- **Response:** `200 OK` - En popüler haberler başarıyla getirildi

---

## 6. Son Eklenen Haberleri Görüntüleme
- **Endpoint:** `GET /news/latest`
- **Authentication:** Gerekli değil
- **Response:** `200 OK` - En son eklenen haberler başarıyla listelendi

---

## 7. Haberi Okundu Olarak İşaretleme
- **Endpoint:** `PUT /news/{newsId}/read`
- **Path Parameters:**
  - `newsId` (string, required) - Okundu olarak işaretlenecek haber ID'si
- **Authentication:** Kullanıcı oturumu gerekli
- **Response:** `200 OK` - Haber başarıyla okundu olarak işaretlendi

---

# Favori Haber İşlemleri

## 8. Haberi Favorilere Ekleme
- **Endpoint:** `POST /favorites`
- **Request Body:**
```json
{
  "newsId": "news_12345"
}
```
- **Authentication:** Kullanıcı oturumu gerekli
- **Response:** `201 Created` - Haber favori listesine başarıyla eklendi

---

## 9. Favori Haberleri Görüntüleme
- **Endpoint:** `GET /favorites`
- **Authentication:** Kullanıcı oturumu gerekli
- **Response:** `200 OK` - Kullanıcının favori haberleri başarıyla listelendi

---

## 10. Favorilerden Haber Silme
- **Endpoint:** `DELETE /favorites/{newsId}`
- **Path Parameters:**
  - `newsId` (string, required) - Favorilerden kaldırılacak haber ID'si
- **Authentication:** Kullanıcı oturumu gerekli
- **Response:** `204 No Content` - Haber favorilerden başarıyla kaldırıldı

---

## 11. Favori Habere Not veya Etiket Ekleme
- **Endpoint:** `PUT /favorites/{newsId}`
- **Path Parameters:**
  - `newsId` (string, required) - Güncellenecek favori haber ID'si
- **Request Body:**
```json
{
  "note": "Bu haberi daha sonra tekrar incele",
  "tag": "Önemli"
}
```
- **Authentication:** Kullanıcı oturumu gerekli
- **Response:** `200 OK` - Favori haber bilgisi başarıyla güncellendi

---

# Offline Haber İşlemleri

## 12. Haberi Offline Kaydetme
- **Endpoint:** `POST /offline`
- **Request Body:**
```json
{
  "newsId": "news_12345"
}
```
- **Authentication:** Kullanıcı oturumu gerekli
- **Response:** `201 Created` - Haber offline okumak için başarıyla kaydedildi

---

## 13. Offline Haberleri Listeleme
- **Endpoint:** `GET /offline`
- **Authentication:** Kullanıcı oturumu gerekli
- **Response:** `200 OK` - Offline kaydedilmiş haberler başarıyla getirildi

---

## 14. Offline Haberi Silme
- **Endpoint:** `DELETE /offline/{newsId}`
- **Path Parameters:**
  - `newsId` (string, required) - Silinecek offline haber ID'si
- **Authentication:** Kullanıcı oturumu gerekli
- **Response:** `204 No Content` - Offline haber başarıyla silindi
