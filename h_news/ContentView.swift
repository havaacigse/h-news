//
//  ContentView.swift
//  h_news
//
//  Created by HAVVA on 15.05.2026.
//

import SwiftUI

struct ContentView: View {
    @StateObject private var newsStore = NewsStore()

    var body: some View {
        TabView {
            HomeView()
                .tabItem {
                    Label("Ana Sayfa", systemImage: "house.fill")
                }

            SearchView()
                .tabItem {
                    Label("Arama", systemImage: "magnifyingglass")
                }

            FavoritesView()
                .tabItem {
                    Label("Favoriler", systemImage: "heart.fill")
                }

            OfflineNewsView()
                .tabItem {
                    Label("Offline", systemImage: "bookmark.fill")
                }

            ProfileView()
                .tabItem {
                    Label("Profil", systemImage: "person.fill")
                }
        }
        .environmentObject(newsStore)
    }
}
