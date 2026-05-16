import { useState, useEffect, useCallback } from "react";

const API = "https://h-news.onrender.com";

const CATEGORIES = ["Teknoloji", "Dünya", "Ekonomi", "Spor", "Sağlık", "Bilim"];

function Toast({ msg, type, onClose }) {
    useEffect(() => {
        const t = setTimeout(onClose, 2800);
        return () => clearTimeout(t);
    }, [onClose]);
    return <div className={`toast ${type}`}>{msg}</div>;
}

function NewsCard({ item, readIds, favorites, offlineNews, onOpen, onFav, onOffline, onRead }) {
    const isFav = !!favorites.find(f => f.news_id === item.id);
    const isOffline = !!offlineNews.find(o => o.news_id === item.id);
    const isRead = readIds.includes(item.id);

    return (
        <div className={`news-card ${isRead ? "read" : ""}`} onClick={() => onOpen(item)}>
            <div className="card-top">
                <span className={`tag tag-${item.category}`}>{item.category}</span>
                <span className="card-date">{item.date}</span>
            </div>
            <div className="card-title">{item.title}</div>
            <div className="card-summary">{item.summary}</div>
            <div className="card-actions">
                <button className={`act-btn ${isFav ? "on-fav" : ""}`}
                    onClick={(e) => { e.stopPropagation(); onFav(item.id); }}>
                    {isFav ? "⭐ Favoride" : "☆ Favori"}
                </button>
                <button className={`act-btn ${isOffline ? "on-offline" : ""}`}
                    onClick={(e) => { e.stopPropagation(); onOffline(item.id); }}>
                    {isOffline ? "📥 Kaydedildi" : "📥 Offline"}
                </button>
                <button className={`act-btn ${isRead ? "on-read" : ""}`}
                    onClick={(e) => { e.stopPropagation(); onRead(item.id); }}>
                    {isRead ? "✓ Okundu" : "Okundu İşaretle"}
                </button>
            </div>
        </div>
    );
}

export default function App() {
    const [news, setNews] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [offlineNews, setOfflineNews] = useState([]);
    const [readIds, setReadIds] = useState([]);
    const [activeCategory, setActiveCategory] = useState("Tümü");
    const [sortMode, setSortMode] = useState("recent");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedNews, setSelectedNews] = useState(null);
    const [noteInput, setNoteInput] = useState("");
    const [noteTag, setNoteTag] = useState("");
    const [toast, setToast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState("home");

    function showToast(msg, type = "success") { setToast({ msg, type }); }

    const loadNews = useCallback(async () => {
        setLoading(true);
        try {
            let url = `${API}/news`;
            const params = new URLSearchParams();
            if (activeCategory !== "Tümü") params.set("category", activeCategory);
            if (sortMode) params.set("sort", sortMode);
            if (params.toString()) url += "?" + params.toString();
            const res = await fetch(url);
            const data = await res.json();
            setNews(data.data || []);
        } catch {
            showToast("Haberler yüklenemedi", "error");
        }
        setLoading(false);
    }, [activeCategory, sortMode]);

    const loadFavorites = useCallback(async () => {
        try {
            const res = await fetch(`${API}/favorites`);
            const data = await res.json();
            setFavorites(data.data || []);
        } catch { }
    }, []);

    const loadOffline = useCallback(async () => {
        try {
            const res = await fetch(`${API}/offline-news`);
            const data = await res.json();
            setOfflineNews(data.data || []);
        } catch { }
    }, []);

    useEffect(() => { loadNews(); }, [loadNews]);
    useEffect(() => { loadFavorites(); }, [loadFavorites]);
    useEffect(() => { loadOffline(); }, [loadOffline]);

    async function handleSearch(val) {
        setSearchQuery(val);
        if (!val.trim()) { loadNews(); return; }
        setLoading(true);
        try {
            const res = await fetch(`${API}/news/search?q=${encodeURIComponent(val)}`);
            const data = await res.json();
            setNews(data.data || []);
        } catch {
            showToast("Arama başarısız", "error");
        }
        setLoading(false);
    }

    async function openNews(item) {
        try {
            const res = await fetch(`${API}/news/${item.id}`);
            const data = await res.json();
            setSelectedNews(data.data || item);
        } catch {
            setSelectedNews(item);
        }
        const fav = favorites.find(f => f.news_id === item.id);
        setNoteInput(fav?.note || "");
        setNoteTag(fav?.tag || "");
    }

    async function toggleRead(id) {
        const wasRead = readIds.includes(id);
        setReadIds(prev => wasRead ? prev.filter(x => x !== id) : [...prev, id]);
        try {
            await fetch(`${API}/news/${id}/read`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ read: !wasRead })
            });
            showToast(wasRead ? "Okunmadı işaretlendi" : "Okundu işaretlendi ✓");
        } catch {
            showToast("İşlem başarısız", "error");
        }
    }

    async function toggleFavorite(newsId) {
        const isFav = favorites.find(f => f.news_id === newsId);
        if (isFav) {
            try {
                await fetch(`${API}/favorites/${newsId}`, { method: "DELETE" });
                await loadFavorites();
                showToast("Favorilerden kaldırıldı", "error");
            } catch { showToast("İşlem başarısız", "error"); }
        } else {
            try {
                await fetch(`${API}/favorites`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ newsId })
                });
                await loadFavorites();
                showToast("Favorilere eklendi ⭐");
            } catch { showToast("İşlem başarısız", "error"); }
        }
    }

    async function saveFavoriteNote() {
        if (!selectedNews) return;
        try {
            await fetch(`${API}/favorites/${selectedNews.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ note: noteInput, tag: noteTag })
            });
            await loadFavorites();
            showToast("Not kaydedildi ✓");
        } catch { showToast("Kayıt başarısız", "error"); }
    }

    async function toggleOffline(newsId) {
        const isOffline = offlineNews.find(o => o.news_id === newsId);
        if (isOffline) {
            try {
                await fetch(`${API}/offline-news/${newsId}`, { method: "DELETE" });
                await loadOffline();
                showToast("Offline kaydı silindi");
            } catch { showToast("İşlem başarısız", "error"); }
        } else {
            try {
                await fetch(`${API}/offline-news`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ newsId })
                });
                await loadOffline();
                showToast("Offline kaydedildi 📥");
            } catch { showToast("İşlem başarısız", "error"); }
        }
    }

    const catCounts = CATEGORIES.reduce((acc, c) => {
        acc[c] = news.filter(n => n.category === c).length;
        return acc;
    }, {});

    const displayItems = page === "favs"
        ? favorites.map(f => ({ ...f, id: f.news_id }))
        : page === "offline"
            ? offlineNews.map(o => ({ ...o, id: o.news_id }))
            : news;

    return (
        <>
            <header className="header">
                <div className="header-inner">
                    <div className="logo" onClick={() => { setPage("home"); setActiveCategory("Tümü"); setSearchQuery(""); loadNews(); }}>
                        H-News
                    </div>
                    <input className="search-box" placeholder="Haberlerde ara..."
                        value={searchQuery} onChange={e => handleSearch(e.target.value)} />
                    <button className={`nav-btn ${page === "favs" ? "active" : ""}`}
                        onClick={() => setPage("favs")}>
                        ⭐ Favoriler {favorites.length > 0 && `(${favorites.length})`}
                    </button>
                    <button className={`nav-btn ${page === "offline" ? "active" : ""}`}
                        onClick={() => setPage("offline")}>
                        📥 Offline {offlineNews.length > 0 && `(${offlineNews.length})`}
                    </button>
                </div>
            </header>

            <div className="layout">
                <aside>
                    <div className="sidebar">
                        <h4>Kategoriler</h4>
                        <button className={`cat-btn ${activeCategory === "Tümü" ? "active" : ""}`}
                            onClick={() => { setActiveCategory("Tümü"); setPage("home"); }}>
                            Tümü <span className="cat-count">{news.length}</span>
                        </button>
                        {CATEGORIES.map(cat => (
                            <button key={cat} className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
                                onClick={() => { setActiveCategory(cat); setPage("home"); }}>
                                {cat} <span className="cat-count">{catCounts[cat] || 0}</span>
                            </button>
                        ))}
                    </div>
                    <div className="sort-section">
                        <h4 style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".08em", color: "var(--text3)", textTransform: "uppercase", marginBottom: 10 }}>Sırala</h4>
                        {[
                            { key: "recent", label: "🕐 Son Eklenen" },
                            { key: "popular", label: "🔥 En Popüler" },
                            { key: "date", label: "📅 Tarihe Göre" }
                        ].map(s => (
                            <button key={s.key} className={`sort-btn ${sortMode === s.key ? "active" : ""}`}
                                onClick={() => { setSortMode(s.key); setPage("home"); }}>{s.label}</button>
                        ))}
                    </div>
                </aside>

                <main>
                    <div className="feed-header">
                        <div className="feed-title">
                            {page === "favs" ? "⭐ Favori Haberler"
                                : page === "offline" ? "📥 Offline Haberler"
                                    : activeCategory === "Tümü" ? "Güncel Haberler"
                                        : activeCategory}
                        </div>
                        <span style={{ fontSize: 13, color: "var(--text3)" }}>{displayItems.length} haber</span>
                    </div>

                    {loading ? (
                        <div style={{ padding: "2rem", textAlign: "center", color: "var(--text3)" }}>Yükleniyor...</div>
                    ) : (
                        <div className="news-list">
                            {displayItems.length === 0
                                ? <div className="news-card"><p className="empty">
                                    {page === "favs" ? "Henüz favori eklemediniz."
                                        : page === "offline" ? "Offline kayıtlı haber yok."
                                            : "Sonuç bulunamadı."}
                                </p></div>
                                : displayItems.map(item => (
                                    <NewsCard key={item.id} item={item} readIds={readIds}
                                        favorites={favorites} offlineNews={offlineNews}
                                        onOpen={openNews} onFav={toggleFavorite}
                                        onOffline={toggleOffline} onRead={toggleRead} />
                                ))
                            }
                        </div>
                    )}
                </main>

                <aside>
                    <div className="widget">
                        <h4>⭐ Son Favoriler</h4>
                        {favorites.length === 0 ? <p className="empty">Henüz yok</p>
                            : favorites.slice(0, 3).map(f => (
                                <div key={f.id} className="w-item">
                                    <span className="w-title" onClick={() => openNews({ ...f, id: f.news_id })}>{f.title}</span>
                                    <button className="w-remove" onClick={() => toggleFavorite(f.news_id)}>×</button>
                                </div>
                            ))
                        }
                    </div>
                    <div className="widget">
                        <h4>📥 Offline Kaydedilenler</h4>
                        {offlineNews.length === 0 ? <p className="empty">Henüz yok</p>
                            : offlineNews.slice(0, 3).map(o => (
                                <div key={o.id} className="w-item">
                                    <span className="w-title" onClick={() => openNews({ ...o, id: o.news_id })}>{o.title}</span>
                                    <button className="w-remove" onClick={() => toggleOffline(o.news_id)}>×</button>
                                </div>
                            ))
                        }
                    </div>
                    <div className="widget">
                        <h4>🔥 En Popüler</h4>
                        {news.slice(0, 5).map((item, i) => (
                            <div key={item.id} className="pop-item" onClick={() => openNews(item)}>
                                <span className="pop-num">{i + 1}</span>
                                <span className="pop-title">{item.title}</span>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>

            {selectedNews && (
                <div className="overlay open" onClick={() => setSelectedNews(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-head">
                            <div>
                                <div className="modal-cat">{selectedNews.category}</div>
                                <div className="modal-title">{selectedNews.title}</div>
                                <div className="modal-meta">{selectedNews.date}</div>
                            </div>
                            <button className="modal-close" onClick={() => setSelectedNews(null)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <img src={selectedNews.image} alt={selectedNews.title} className="modal-img" style={{ objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
                            <div className="modal-text"><p>{selectedNews.content}</p></div>
                        </div>
                        <div className="note-area">
                            <h4>Not & Etiket Ekle</h4>
                            <input className="note-input" placeholder="Notunuz..." value={noteInput}
                                onChange={e => setNoteInput(e.target.value)} />
                            <select className="note-input" value={noteTag}
                                onChange={e => setNoteTag(e.target.value)} style={{ marginBottom: 8 }}>
                                <option value="">Kategori seç...</option>
                                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                            <button className="note-save" onClick={saveFavoriteNote}>Kaydet</button>
                        </div>
                        <div className="modal-actions">
                            <button className={`m-btn ${favorites.find(f => f.news_id === selectedNews.id) ? "on-fav" : ""}`}
                                onClick={() => toggleFavorite(selectedNews.id)}>
                                {favorites.find(f => f.news_id === selectedNews.id) ? "⭐ Favoride" : "☆ Favorile"}
                            </button>
                            <button className={`m-btn ${offlineNews.find(o => o.news_id === selectedNews.id) ? "on-offline" : ""}`}
                                onClick={() => toggleOffline(selectedNews.id)}>
                                {offlineNews.find(o => o.news_id === selectedNews.id) ? "📥 Offline'da" : "📥 Offline Kaydet"}
                            </button>
                            <button className={`m-btn ${readIds.includes(selectedNews.id) ? "on-read" : ""}`}
                                onClick={() => toggleRead(selectedNews.id)}>
                                {readIds.includes(selectedNews.id) ? "✓ Okundu" : "Okundu İşaretle"}
                            </button>
                            <button className="m-btn danger" style={{ marginLeft: "auto" }}
                                onClick={() => setSelectedNews(null)}>Kapat</button>
                        </div>
                    </div>
                </div>
            )}

            {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
        </>
    );
}
