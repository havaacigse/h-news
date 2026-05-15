# H-News Mobil Frontend

Bu doküman, H-News haber uygulamasının iOS mobil arayüzü için frontend tasarımını ve geliştirme görevlerini açıklamaktadır.

Mobil uygulama, vize aşamasında geliştirilen H-News web projesi ve REST API ile uyumlu olacak şekilde Swift ve SwiftUI kullanılarak geliştirilecektir.

---

## 1. Mobil Uygulama Amacı

H-News mobil uygulamasının amacı, kullanıcıların haberleri mobil cihaz üzerinden kolay, hızlı ve düzenli bir şekilde takip edebilmesini sağlamaktır.

Kullanıcılar mobil uygulama üzerinden:

- Haberleri listeleyebilir.
- Haber detaylarını görüntüleyebilir.
- Kategoriye göre haber filtreleyebilir.
- Haberlerde arama yapabilir.
- Haberleri favorilere ekleyebilir.
- Favori haberlere not ve etiket ekleyebilir.
- Haberleri offline okumak için kaydedebilir.
- Popüler ve son haberleri görüntüleyebilir.
- Okundu / okunmadı durumunu takip edebilir.

---

## 2. Kullanılacak Teknolojiler

Mobil frontend geliştirme sürecinde aşağıdaki teknolojiler kullanılacaktır:

- Swift
- SwiftUI
- MVVM mimarisi
- URLSession
- REST API
- SwiftData
- SF Symbols
- Git ve GitHub

---

## 3. Mobil Uygulama Ekranları

Mobil uygulama aşağıdaki ana ekranlardan oluşacaktır:

1. Ana Sayfa
2. Haber Detay Sayfası
3. Arama Sayfası
4. Favoriler Sayfası
5. Offline Haberler Sayfası
6. Profil / Ayarlar Sayfası

---

## 4. Ana Sayfa

Ana sayfada haberler kart yapısı ile listelenecektir.

Ana sayfa görevleri:

- Haber listesini REST API üzerinden çekmek
- Haber başlığı, görseli, kategorisi ve tarihini göstermek
- Kategori filtreleme yapmak
- Popüler haberleri göstermek
- Son eklenen haberleri göstermek
- Haber kartına tıklanınca detay sayfasına yönlendirmek
- Pull-to-refresh ile haber listesini yenilemek

---

## 5. Haber Detay Sayfası

Kullanıcı bir habere tıkladığında haber detay ekranına yönlendirilir.

Haber detay sayfası görevleri:

- Haber başlığını göstermek
- Haber görselini göstermek
- Haber içeriğini göstermek
- Haber kategorisini ve tarihini göstermek
- Haberi favorilere eklemek
- Haberi offline okumak için kaydetmek
- Haberi okundu olarak işaretlemek
- Haber paylaşma butonu eklemek

---

## 6. Arama Sayfası

Arama sayfasında kullanıcı haberler içerisinde arama yapabilir.

Arama sayfası görevleri:

- Arama kutusu oluşturmak
- Kullanıcının yazdığı kelimeye göre API üzerinden haber aramak
- Arama sonuçlarını listelemek
- Sonuç bulunamadığında bilgilendirme göstermek
- Loading ve hata durumlarını yönetmek

---

## 7. Favoriler Sayfası

Favoriler sayfasında kullanıcının favoriye eklediği haberler listelenir.

Favoriler sayfası görevleri:

- Favori haberleri listelemek
- Favoriden haber kaldırmak
- Favori habere not eklemek
- Favori habere etiket veya kategori eklemek
- Favori haber bulunmadığında boş ekran mesajı göstermek

---

## 8. Offline Haberler Sayfası

Offline haberler sayfasında kullanıcının çevrimdışı okumak için kaydettiği haberler listelenir.

Offline haberler sayfası görevleri:

- Offline kaydedilen haberleri listelemek
- Cihazda kayıtlı haberleri göstermek
- Offline haber silmek
- İnternet bağlantısı olmadığında kayıtlı haberleri açabilmek

---

## 9. Profil / Ayarlar Sayfası

Profil ve ayarlar ekranında kullanıcıya ait temel bilgiler ve uygulama ayarları gösterilecektir.

Profil sayfası görevleri:

- Kullanıcı bilgilerini göstermek
- Favori haber sayısını göstermek
- Offline haber sayısını göstermek
- Uygulama hakkında bilgi göstermek
- Tema bilgisi göstermek

---

## 10. Navigasyon Yapısı

Mobil uygulamada TabView ve NavigationStack yapısı kullanılacaktır.

TabView sekmeleri:

- Ana Sayfa
- Arama
- Favoriler
- Offline
- Profil

Haber detay sayfaları NavigationStack ile açılacaktır.

---

## 11. Kullanıcı Deneyimi

Mobil uygulamada kullanıcı deneyimini artırmak için aşağıdaki durumlar dikkate alınacaktır:

- Loading durumları gösterilecektir.
- API hatalarında kullanıcı dostu hata mesajları verilecektir.
- Boş liste durumlarında bilgilendirici mesajlar gösterilecektir.
- Butonlar ve kartlar dokunmaya uygun boyutta olacaktır.
- Tasarım sade, okunabilir ve mobil ekrana uygun olacaktır.

---

## 12. Performans

Mobil uygulamada performans için aşağıdaki noktalara dikkat edilecektir:

- Haber listeleri performanslı liste yapısı ile gösterilecektir.
- Görseller AsyncImage ile yüklenecektir.
- Gereksiz API isteklerinden kaçınılacaktır.
- Offline haberler cihaz hafızasında tutulacaktır.
- Sayfa geçişleri sade ve hızlı olacaktır.

---

## 13. Genel Geliştirme Sırası

1. Mobil frontend dokümantasyonunun hazırlanması
2. Xcode SwiftUI projesinin oluşturulması
3. MVVM klasör yapısının kurulması
4. Model dosyalarının oluşturulması
5. API servis yapısının hazırlanması
6. Ana sayfanın geliştirilmesi
7. Haber detay sayfasının geliştirilmesi
8. Arama özelliğinin eklenmesi
9. Favoriler özelliğinin eklenmesi
10. Offline haber kaydetme özelliğinin eklenmesi
11. Profil / ayarlar ekranının hazırlanması
12. Testlerin yapılması
13. Ekran görüntülerinin README dosyasına eklenmesi
