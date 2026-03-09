openapi: 3.0.3
info:
  title: H-News API
  version: 1.0.0
  description: >
    H-News mobil haber uygulaması için hazırlanmış API dokümantasyonudur.
    Bu API haber listeleme, haber detay görüntüleme, arama,
    favorilere ekleme ve offline haber yönetimi işlemlerini kapsar.
  contact:
    name: H-News Team
    email: info@hnews.com

servers:
  - url: https://api.hnews.com
    description: Production Server
  - url: http://localhost:3000
    description: Development Server

tags:
  - name: News
    description: Haber işlemleri
  - name: Favorites
    description: Favori haber yönetimi
  - name: Offline
    description: Offline haber işlemleri

paths:

  /api/news:
    get:
      tags:
        - News
      summary: Haberleri Listeleme
      description: Sistemdeki tüm haberleri listeler.
      responses:
        "200":
          description: Haber listesi başarıyla getirildi

  /api/news/{newsId}:
    get:
      tags:
        - News
      summary: Haber Detay Görüntüleme
      description: Seçilen haberin detaylarını getirir.
      parameters:
        - name: newsId
          in: path
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Haber detayları getirildi

  /api/news/search:
    get:
      tags:
        - News
      summary: Haber Arama
      description: Girilen anahtar kelimeye göre haber arar.
      parameters:
        - name: query
          in: query
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Arama sonuçları listelendi

  /api/news/popular:
    get:
      tags:
        - News
      summary: Popüler Haberleri Görüntüleme
      description: En çok okunan haberleri listeler.
      responses:
        "200":
          description: Popüler haberler getirildi

  /api/news/latest:
    get:
      tags:
        - News
      summary: Son Eklenen Haberler
      description: En son eklenen haberleri listeler.
      responses:
        "200":
          description: Son haberler getirildi

  /api/favorites:
    post:
      tags:
        - Favorites
      summary: Haberi Favorilere Ekleme
      description: Kullanıcının seçtiği haberi favorilere ekler.
      responses:
        "201":
          description: Haber favorilere eklendi

    get:
      tags:
        - Favorites
      summary: Favori Haberleri Listeleme
      description: Kullanıcının favori haberlerini listeler.
      responses:
        "200":
          description: Favori haberler getirildi

  /api/favorites/{newsId}:
    delete:
      tags:
        - Favorites
      summary: Favoriden Haber Silme
      description: Seçilen haberi favorilerden kaldırır.
      parameters:
        - name: newsId
          in: path
          required: true
          schema:
            type: string
      responses:
        "204":
          description: Haber favorilerden kaldırıldı

  /api/offline:
    post:
      tags:
        - Offline
      summary: Offline Okumak İçin Haber Kaydetme
      description: Haber offline okumak için cihazda saklanır.
      responses:
        "201":
          description: Haber offline kaydedildi

    get:
      tags:
        - Offline
      summary: Offline Haberleri Listeleme
      description: Offline kaydedilmiş haberleri listeler.
      responses:
        "200":
          description: Offline haberler getirildi

  /api/offline/{newsId}:
    delete:
      tags:
        - Offline
      summary: Offline Haberi Silme
      description: Offline kaydedilmiş haberi siler.
      parameters:
        - name: newsId
          in: path
          required: true
          schema:
            type: string
      responses:
        "204":
          description: Offline haber silindi
