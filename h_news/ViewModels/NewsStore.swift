//
//  NewsStore.swift
//  h_news
//
//  Created by HAVVA on 16.05.2026.
//

import Foundation

enum NewsListMode: String, CaseIterable, Identifiable {
    case all = "Tüm Haberler"
    case recent = "Son Eklenenler"
    case popular = "En Popüler"

    var id: String {
        rawValue
    }
}

@MainActor
final class NewsStore: ObservableObject {
    @Published var newsList: [News]
    @Published var selectedCategory: String = "Tümü"
    @Published var isLoading = false
    @Published var apiErrorMessage: String?

    let categories = ["Tümü", "Teknoloji", "Spor", "Sağlık", "Ekonomi", "Kültür"]
    let favoriteTags = ["Önemli", "Sonra Oku", "Araştır", "Ders İçin"]
    private let apiService = NewsAPIService()
    private var hasLoadedFromAPI = false

    var filteredNews: [News] {
        filteredNews(category: selectedCategory, mode: .all)
    }

    var favorites: [News] {
        newsList.filter { $0.isFavorite }
    }

    var offlineNews: [News] {
        newsList.filter { $0.isOfflineSaved }
    }

    var readNewsCount: Int {
        newsList.filter { $0.isRead }.count
    }

    init() {
        newsList = Self.mockNews
    }

    var sortedByRecent: [News] {
        newsList.sorted { $0.publishedDateValue > $1.publishedDateValue }
    }

    var sortedByPopularity: [News] {
        newsList.sorted { $0.popularity > $1.popularity }
    }

    func filteredNews(for category: String) -> [News] {
        filteredNews(category: category, mode: .all)
    }

    func filteredNews(category: String, mode: NewsListMode) -> [News] {
        let source: [News]

        switch mode {
        case .all:
            source = newsList
        case .recent:
            source = sortedByRecent
        case .popular:
            source = sortedByPopularity
        }

        if category == "Tümü" {
            return source
        }

        return source.filter { $0.category == category }
    }

    func searchNews(query: String) -> [News] {
        let trimmedQuery = query.trimmingCharacters(in: .whitespacesAndNewlines)

        if trimmedQuery.isEmpty {
            return []
        }

        return newsList.filter { news in
            news.title.localizedCaseInsensitiveContains(trimmedQuery) ||
            news.summary.localizedCaseInsensitiveContains(trimmedQuery) ||
            news.content.localizedCaseInsensitiveContains(trimmedQuery) ||
            news.category.localizedCaseInsensitiveContains(trimmedQuery)
        }
    }

    func searchNewsFromAPI(query: String) async -> [News] {
        do {
            let results = try await apiService.searchNews(query: query)
            apiErrorMessage = nil
            return results
        } catch {
            apiErrorMessage = "API araması başarısız oldu. Local arama sonucu gösteriliyor."
            print("API warning: \(error.localizedDescription)")
            return searchNews(query: query)
        }
    }

    func loadNews() async {
        if hasLoadedFromAPI {
            return
        }

        isLoading = true

        do {
            newsList = try await apiService.fetchNews()
            apiErrorMessage = nil
            hasLoadedFromAPI = true
        } catch {
            // Demo sırasında backend kapalıysa uygulama çökmez; mevcut mock verilerle çalışmaya devam eder.
            apiErrorMessage = "API bağlantısı kurulamadı. Mock veriler gösteriliyor."
            print("API warning: \(error.localizedDescription)")
        }

        isLoading = false
    }

    func loadFavoritesFromAPI() async {
        do {
            let favoritesFromAPI = try await apiService.fetchFavorites()
            mergeStatusUpdates(from: favoritesFromAPI)
            apiErrorMessage = nil
        } catch {
            apiErrorMessage = "Favoriler API'den alınamadı. Local favoriler gösteriliyor."
            print("API warning: \(error.localizedDescription)")
        }
    }

    func loadOfflineNewsFromAPI() async {
        do {
            let offlineFromAPI = try await apiService.fetchOfflineNews()
            mergeStatusUpdates(from: offlineFromAPI)
            apiErrorMessage = nil
        } catch {
            apiErrorMessage = "Offline haberler API'den alınamadı. Local liste gösteriliyor."
            print("API warning: \(error.localizedDescription)")
        }
    }

    func news(with id: String) -> News? {
        newsList.first { $0.id == id }
    }

    func toggleFavorite(for id: String) async {
        guard let index = index(for: id) else { return }
        let shouldFavorite = !newsList[index].isFavorite

        do {
            let updatedNews = shouldFavorite
                ? try await apiService.addFavorite(id: id)
                : try await apiService.removeFavorite(id: id)
            updateLocalNews(updatedNews)
            apiErrorMessage = nil
        } catch {
            print("API warning: \(error.localizedDescription)")
            apiErrorMessage = "Favori işlemi API'ye gönderilemedi. Local olarak güncellendi."
            newsList[index].isFavorite = shouldFavorite

            if !shouldFavorite {
                newsList[index].favoriteNote = nil
                newsList[index].favoriteTag = nil
            }
        }
    }

    func toggleOfflineSaved(for id: String) async {
        guard let index = index(for: id) else { return }
        let shouldSaveOffline = !newsList[index].isOfflineSaved

        do {
            let updatedNews = shouldSaveOffline
                ? try await apiService.saveOffline(id: id)
                : try await apiService.removeOffline(id: id)
            updateLocalNews(updatedNews)
            apiErrorMessage = nil
        } catch {
            print("API warning: \(error.localizedDescription)")
            apiErrorMessage = "Offline işlemi API'ye gönderilemedi. Local olarak güncellendi."
            newsList[index].isOfflineSaved = shouldSaveOffline
        }
    }

    func toggleRead(for id: String) async {
        guard let index = index(for: id) else { return }
        let shouldMarkRead = !newsList[index].isRead

        do {
            let updatedNews = shouldMarkRead
                ? try await apiService.markRead(id: id)
                : try await apiService.markUnread(id: id)
            updateLocalNews(updatedNews)
            apiErrorMessage = nil
        } catch {
            print("API warning: \(error.localizedDescription)")
            apiErrorMessage = "Okundu işlemi API'ye gönderilemedi. Local olarak güncellendi."
            newsList[index].isRead = shouldMarkRead
        }
    }

    func updateFavorite(newsID: String, note: String, tag: String) async {
        do {
            let updatedNews = try await apiService.updateFavorite(id: newsID, note: note, tag: tag)
            updateLocalNews(updatedNews)
            apiErrorMessage = nil
        } catch {
            print("API warning: \(error.localizedDescription)")
            apiErrorMessage = "Favori notu API'ye gönderilemedi. Local olarak güncellendi."
            updateFavoriteNote(newsID: newsID, note: note)
            updateFavoriteTag(newsID: newsID, tag: tag)
        }
    }

    func updateFavoriteNote(newsID: String, note: String) {
        guard let index = index(for: newsID) else { return }
        let trimmedNote = note.trimmingCharacters(in: .whitespacesAndNewlines)
        newsList[index].favoriteNote = trimmedNote.isEmpty ? nil : trimmedNote
    }

    func updateFavoriteTag(newsID: String, tag: String) {
        guard let index = index(for: newsID) else { return }
        newsList[index].favoriteTag = tag
    }

    private func index(for id: String) -> Int? {
        newsList.firstIndex { $0.id == id }
    }

    private func updateLocalNews(_ updatedNews: News) {
        guard let index = index(for: updatedNews.id) else { return }
        newsList[index] = updatedNews
    }

    private func mergeStatusUpdates(from apiNews: [News]) {
        for updatedNews in apiNews {
            updateLocalNews(updatedNews)
        }
    }

    private static func date(year: Int, month: Int, day: Int) -> Date {
        DateComponents(calendar: Calendar.current, year: year, month: month, day: day).date ?? Date()
    }

    private static func timestamp(year: Int, month: Int, day: Int) -> Double {
        date(year: year, month: month, day: day).timeIntervalSince1970 * 1000
    }

    private static let mockNews = [
        News(
            id: "1",
            title: "Yapay Zeka Haber Editörlerine Destek Oluyor",
            summary: "Yeni araçlar, haber ekiplerinin gündemi daha hızlı takip etmesine yardımcı oluyor.",
            content: "Haber merkezlerinde kullanılan yapay zeka araçları, editörlerin yoğun gündem içinde kaynakları daha hızlı taramasını ve haber taslaklarını düzenlemesini kolaylaştırıyor. Uzmanlar, bu teknolojilerin insan editörlerin yerini almak yerine çalışma sürecini desteklediğini belirtiyor.",
            category: "Teknoloji",
            imageName: nil,
            systemImageName: "cpu",
            publishedDate: "15 Mayıs 2026",
            publishedDateValue: date(year: 2026, month: 5, day: 15),
            publishedTimestamp: timestamp(year: 2026, month: 5, day: 15),
            isRead: false,
            isFavorite: true,
            isOfflineSaved: false,
            popularity: 92,
            favoriteNote: nil,
            favoriteTag: nil
        ),
        News(
            id: "2",
            title: "Final Maçına Büyük İlgi",
            summary: "Sezonun son karşılaşması için biletlerin büyük bölümü kısa sürede tükendi.",
            content: "Spor severler final karşılaşmasına yoğun ilgi gösterdi. Takımlar son antrenmanlarını tamamlarken teknik ekipler maç öncesi hazırlıkların planlandığı gibi ilerlediğini açıkladı.",
            category: "Spor",
            imageName: nil,
            systemImageName: "sportscourt",
            publishedDate: "14 Mayıs 2026",
            publishedDateValue: date(year: 2026, month: 5, day: 14),
            publishedTimestamp: timestamp(year: 2026, month: 5, day: 14),
            isRead: true,
            isFavorite: false,
            isOfflineSaved: false,
            popularity: 81,
            favoriteNote: nil,
            favoriteTag: nil
        ),
        News(
            id: "3",
            title: "Uzmanlardan Sağlıklı Yaşam Önerileri",
            summary: "Düzenli uyku, dengeli beslenme ve hareketli yaşamın önemi vurgulandı.",
            content: "Sağlık uzmanları, günlük alışkanlıkların genel yaşam kalitesi üzerinde büyük etkisi olduğunu belirtiyor. Özellikle düzenli uyku, yeterli su tüketimi ve kısa yürüyüşlerin uzun vadede olumlu sonuçlar doğurabileceği ifade ediliyor.",
            category: "Sağlık",
            imageName: nil,
            systemImageName: "heart.text.square",
            publishedDate: "13 Mayıs 2026",
            publishedDateValue: date(year: 2026, month: 5, day: 13),
            publishedTimestamp: timestamp(year: 2026, month: 5, day: 13),
            isRead: false,
            isFavorite: false,
            isOfflineSaved: true,
            popularity: 74,
            favoriteNote: nil,
            favoriteTag: nil
        ),
        News(
            id: "4",
            title: "Piyasalarda Haftanın İlk Değerlendirmesi",
            summary: "Ekonomistler, haftanın ilk verilerinin piyasa beklentilerini şekillendirdiğini söylüyor.",
            content: "Haftanın ilk ekonomik verileri yatırımcılar tarafından yakından takip ediliyor. Uzmanlara göre küresel gelişmeler ve yerel göstergeler, önümüzdeki günlerde piyasalardaki hareketliliğin yönünü belirleyebilir.",
            category: "Ekonomi",
            imageName: nil,
            systemImageName: "chart.line.uptrend.xyaxis",
            publishedDate: "12 Mayıs 2026",
            publishedDateValue: date(year: 2026, month: 5, day: 12),
            publishedTimestamp: timestamp(year: 2026, month: 5, day: 12),
            isRead: true,
            isFavorite: true,
            isOfflineSaved: true,
            popularity: 88,
            favoriteNote: nil,
            favoriteTag: nil
        ),
        News(
            id: "5",
            title: "Şehirde Kültür Sanat Haftası Başlıyor",
            summary: "Sergiler, konserler ve söyleşiler hafta boyunca ziyaretçilerle buluşacak.",
            content: "Kültür sanat haftası kapsamında farklı yaş gruplarına hitap eden pek çok etkinlik düzenlenecek. Programda yerel sanatçıların sergileri, açık hava konserleri ve edebiyat söyleşileri öne çıkıyor.",
            category: "Kültür",
            imageName: nil,
            systemImageName: "theatermasks",
            publishedDate: "11 Mayıs 2026",
            publishedDateValue: date(year: 2026, month: 5, day: 11),
            publishedTimestamp: timestamp(year: 2026, month: 5, day: 11),
            isRead: false,
            isFavorite: false,
            isOfflineSaved: false,
            popularity: 67,
            favoriteNote: nil,
            favoriteTag: nil
        ),
        News(
            id: "6",
            title: "Mobil Uygulamalarda Güvenlik Önlemleri",
            summary: "Kullanıcı verilerinin korunması için temel güvenlik adımları yeniden gündemde.",
            content: "Mobil uygulama geliştiricileri için güvenli veri saklama, güçlü kimlik doğrulama ve düzenli güncelleme süreçleri önem taşıyor. Kullanıcıların da uygulama izinlerini dikkatli kontrol etmesi öneriliyor.",
            category: "Teknoloji",
            imageName: nil,
            systemImageName: "lock.shield",
            publishedDate: "10 Mayıs 2026",
            publishedDateValue: date(year: 2026, month: 5, day: 10),
            publishedTimestamp: timestamp(year: 2026, month: 5, day: 10),
            isRead: false,
            isFavorite: true,
            isOfflineSaved: false,
            popularity: 79,
            favoriteNote: nil,
            favoriteTag: nil
        )
    ]
}
