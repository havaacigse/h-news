//
//  HomeView.swift
//  h_news
//
//  Created by HAVVA on 15.05.2026.
//

import SwiftUI

struct HomeView: View {
    @EnvironmentObject private var newsStore: NewsStore
    @State private var selectedMode: NewsListMode = .all

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    headerView
                    statusView
                    modePickerView
                    categoryListView

                    if displayedNews.isEmpty {
                        emptyStateView
                    } else {
                        newsListView
                    }
                }
                .padding()
            }
            .navigationTitle("Ana Sayfa")
            .task {
                await newsStore.loadNews()
            }
        }
    }

    private var displayedNews: [News] {
        newsStore.filteredNews(
            category: newsStore.selectedCategory,
            mode: selectedMode
        )
    }

    private var headerView: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("H-News")
                .font(.largeTitle)
                .fontWeight(.bold)

            Text("Güncel haberleri takip et")
                .font(.body)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    private var modePickerView: some View {
        Picker("Listeleme", selection: $selectedMode) {
            ForEach(NewsListMode.allCases) { mode in
                Text(mode.rawValue).tag(mode)
            }
        }
        .pickerStyle(.segmented)
    }

    @ViewBuilder
    private var statusView: some View {
        if newsStore.isLoading {
            ProgressView("Haberler yükleniyor...")
        } else if let apiErrorMessage = newsStore.apiErrorMessage {
            Text(apiErrorMessage)
                .font(.footnote)
                .foregroundStyle(.secondary)
        }
    }

    private var categoryListView: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 10) {
                ForEach(newsStore.categories, id: \.self) { category in
                    Button {
                        newsStore.selectedCategory = category
                    } label: {
                        CategoryChipView(
                            category: category,
                            isSelected: newsStore.selectedCategory == category
                        )
                    }
                    .buttonStyle(.plain)
                }
            }
        }
    }

    private var newsListView: some View {
        LazyVStack(spacing: 14) {
            ForEach(displayedNews) { news in
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
            }
        }
    }

    private var emptyStateView: some View {
        EmptyStateView(
            systemImage: "newspaper",
            message: "Bu kategoride haber bulunamadı."
        )
    }
}
