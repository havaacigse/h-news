# Havva Çiğse Şahin - Web Frontend Görevleri

## YouTube Video
[Video Linki](VIDEO_LINKI_BURAYA)

---

## Gereksinimler

### 1. Haberleri Listeleme
- API Endpoint: `GET /news`
- Görev: Ana sayfada tüm haberlerin listelenmesi
- UI Bileşenleri:
  - Haber kartları listesi
  - Kategori sidebar
  - Yükleniyor animasyonu
- Kullanıcı Deneyimi:
  - Haberler kart şeklinde düzenli listelenir
  - Boş liste durumunda bilgilendirme mesajı gösterilir
- Teknik Detaylar:
  - Framework: React
  - HTTP Client: Fetch API
  - State: useState, useCallback

### 2. Haberleri Filtreleme
- API Endpoint: `GET /news?category={kategori}`
- Görev: Kategoriye göre haber filtreleme
- UI Bileşenleri:
  - Kategori butonları (Teknoloji, Dünya, Ekonomi, Spor, Sağlık, Bilim)
  - Aktif kategori vurgusu
- Kullanıcı Deneyimi:
  - Seçili kategori görsel olarak belirtilir
  - Kategori değişince liste güncellenir
- Teknik Detaylar:
  - Framework: React
  - State: activeCategory state

### 3. Haberin Detaylarını Görüntüleme
- API Endpoint: `GET /news/{id}`
- Görev: Haber detay modalı tasarımı ve implementasyonu
- UI Bileşenleri:
  - Modal pencere
  - Haber görseli
  - Başlık, içerik, tarih
  - Kapatma butonu
- Kullanıcı Deneyimi:
  - Habere tıklayınca modal açılır
  - Modal dışına tıklayınca kapanır
- Teknik Detaylar:
  - Framework: React
  - State: selectedNews state

### 4. Haberleri Okundu / Okunmadı Olarak İşaretleme
- API Endpoint: `PUT /news/{id}/read`
- Görev: Okundu işaretleme butonu ve görsel geri bildirim
- UI Bileşenleri:
  - Okundu butonu
  - Okunmuş haber kart stili (soluk renk)
- Kullanıcı Deneyimi:
  - Okundu işaretlenen haber görsel olarak değişir
  - Toast bildirimi gösterilir
- Teknik Detaylar:
  - Framework: React
  - State: readIds state

### 5. Haberler Arasında Arama
- API Endpoint: `GET /news/search?q={anahtarKelime}`
- Görev: Arama kutusu tasarımı ve implementasyonu
- UI Bileşenleri:
  - Arama input alanı (header'da)
  - Yükleniyor animasyonu
- Kullanıcı Deneyimi:
  - Yazarken anlık arama yapılır
  - Sonuç bulunamazsa bilgi mesajı gösterilir
- Teknik Detaylar:
  - Framework: React
  - State: searchQuery state

### 6. Haberi Favorilere Ekleme
- API Endpoint: `POST /favorites`
- Görev: Favori ekleme butonu tasarımı ve implementasyonu
- UI Bileşenleri:
  - Favori butonu 
  - Aktif/pasif durum stili
- Kullanıcı Deneyimi:
  - Favoriye eklenince buton değişir
  - Toast bildirimi gösterilir
- Teknik Detaylar:
  - Framework: React
  - HTTP Client: Fetch API

### 7. Favori Haberleri Görüntüleme
- API Endpoint: `GET /favorites`
- Görev: Favoriler sayfası tasarımı ve implementasyonu
- UI Bileşenleri:
  - Favori haberler listesi
  - Boş durum mesajı
- Kullanıcı Deneyimi:
  - Favoriler ayrı sayfada listelenir
  - Sağ sidebar'da son 3 favori gösterilir
- Teknik Detaylar:
  - Framework: React
  - State: favorites state

### 8. Favorilerden Haberi Kaldırma
- API Endpoint: `DELETE /favorites/{id}`
- Görev: Favoriden kaldırma butonu implementasyonu
- UI Bileşenleri:
  - Kaldır butonu
  - Sidebar'da × butonu
- Kullanıcı Deneyimi:
  - Kaldırınca liste güncellenir
  - Toast bildirimi gösterilir
- Teknik Detaylar:
  - Framework: React
  - HTTP Client: Fetch API

### 9. Favori Haberlere Not veya Kategori Ekleme
- API Endpoint: `PUT /favorites/{id}`
- Görev: Not ve etiket ekleme formu implementasyonu
- UI Bileşenleri:
  - Not input alanı
  - Kategori seçim dropdown
  - Kaydet butonu
- Kullanıcı Deneyimi:
  - Modal içinde not alanı gösterilir
  - Kaydet sonrası toast bildirimi
- Teknik Detaylar:
  - Framework: React
  - State: noteInput, noteTag state

### 10. Haberleri Yayınlanma Tarihine Göre Sıralama
- API Endpoint: `GET /news?sort=date`
- Görev: Tarihe göre sıralama butonu implementasyonu
- UI Bileşenleri:
  - Sıralama butonları
  - Aktif sıralama vurgusu
- Kullanıcı Deneyimi:
  - Seçili sıralama görsel olarak belirtilir
  - Liste güncellenir
- Teknik Detaylar:
  - Framework: React
  - State: sortMode state

### 11. En Popüler Haberleri Görüntüleme
- API Endpoint: `GET /news?sort=popular`
- Görev: Popüler sıralama butonu implementasyonu
- UI Bileşenleri:
  - Popüler sıralama butonu 
  - Sağ sidebar'da En Popüler listesi
- Kullanıcı Deneyimi:
  - En popüler haberler sıralanır
  - Sidebar'da ilk 5 haber gösterilir
- Teknik Detaylar:
  - Framework: React
  - State: sortMode state

### 12. Son Eklenen Haberleri Görüntüleme
- API Endpoint: `GET /news?sort=recent`
- Görev: Son eklenen sıralama implementasyonu
- UI Bileşenleri:
  - Son eklenen butonu 
  - Varsayılan sıralama
- Kullanıcı Deneyimi:
  - Sayfa açılışında varsayılan sıralama
  - Buton aktif olarak gösterilir
- Teknik Detaylar:
  - Framework: React
  - State: sortMode state

### 13. Offline Okumak İçin Haber Kaydetme
- API Endpoint: `POST /offline-news`
- Görev: Offline kaydetme butonu implementasyonu
- UI Bileşenleri:
  - Offline kaydet butonu 
  - Aktif/pasif durum stili
- Kullanıcı Deneyimi:
  - Kaydedince buton değişir
  - Toast bildirimi gösterilir
- Teknik Detaylar:
  - Framework: React
  - HTTP Client: Fetch API

### 14. Offline Haberleri Görüntüleme
- API Endpoint: `GET /offline-news`
- Görev: Offline haberler sayfası implementasyonu
- UI Bileşenleri:
  - Offline haberler listesi
  - Boş durum mesajı
- Kullanıcı Deneyimi:
  - Offline haberler ayrı sayfada listelenir
  - Sağ sidebar'da son 3 offline haber gösterilir
- Teknik Detaylar:
  - Framework: React
  - State: offlineNews state

### 15. Offline Haberi Silme
- API Endpoint: `DELETE /offline-news/{id}`
- Görev: Offline silme butonu implementasyonu
- UI Bileşenleri:
  - Sil butonu
  - Sidebar'da × butonu
- Kullanıcı Deneyimi:
  - Silinince liste güncellenir
  - Toast bildirimi gösterilir
- Teknik Detaylar:
  - Framework: React
  - HTTP Client: Fetch API
