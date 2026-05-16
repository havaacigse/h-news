//
//  NewsDetailView.swift
//  h_news
//
//  Created by HAVVA on 15.05.2026.
//

import SwiftUI

struct NewsDetailView: View {
    @EnvironmentObject private var newsStore: NewsStore
    let newsID: String

    var body: some View {
        Group {
            if let news = newsStore.news(with: newsID) {
                ScrollView {
                    VStack(alignment: .leading, spacing: 18) {
                        Text(news.category)
                            .font(.caption)
                            .fontWeight(.semibold)
                            .foregroundStyle(.white)
                            .padding(.horizontal, 10)
                            .padding(.vertical, 5)
                            .background(Color.accentColor)
                            .clipShape(Capsule())

                        Text(news.title)
                            .font(.largeTitle)
                            .fontWeight(.bold)
                            .multilineTextAlignment(.leading)

                        HStack(spacing: 14) {
                            Label(news.publishedDate, systemImage: "calendar")
                            Label("\(news.popularity)", systemImage: "flame.fill")
                        }
                        .font(.subheadline)
                        .foregroundStyle(.secondary)

                        Text(news.content)
                            .font(.body)
                            .lineSpacing(6)

                        VStack(alignment: .leading, spacing: 12) {
                            Button {
                                Task {
                                    await newsStore.toggleFavorite(for: newsID)
                                }
                            } label: {
                                Label(
                                    news.isFavorite ? "Favoriden Çıkar" : "Favoriye Ekle",
                                    systemImage: news.isFavorite ? "heart.fill" : "heart"
                                )
                            }

                            Button {
                                Task {
                                    await newsStore.toggleOfflineSaved(for: newsID)
                                }
                            } label: {
                                Label(
                                    news.isOfflineSaved ? "Offline’dan Çıkar" : "Offline Kaydet",
                                    systemImage: news.isOfflineSaved ? "bookmark.fill" : "bookmark"
                                )
                            }

                            Button {
                                Task {
                                    await newsStore.toggleRead(for: newsID)
                                }
                            } label: {
                                Label(
                                    news.isRead ? "Okunmadı İşaretle" : "Okundu İşaretle",
                                    systemImage: news.isRead ? "envelope.badge" : "checkmark.circle"
                                )
                            }
                        }
                        .buttonStyle(.bordered)
                        .padding(.top, 8)
                    }
                    .padding()
                }
            } else {
                EmptyStateView(
                    systemImage: "exclamationmark.circle",
                    message: "Haber bulunamadı."
                )
            }
        }
        .navigationTitle("Haber Detayı")
        .navigationBarTitleDisplayMode(.inline)
    }
}
