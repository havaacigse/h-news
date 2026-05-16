import Foundation

internal struct FavoriteUpdateRequest: Encodable {
    let note: String
    let tag: String
}

internal final class NewsAPIService {
    private let apiClient: APIClient

    init(apiClient: APIClient = .shared) {
        self.apiClient = apiClient
    }

    func fetchNews() async throws -> [News] {
        try await apiClient.get("/news")
    }

    func fetchNewsDetail(id: String) async throws -> News {
        try await apiClient.get("/news/\(id)")
    }

    func searchNews(query: String) async throws -> [News] {
        let encodedQuery = query.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? query
        return try await apiClient.get("/news/search?q=\(encodedQuery)")
    }

    func fetchPopularNews() async throws -> [News] {
        try await apiClient.get("/news/popular")
    }

    func fetchRecentNews() async throws -> [News] {
        try await apiClient.get("/news/recent")
    }

    func markRead(id: String) async throws -> News {
        try await apiClient.patch("/news/\(id)/read", body: Optional<String>.none)
    }

    func markUnread(id: String) async throws -> News {
        try await apiClient.patch("/news/\(id)/unread", body: Optional<String>.none)
    }

    func addFavorite(id: String) async throws -> News {
        try await apiClient.post("/favorites/\(id)")
    }

    func fetchFavorites() async throws -> [News] {
        try await apiClient.get("/favorites")
    }

    func removeFavorite(id: String) async throws -> News {
        try await apiClient.delete("/favorites/\(id)")
    }

    func updateFavorite(id: String, note: String, tag: String) async throws -> News {
        try await apiClient.patch(
            "/favorites/\(id)",
            body: FavoriteUpdateRequest(note: note, tag: tag)
        )
    }

    func saveOffline(id: String) async throws -> News {
        try await apiClient.post("/offline/\(id)")
    }

    func fetchOfflineNews() async throws -> [News] {
        try await apiClient.get("/offline")
    }

    func removeOffline(id: String) async throws -> News {
        try await apiClient.delete("/offline/\(id)")
    }
}
