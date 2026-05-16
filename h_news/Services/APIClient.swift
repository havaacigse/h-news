import Foundation

struct APIResponse<T: Decodable>: Decodable {
    let success: Bool
    let data: T?
    let message: String?
}

enum APIError: Error, LocalizedError {
    case invalidURL
    case requestFailed(String)
    case emptyData

    var errorDescription: String? {
        switch self {
        case .invalidURL:
            return "API adresi oluşturulamadı."
        case .requestFailed(let message):
            return message
        case .emptyData:
            return "API cevabında veri bulunamadı."
        }
    }
}

final class APIClient {
    static let shared = APIClient()

    private init() {}

    func get<T: Decodable>(_ path: String) async throws -> T {
        try await request(path, method: "GET", body: Optional<String>.none)
    }

    func post<T: Decodable>(_ path: String) async throws -> T {
        try await request(path, method: "POST", body: Optional<String>.none)
    }

    func patch<T: Decodable, Body: Encodable>(_ path: String, body: Body? = nil) async throws -> T {
        try await request(path, method: "PATCH", body: body)
    }

    func delete<T: Decodable>(_ path: String) async throws -> T {
        try await request(path, method: "DELETE", body: Optional<String>.none)
    }

    private func request<T: Decodable, Body: Encodable>(
        _ path: String,
        method: String,
        body: Body?
    ) async throws -> T {
        guard let url = URL(string: APIConfig.baseURL + path) else {
            throw APIError.invalidURL
        }

        var request = URLRequest(url: url)
        request.httpMethod = method
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        if let body {
            request.httpBody = try JSONEncoder().encode(body)
        }

        let (data, response) = try await URLSession.shared.data(for: request)

        if let httpResponse = response as? HTTPURLResponse,
           !(200...299).contains(httpResponse.statusCode) {
            let apiError = try? JSONDecoder().decode(APIResponse<EmptyResponse>.self, from: data)
            throw APIError.requestFailed(apiError?.message ?? "API isteği başarısız oldu.")
        }

        let apiResponse = try JSONDecoder().decode(APIResponse<T>.self, from: data)

        if apiResponse.success, let responseData = apiResponse.data {
            return responseData
        }

        throw APIError.requestFailed(apiResponse.message ?? "API isteği başarısız oldu.")
    }
}

private struct EmptyResponse: Decodable {}
