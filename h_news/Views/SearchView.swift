//
//  SearchView.swift
//  h_news
//
//  Created by HAVVA on 15.05.2026.
//

import SwiftUI

struct SearchView: View {
    @EnvironmentObject private var newsStore: NewsStore
    @State private var searchText = ""
    @State private var searchResults: [News] = []
    @State private var isSearching = false

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    TextField("Haberlerde ara", text: $searchText)
                        .textInputAutocapitalization(.never)
                        .autocorrectionDisabled()
                        .onSubmit {
                            Task {
                                await performSearch()
                            }
                        }
                        .padding(12)
                        .background(Color(.systemGray6))
                        .clipShape(RoundedRectangle(cornerRadius: 10))

                    if searchText.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
                        EmptyStateView(
                            systemImage: "magnifyingglass",
                            message: "Arama yapmak için bir kelime yaz."
                        )
                    } else if isSearching {
                        ProgressView("Aranıyor...")
                    } else if searchResults.isEmpty {
                        EmptyStateView(
                            systemImage: "doc.text.magnifyingglass",
                            message: "Aramanızla eşleşen haber bulunamadı."
                        )
                    } else {
                        LazyVStack(spacing: 14) {
                            ForEach(searchResults) { news in
                                NavigationLink {
                                    NewsDetailView(newsID: news.id)
                                } label: {
                                    NewsCardView(
                                        news: news,
                                        onFavoriteTap: {
                                            Task {
                                                await newsStore.toggleFavorite(for: news.id)
                                                updateSearchResult(for: news.id)
                                            }
                                        },
                                        onOfflineTap: {
                                            Task {
                                                await newsStore.toggleOfflineSaved(for: news.id)
                                                updateSearchResult(for: news.id)
                                            }
                                        }
                                    )
                                }
                                .buttonStyle(.plain)
                            }
                        }
                    }
                }
                .padding()
            }
            .navigationTitle("Arama")
            .task(id: searchText) {
                await performSearch()
            }
        }
    }

    private func performSearch() async {
        let trimmedSearchText = searchText.trimmingCharacters(in: .whitespacesAndNewlines)

        if trimmedSearchText.isEmpty {
            searchResults = []
            return
        }

        isSearching = true
        searchResults = await newsStore.searchNewsFromAPI(query: trimmedSearchText)
        isSearching = false
    }

    private func updateSearchResult(for newsID: String) {
        guard let updatedNews = newsStore.news(with: newsID),
              let index = searchResults.firstIndex(where: { $0.id == newsID }) else {
            return
        }

        searchResults[index] = updatedNews
    }
}
