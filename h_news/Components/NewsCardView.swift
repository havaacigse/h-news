//
//  NewsCardView.swift
//  h_news
//
//  Created by HAVVA on 15.05.2026.
//

import SwiftUI

struct NewsCardView: View {
    let news: News
    let onFavoriteTap: () -> Void
    let onOfflineTap: () -> Void

    init(
        news: News,
        onFavoriteTap: @escaping () -> Void = {},
        onOfflineTap: @escaping () -> Void = {}
    ) {
        self.news = news
        self.onFavoriteTap = onFavoriteTap
        self.onOfflineTap = onOfflineTap
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 8) {
                    Text(news.category)
                        .font(.caption)
                        .fontWeight(.semibold)
                        .foregroundStyle(.white)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.accentColor)
                        .clipShape(Capsule())

                    Text(news.title)
                        .font(.headline)
                        .foregroundStyle(.primary)
                        .multilineTextAlignment(.leading)
                }

                Spacer()

                quickActionButtons
            }

            Text(news.summary)
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .lineLimit(2)
                .multilineTextAlignment(.leading)

            HStack(spacing: 12) {
                Label(news.publishedDate, systemImage: "calendar")
                Label("\(news.popularity)", systemImage: "flame.fill")

                if news.isRead {
                    Text("Okundu")
                        .font(.caption)
                        .fontWeight(.medium)
                        .foregroundStyle(.green)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.green.opacity(0.12))
                        .clipShape(Capsule())
                }
            }
            .font(.caption)
            .foregroundStyle(.secondary)
        }
        .padding()
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay {
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color(.systemGray5), lineWidth: 1)
        }
        .shadow(color: Color.black.opacity(0.05), radius: 8, x: 0, y: 4)
    }

    private var quickActionButtons: some View {
        HStack(spacing: 10) {
            Button {
                onFavoriteTap()
            } label: {
                Image(systemName: news.isFavorite ? "heart.fill" : "heart")
                    .foregroundStyle(news.isFavorite ? .red : .secondary)
            }
            .buttonStyle(.plain)
            .accessibilityLabel(news.isFavorite ? "Favoriden çıkar" : "Favoriye ekle")

            Button {
                onOfflineTap()
            } label: {
                Image(systemName: news.isOfflineSaved ? "bookmark.fill" : "bookmark")
                    .foregroundStyle(news.isOfflineSaved ? .blue : .secondary)
            }
            .buttonStyle(.plain)
            .accessibilityLabel(news.isOfflineSaved ? "Offline listesinden çıkar" : "Offline kaydet")
        }
        .font(.title3)
    }
}
