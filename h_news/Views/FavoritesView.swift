//
//  FavoritesView.swift
//  h_news
//
//  Created by HAVVA on 15.05.2026.
//

import SwiftUI

struct FavoritesView: View {
    @EnvironmentObject private var newsStore: NewsStore
    @State private var editingNews: News?

    var body: some View {
        NavigationStack {
            ScrollView {
                if newsStore.favorites.isEmpty {
                    EmptyStateView(
                        systemImage: "heart",
                        message: "Henüz favori haber yok."
                    )
                } else {
                    LazyVStack(spacing: 14) {
                        ForEach(newsStore.favorites) { news in
                            favoriteNewsView(news)
                        }
                    }
                    .padding()
                }
            }
            .navigationTitle("Favoriler")
            .sheet(item: $editingNews) { news in
                FavoriteEditView(news: news)
                    .environmentObject(newsStore)
            }
            .task {
                await newsStore.loadFavoritesFromAPI()
            }
        }
    }

    private func favoriteNewsView(_ news: News) -> some View {
        VStack(alignment: .leading, spacing: 12) {
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

            if let favoriteNote = news.favoriteNote, !favoriteNote.isEmpty {
                Label(favoriteNote, systemImage: "note.text")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .lineLimit(2)
            }

            if let favoriteTag = news.favoriteTag {
                Text(favoriteTag)
                    .font(.caption)
                    .fontWeight(.semibold)
                    .foregroundStyle(.white)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 5)
                    .background(Color.orange)
                    .clipShape(Capsule())
            }

            Button {
                editingNews = news
            } label: {
                Label(
                    editButtonTitle(for: news),
                    systemImage: "square.and.pencil"
                )
            }
            .buttonStyle(.bordered)

            Button(role: .destructive) {
                Task {
                    await newsStore.toggleFavorite(for: news.id)
                }
            } label: {
                Label("Favoriden Çıkar", systemImage: "heart.slash")
            }
            .buttonStyle(.bordered)
        }
    }

    private func editButtonTitle(for news: News) -> String {
        if news.favoriteNote == nil && news.favoriteTag == nil {
            return "Not / Etiket Ekle"
        }

        return "Notu / Etiketi Düzenle"
    }
}

private struct FavoriteEditView: View {
    @EnvironmentObject private var newsStore: NewsStore
    @Environment(\.dismiss) private var dismiss

    let news: News
    @State private var noteText: String
    @State private var selectedTag: String

    init(news: News) {
        self.news = news
        _noteText = State(initialValue: news.favoriteNote ?? "")
        _selectedTag = State(initialValue: news.favoriteTag ?? "Önemli")
    }

    var body: some View {
        NavigationStack {
            Form {
                Section("Favori Notu") {
                    TextField("Kısa not yaz", text: $noteText, axis: .vertical)
                        .lineLimit(3, reservesSpace: true)
                }

                Section("Favori Etiketi") {
                    Picker("Etiket", selection: $selectedTag) {
                        ForEach(newsStore.favoriteTags, id: \.self) { tag in
                            Text(tag).tag(tag)
                        }
                    }
                }
            }
            .navigationTitle("Favori Düzenle")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Vazgeç") {
                        dismiss()
                    }
                }

                ToolbarItem(placement: .confirmationAction) {
                    Button("Kaydet") {
                        Task {
                            await newsStore.updateFavorite(
                                newsID: news.id,
                                note: noteText,
                                tag: selectedTag
                            )
                            dismiss()
                        }
                    }
                }
            }
        }
    }
}
