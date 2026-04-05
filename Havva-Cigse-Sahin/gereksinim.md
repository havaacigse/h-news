# Gereksinim Analizi

---

### 1. Haberleri Listeleme
**API Metodu:** GET /news  
**Açıklama:** Kullanıcı uygulama ana ekranında sistemde bulunan tüm güncel haberlere erişebilir.

### 2. Haberleri Filtreleme
**API Metodu:** GET /news?category={kategori}  
**Açıklama:** Kullanıcı haberleri seçtiği kategoriye göre görüntüleyebilir.

### 3. Haberin Detaylarını Görüntüleme
**API Metodu:** GET /news/{id}  
**Açıklama:** Kullanıcı seçtiği haberin başlık, içerik ve görsel gibi detay bilgilerini inceleyebilir.

### 4. Haberleri Okundu / Okunmadı Olarak İşaretleme
**API Metodu:** PUT /news/{id}/read  
**Açıklama:** Kullanıcı okuduğu haberlerin durumunu güncelleyerek takip edebilir.

### 5. Haberler Arasında Arama
**API Metodu:** GET /news/search?q={anahtarKelime}  
**Açıklama:** Kullanıcı istediği haberi başlık veya içerik bilgisine göre arayabilir.

### 6. Haberi Favorilere Ekleme
**API Metodu:** POST /favorites  
**Açıklama:** Kullanıcı daha sonra tekrar görüntülemek istediği haberleri favori listesine ekleyebilir.

### 7. Favori Haberleri Görüntüleme
**API Metodu:** GET /favorites  
**Açıklama:** Kullanıcı daha önce favorilere eklediği haberleri listeleyebilir.

### 8. Favorilerden Haberi Kaldırma
**API Metodu:** DELETE /favorites/{id}  
**Açıklama:** Kullanıcı favori listesinde bulunan bir haberi kaldırabilir.

### 9. Favori Haberlere Not veya Kategori Ekleme
**API Metodu:** PUT /favorites/{id}  
**Açıklama:** Kullanıcı favori haberlerini kişisel not veya etiketlerle düzenleyebilir.

### 10. Haberleri Yayınlanma Tarihine Göre Sıralama
**API Metodu:** GET /news?sort=date  
**Açıklama:** Kullanıcı haberleri en yeni veya en eski olacak şekilde sıralayabilir.

### 11. En Popüler Haberleri Görüntüleme
**API Metodu:** GET /news?sort=popular  
**Açıklama:** Kullanıcı sistemde en çok görüntülenen veya öne çıkan haberleri inceleyebilir.

### 12. Son Eklenen Haberleri Görüntüleme
**API Metodu:** GET /news?sort=recent  
**Açıklama:** Kullanıcı sisteme en son eklenen güncel haberlere erişebilir.

### 13. Offline Okumak İçin Haber Kaydetme
**API Metodu:** POST /offline-news  
**Açıklama:** Kullanıcı internet bağlantısı olmadan okuyabilmek için haberleri cihazına kaydedebilir.

### 14. Offline Haberleri Görüntüleme
**API Metodu:** GET /offline-news  
**Açıklama:** Kullanıcı daha önce kaydettiği offline haber listesini görüntüleyebilir.

### 15. Offline Haberi Silme
**API Metodu:** DELETE /offline-news/{id}  
**Açıklama:** Kullanıcı cihazına kaydettiği offline haberleri listeden kaldırabilir.
