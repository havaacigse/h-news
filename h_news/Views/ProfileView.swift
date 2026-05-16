//
//  ProfileView.swift
//  h_news
//
//  Created by HAVVA on 15.05.2026.
//

import SwiftUI

struct ProfileView: View {
    @EnvironmentObject private var newsStore: NewsStore

    var body: some View {
        NavigationStack {
            ScrollView {
                LazyVGrid(columns: columns, spacing: 14) {
                    statCard(
                        title: "Toplam Haber",
                        value: newsStore.newsList.count,
                        systemImage: "newspaper"
                    )

                    statCard(
                        title: "Favoriler",
                        value: newsStore.favorites.count,
                        systemImage: "heart.fill"
                    )

                    statCard(
                        title: "Offline",
                        value: newsStore.offlineNews.count,
                        systemImage: "bookmark.fill"
                    )

                    statCard(
                        title: "Okunan",
                        value: newsStore.readNewsCount,
                        systemImage: "checkmark.circle.fill"
                    )
                }
                .padding()
            }
            .navigationTitle("Profil")
        }
    }

    private var columns: [GridItem] {
        [
            GridItem(.flexible()),
            GridItem(.flexible())
        ]
    }

    private func statCard(title: String, value: Int, systemImage: String) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            Image(systemName: systemImage)
                .font(.title2)
                .foregroundStyle(.tint)

            Text("\(value)")
                .font(.largeTitle)
                .fontWeight(.bold)

            Text(title)
                .font(.subheadline)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay {
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color(.systemGray5), lineWidth: 1)
        }
    }
}
