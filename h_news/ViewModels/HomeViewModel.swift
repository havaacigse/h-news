//
//  HomeViewModel.swift
//  h_news
//
//  Created by HAVVA on 15.05.2026.
//

import Foundation

final class HomeViewModel: ObservableObject {
    @Published var selectedCategory: String = "Tümü"

    let categories = ["Tümü", "Teknoloji", "Spor", "Sağlık", "Ekonomi", "Kültür"]

    var filteredNews: [News] {
        []
    }
}
