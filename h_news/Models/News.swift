//
//  News.swift
//  h_news
//
//  Created by HAVVA on 15.05.2026.
//

import Foundation

struct News: Identifiable, Decodable {
    let id: String
    let title: String
    let summary: String
    let content: String
    let category: String
    let imageName: String?
    let systemImageName: String?
    let publishedDate: String
    let publishedDateValue: Date
    let publishedTimestamp: Double
    var isRead: Bool
    var isFavorite: Bool
    var isOfflineSaved: Bool
    let popularity: Int
    var favoriteNote: String?
    var favoriteTag: String?

    init(
        id: String,
        title: String,
        summary: String,
        content: String,
        category: String,
        imageName: String?,
        systemImageName: String?,
        publishedDate: String,
        publishedDateValue: Date,
        publishedTimestamp: Double,
        isRead: Bool,
        isFavorite: Bool,
        isOfflineSaved: Bool,
        popularity: Int,
        favoriteNote: String?,
        favoriteTag: String?
    ) {
        self.id = id
        self.title = title
        self.summary = summary
        self.content = content
        self.category = category
        self.imageName = imageName
        self.systemImageName = systemImageName
        self.publishedDate = publishedDate
        self.publishedDateValue = publishedDateValue
        self.publishedTimestamp = publishedTimestamp
        self.isRead = isRead
        self.isFavorite = isFavorite
        self.isOfflineSaved = isOfflineSaved
        self.popularity = popularity
        self.favoriteNote = favoriteNote
        self.favoriteTag = favoriteTag
    }

    enum CodingKeys: String, CodingKey {
        case id
        case title
        case summary
        case content
        case category
        case imageName
        case systemImageName
        case publishedDate
        case publishedTimestamp
        case isRead
        case isFavorite
        case isOfflineSaved
        case popularity
        case favoriteNote
        case favoriteTag
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(String.self, forKey: .id)
        title = try container.decode(String.self, forKey: .title)
        summary = try container.decode(String.self, forKey: .summary)
        content = try container.decode(String.self, forKey: .content)
        category = try container.decode(String.self, forKey: .category)
        imageName = try container.decodeIfPresent(String.self, forKey: .imageName)
        systemImageName = try container.decodeIfPresent(String.self, forKey: .systemImageName)
        publishedDate = try container.decode(String.self, forKey: .publishedDate)
        publishedTimestamp = try container.decode(Double.self, forKey: .publishedTimestamp)
        publishedDateValue = Date(timeIntervalSince1970: publishedTimestamp / 1000)
        isRead = try container.decode(Bool.self, forKey: .isRead)
        isFavorite = try container.decode(Bool.self, forKey: .isFavorite)
        isOfflineSaved = try container.decode(Bool.self, forKey: .isOfflineSaved)
        popularity = try container.decode(Int.self, forKey: .popularity)
        favoriteNote = try container.decodeIfPresent(String.self, forKey: .favoriteNote)
        favoriteTag = try container.decodeIfPresent(String.self, forKey: .favoriteTag)
    }
}
