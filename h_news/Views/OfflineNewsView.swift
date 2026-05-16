//
//  OfflineNewsView.swift
//  h_news
//
//  Created by HAVVA on 15.05.2026.
//

import SwiftUI

struct OfflineNewsView: View {
    @EnvironmentObject private var newsStore: NewsStore

    var body: some View {
        NavigationStack {
            ScrollView {
                if newsStore.offlineNews.isEmpty {
                    EmptyStateView(
                        systemImage: "bookmark",
                        message: "Henüz offline kaydedilmiş haber yok."
                    )
                } else {
                    LazyVStack(spacing: 14) {
                        ForEach(newsStore.offlineNews) { news in
                            VStack(alignment: .leading, spacing: 10) {
                                NavigationLink {
                                    NewsDetailView(newsID: news.id)
                                } label: {
                                    NewsCardView(
                                        news: news,
                                        onFavoriteTap: {
                                            Task {
                                                await newsStore.toggleFavorite(for: news.id)
                                            }
                                        },
                                        onOfflineTap: {
                                            Task {
                                                await newsStore.toggleOfflineSaved(for: news.id)
                                            }
                                        }
                                    )
                                }
                                .buttonStyle(.plain)

                                Button(role: .destructive) {
                                    Task {
                                        await newsStore.toggleOfflineSaved(for: news.id)
                                    }
                                } label: {
                                    Label("Offline’dan Çıkar", systemImage: "bookmark.slash")
                                }
                                .buttonStyle(.bordered)
                            }
                        }
                    }
                    .padding()
                }
            }
            .navigationTitle("Offline")
            .task {
                await newsStore.loadOfflineNewsFromAPI()
            }
        }
    }
}
