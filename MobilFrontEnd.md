# H-News Mobil Frontend Görevleri

H-News mobil frontend, kullanıcıların haberleri listeleyebildiği, arayabildiği, filtreleyebildiği, favorilere ekleyebildiği ve offline okuyabildiği SwiftUI tabanlı iOS uygulamasıdır.

Kullanılan temel teknolojiler: SwiftUI, MVVM, URLSession, ObservableObject, @StateObject, @EnvironmentObject, NavigationStack ve TabView.

## 1. Ana Sayfa Haber Listeleme Ekranı

### Görev
Kullanıcının güncel haberleri ana ekranda kart yapısıyla görüntülemesini sağlamak.

### İşlevler
- Haber listesini gösterir.
- Kategori filtresiyle birlikte çalışır.
- Tüm Haberler, Son Eklenenler ve En Popüler seçimlerini destekler.
- Kart üzerinden favori ve offline hızlı aksiyonları sunar.

### Kullanılan SwiftUI yapıları
- NavigationStack
- ScrollView
- LazyVStack
- Picker
- Button
- NewsCardView

### Bağlı olduğu backend endpointleri
- GET /api/news
- GET /api/news/recent
- GET /api/news/popular

### Kullanıcı deneyimi detayları
API başarılıysa backend verisi gösterilir. API başarısız olursa mock fallback veriyle liste boş kalmaz.

## 2. Haber Detay Ekranı

### Görev
Seçilen haberin başlık, kategori, tarih, içerik ve popülerlik bilgisini göstermek.

### İşlevler
- Haber detayını görüntüler.
- Favoriye ekleme/çıkarma yapar.
- Offline kaydetme/çıkarma yapar.
- Okundu/okunmadı işaretler.

### Kullanılan SwiftUI yapıları
- NavigationStack
- ScrollView
- VStack
- Button
- Label

### Bağlı olduğu backend endpointleri
- GET /api/news/:id
- PATCH /api/news/:id/read
- PATCH /api/news/:id/unread
- POST /api/favorites/:newsId
- DELETE /api/favorites/:newsId
- POST /api/offline/:newsId
- DELETE /api/offline/:newsId

### Kullanıcı deneyimi detayları
Buton metinleri haber durumuna göre değişir. API hatasında local state güncellenerek demo akışı bozulmaz.

## 3. Haber Arama Ekranı

### Görev
Kullanıcının haberler arasında anahtar kelimeyle arama yapmasını sağlamak.

### İşlevler
- Başlık, özet, içerik ve kategori alanlarında arama yapar.
- Sonuçları haber kartları ile gösterir.
- Sonuç yoksa boş durum mesajı verir.

### Kullanılan SwiftUI yapıları
- TextField
- NavigationStack
- LazyVStack
- EmptyStateView

### Bağlı olduğu backend endpointleri
- GET /api/news/search?q=kelime

### Kullanıcı deneyimi detayları
API araması başarısız olursa local mock arama fallback olarak çalışır.

## 4. Kategori Filtreleme Alanı

### Görev
Haberlerin kategoriye göre filtrelenmesini sağlamak.

### İşlevler
- Tümü, Teknoloji, Spor, Sağlık, Ekonomi ve Kültür kategorilerini gösterir.
- Seçili kategoriye göre haber listesini günceller.

### Kullanılan SwiftUI yapıları
- ScrollView
- HStack
- Button
- CategoryChipView

### Bağlı olduğu backend endpointleri
- GET /api/news?category=Teknoloji

### Kullanıcı deneyimi detayları
Seçili kategori chip görünümüyle belirgin hale getirilir.

## 5. Favoriler Ekranı

### Görev
Kullanıcının favoriye eklediği haberleri görüntülemesini sağlamak.

### İşlevler
- Favori haberleri listeler.
- Favoriden kaldırma işlemi yapar.
- Haber detayına geçiş sağlar.
- Kart üzerinde hızlı favori/offline aksiyonları sunar.

### Kullanılan SwiftUI yapıları
- NavigationStack
- ScrollView
- LazyVStack
- Button
- Sheet

### Bağlı olduğu backend endpointleri
- GET /api/favorites
- POST /api/favorites/:newsId
- DELETE /api/favorites/:newsId

### Kullanıcı deneyimi detayları
Favori yoksa EmptyStateView ile sade boş ekran mesajı gösterilir.

## 6. Favori Not / Etiket Düzenleme Alanı

### Görev
Favori haberlere kısa not ve etiket eklenmesini sağlamak.

### İşlevler
- Favori notu ekler veya düzenler.
- Önemli, Sonra Oku, Araştır, Ders İçin etiketlerinden biri seçilir.
- Not ve etiket favoriler ekranında görünür.

### Kullanılan SwiftUI yapıları
- Sheet
- Form
- TextField
- Picker
- Toolbar

### Bağlı olduğu backend endpointleri
- PATCH /api/favorites/:newsId

### Kullanıcı deneyimi detayları
Düzenleme ekranı sheet olarak açılır ve kaydetme sonrası kapanır.

## 7. Offline Haberler Ekranı

### Görev
Offline okumak için kaydedilen haberleri listelemek.

### İşlevler
- Offline haberleri gösterir.
- Offline listesinden haber siler.
- Detay ekranına geçiş sağlar.

### Kullanılan SwiftUI yapıları
- NavigationStack
- ScrollView
- LazyVStack
- NewsCardView

### Bağlı olduğu backend endpointleri
- GET /api/offline
- POST /api/offline/:newsId
- DELETE /api/offline/:newsId

### Kullanıcı deneyimi detayları
Offline haber yoksa kullanıcıya anlaşılır boş liste mesajı gösterilir.

## 8. Profil / İstatistik Ekranı

### Görev
Kullanıcının uygulama içi haber istatistiklerini görmesini sağlamak.

### İşlevler
- Toplam haber sayısını gösterir.
- Favori haber sayısını gösterir.
- Offline haber sayısını gösterir.
- Okunan haber sayısını gösterir.

### Kullanılan SwiftUI yapıları
- NavigationStack
- ScrollView
- LazyVGrid
- Stat card yapısı

### Bağlı olduğu backend endpointleri
Doğrudan endpoint kullanmaz. Ortak NewsStore state’i üzerinden hesaplanır.

### Kullanıcı deneyimi detayları
Sade kart tasarımıyla hızlı okunabilir istatistik sunar.

## 9. TabView Navigasyon Yapısı

### Görev
Uygulamanın ana ekranları arasında kolay geçiş sağlamak.

### İşlevler
- Ana Sayfa
- Arama
- Favoriler
- Offline
- Profil

### Kullanılan SwiftUI yapıları
- TabView
- Label
- @StateObject
- @EnvironmentObject

### Bağlı olduğu backend endpointleri
Her tab kendi ihtiyacına göre NewsStore üzerinden backend servislerini kullanır.

### Kullanıcı deneyimi detayları
Alt tab navigasyon mobil haber uygulaması için tanıdık ve hızlı kullanım sağlar.

## 10. Loading / Error / Empty State Yönetimi

### Görev
Yükleme, hata ve boş liste durumlarında kullanıcıya anlaşılır geri bildirim vermek.

### İşlevler
- Haberler yüklenirken ProgressView gösterir.
- API hatasında sade mesaj gösterir.
- Boş listelerde EmptyStateView gösterir.
- API başarısız olursa mock fallback çalışır.

### Kullanılan SwiftUI yapıları
- ProgressView
- Text
- EmptyStateView
- @Published state

### Bağlı olduğu backend endpointleri
Tüm haber listeleme ve işlem endpointleriyle dolaylı ilişkilidir.

### Kullanıcı deneyimi detayları
Backend kapalı olsa bile uygulama tamamen çökmez ve demo akışı devam eder.

## Güvenlik Notu

Gerçek kullanıcı adı, şifre, token ve secret değerleri public repoya eklenmemiştir. Demo ortamında bu bilgiler local `.env` dosyası üzerinden tanımlanmalıdır.
