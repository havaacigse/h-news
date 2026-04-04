const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database(path.join(__dirname, "hnews.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS news (
    id TEXT PRIMARY KEY,
    category TEXT,
    title TEXT,
    summary TEXT,
    content TEXT,
    date TEXT,
    image TEXT,
    created_at INTEGER DEFAULT (strftime('%s','now'))
  );
  CREATE TABLE IF NOT EXISTS read_status (
    news_id TEXT PRIMARY KEY,
    is_read INTEGER DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS favorites (
    id TEXT PRIMARY KEY,
    news_id TEXT,
    note TEXT DEFAULT '',
    tag TEXT DEFAULT '',
    created_at INTEGER DEFAULT (strftime('%s','now'))
  );
  CREATE TABLE IF NOT EXISTS offline_news (
    id TEXT PRIMARY KEY,
    news_id TEXT,
    created_at INTEGER DEFAULT (strftime('%s','now'))
  );
`);

const count = db.prepare("SELECT COUNT(*) as c FROM news").get();
if (count.c === 0) {
    const insert = db.prepare(`
    INSERT INTO news (id, category, title, summary, content, date, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
    const haberler = [
        ["haber_001", "Teknoloji", "Yapay Zeka Çağı: GPT-5 Resmen Tanıtıldı", "OpenAI'nin en yeni modeli GPT-5, insan seviyesinde muhakeme yetenekleriyle dünya gündemine oturdu.", "OpenAI, uzun süredir beklenen GPT-5 modelini resmen tanıttı. Şirketin CEO'su Sam Altman, modelin önceki sürümlere kıyasla çok daha gelişmiş muhakeme ve problem çözme yeteneklerine sahip olduğunu açıkladı. GPT-5, tıp, hukuk ve mühendislik gibi alanlardaki profesyonel sınavlarda üst düzey başarı gösterdi. Model aynı zamanda görsel analiz ve kod yazma konularında da önceki sürümleri geride bıraktı.", "2 Nis 2025", "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&q=80"],
        ["haber_002", "Dünya", "BM Zirvesi: İklim Krizi İçin Acil Toplanıldı", "Birleşmiş Milletler, küresel ısınmaya karşı acil önlemler tartışmak üzere New York'ta olağanüstü oturum düzenledi.", "BM Genel Kurulu, iklim değişikliğinin hız kazanan etkileri karşısında olağanüstü toplanma kararı aldı. 193 üye ülkenin katıldığı zirvede, 2030 hedeflerinin çok gerisinde kalındığı vurgulandı. Birçok ülke karbonsuzlaşma taahhütlerini hızlandıracağını açıkladı.", "1 Nis 2025", "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=700&q=80"],
        ["haber_003", "Ekonomi", "Merkez Bankası Faiz Kararını Açıkladı", "TCMB Para Politikası Kurulu, piyasaların beklediği faiz kararını duyurdu. Uzmanlar kararı değerlendirdi.", "Türkiye Cumhuriyet Merkez Bankası Para Politikası Kurulu, aylık toplantısında politika faizini sabit tutma kararı aldı. Enflasyonla mücadelede kararlı duruş devam ederken, piyasalar önümüzdeki süreçteki adımları yakından takip ediyor.", "1 Nis 2025", "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=700&q=80"],
        ["haber_004", "Spor", "Şampiyonlar Ligi Çeyrek Final Eşleşmeleri Belli Oldu", "UEFA Şampiyonlar Ligi'nde çeyrek final kurası çekildi. Heyecan verici eşleşmeler ortaya çıktı.", "UEFA Şampiyonlar Ligi çeyrek final kura çekimi tamamlandı. Bu sezon büyük sürprizlere sahne olan turnuvada çeyrek finaller Nisan ayında oynanacak. Taraftar grupları bilet alımı için şimdiden kuyruğa girdi.", "31 Mar 2025", "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=700&q=80"],
        ["haber_005", "Sağlık", "Yeni Kanser Aşısı Klinik Testlerde Umut Verdi", "mRNA teknolojisi kullanılarak geliştirilen kanser aşısı, ilk klinik deney sonuçlarında dikkat çekici başarı gösterdi.", "BioNTech ve Moderna'nın ortaklaşa yürüttüğü klinik çalışmada kişiselleştirilmiş kanser aşısı umut verici sonuçlar ortaya koydu. Melanom hastalarında hastalık ilerlemesinde belirgin yavaşlama gözlemlendi.", "30 Mar 2025", "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=700&q=80"],
        ["haber_006", "Bilim", "Mars'ta Sıvı Su Bulunduğuna Dair Yeni Kanıtlar", "NASA'nın Mars keşif aracı, gezegenin yüzey altında sıvı su varlığına işaret eden veriler iletti.", "NASA'nın Perseverance aracından gelen radar verileri, Mars'ın belirli bölgelerinde yüzey altı sıvı su tabakalarına işaret ediyor. Bilim insanları bu bulguyu yaşam ihtimalini güçlendiren en önemli kanıt olarak değerlendiriyor.", "29 Mar 2025", "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=700&q=80"],
        ["haber_007", "Teknoloji", "Apple'ın Katlanabilir iPhone'u Göründü", "Sızdırılan görseller Apple'ın ilk katlanabilir akıllı telefon tasarımını ortaya koydu.", "Güvenilir kaynakların paylaştığı görüntüler, Apple'ın uzun süredir geliştirdiği katlanabilir iPhone'un tasarım detaylarını gözler önüne serdi. Cihazın titanyum çerçeve ve özel katlama mekanizması içerdiği öğrenildi.", "28 Mar 2025", "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=80"],
        ["haber_008", "Dünya", "Japonya'da 7.2 Büyüklüğünde Deprem", "Japonya'nın Hokkaido bölgesini vuran deprem sonrası tsunami uyarısı verildi.", "Japonya Meteoroloji Ajansı, Hokkaido açıklarında 7.2 büyüklüğünde bir deprem kaydedildiğini duyurdu. Deprem sonrası kıyı bölgelerine tsunami uyarısı yapıldı.", "27 Mar 2025", "https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=700&q=80"],
        ["haber_009", "Ekonomi", "Altın Fiyatları Rekor Kırdı", "Ons altın fiyatı tarihinin en yüksek seviyesine ulaştı. Yatırımcılar güvenli liman arayışında.", "Küresel belirsizlik ortamında yatırımcıların güvenli liman arayışı altın fiyatlarını rekor seviyelere taşıdı. Analistler fiyatların kısa vadede yüksek seyretmeye devam edebileceğini öngörüyor.", "26 Mar 2025", "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=700&q=80"],
        ["haber_010", "Teknoloji", "Tesla'nın Yeni Otonom Sürüş Sistemi Tanıtıldı", "Tesla, tam otonom sürüşe bir adım daha yaklaşan yeni FSD yazılımını kullanıcılara sundu.", "Tesla'nın yeni Full Self-Driving yazılımı, şehir içi sürüşlerde daha güvenilir performans sunuyor. Elon Musk, sistemin yakında sürücüsüz taksi hizmetine hazır hale geleceğini açıkladı.", "25 Mar 2025", "https://images.unsplash.com/photo-1561580125-028ee3bd62eb?w=700&q=80"],
        ["haber_011", "Spor", "Milli Takım Avrupa Şampiyonası'na Katılmaya Hak Kazandı", "Türkiye Milli Futbol Takımı, kritik maçı kazanarak Avrupa Şampiyonası biletini aldı.", "Türkiye Milli Futbol Takımı son dakika golüyle rakibini mağlup ederek Avrupa Şampiyonası'na katılmayı garantiledi. Taraftarlar stat dışında büyük sevinç yaşadı.", "24 Mar 2025", "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=700&q=80"],
        ["haber_012", "Sağlık", "Dünya Sağlık Örgütü'nden Yeni Pandemi Uyarısı", "DSÖ, Güneydoğu Asya'da yayılan yeni bir viral enfeksiyona karşı ülkeleri uyardı.", "Dünya Sağlık Örgütü, Güneydoğu Asya'da hızla yayılan yeni bir solunum yolu enfeksiyonuna ilişkin acil uyarı yayımladı. Üye ülkelerin sağlık sistemlerini hazır tutması istendi.", "23 Mar 2025", "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=700&q=80"],
        ["haber_013", "Bilim", "Kuantum Bilgisayarında Yeni Hız Rekoru", "Google'ın yeni kuantum işlemcisi, klasik süper bilgisayarları geride bırakacak hesaplama hızına ulaştı.", "Google DeepMind ekibi, yeni nesil kuantum çipinin en gelişmiş klasik bilgisayarlardan trilyon kat daha hızlı hesaplama yapabildiğini açıkladı. Bu gelişme ilaç ve malzeme bilimi alanlarında devrim yaratabilir.", "22 Mar 2025", "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=700&q=80"],
        ["haber_014", "Dünya", "Ukrayna'da Ateşkes Müzakereleri Yeniden Başladı", "Ukrayna ve Rusya arasındaki ateşkes görüşmeleri tarafsız bir ülkede yeniden masaya yatırıldı.", "BM arabuluculuğuyla başlayan müzakereler, her iki tarafın da temkinli yaklaştığı hassas bir süreç olarak değerlendiriliyor. Batılı ülkeler süreci yakından takip ediyor.", "21 Mar 2025", "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=700&q=80"],
        ["haber_015", "Ekonomi", "Türkiye Turizm Gelirlerinde Rekor Kırdı", "2025'in ilk çeyreğinde Türkiye'ye gelen turist sayısı ve turizm gelirleri tüm zamanların rekorunu kırdı.", "Kültür ve Turizm Bakanlığı verilerine göre ilk çeyrekte 12 milyon turist Türkiye'yi ziyaret etti. İstanbul ve Antalya en çok ziyaret edilen şehirler oldu.", "20 Mar 2025", "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=700&q=80"],
        ["haber_016", "Teknoloji", "Meta'nın Yeni AR Gözlükleri Piyasaya Çıkıyor", "Meta, gerçek dünyayla dijital içeriği harmanlayan yeni nesil artırılmış gerçeklik gözlüğünü tanıttı.", "Meta'nın yeni AR gözlükleri holografik ekran teknolojisiyle gerçek dünyaya dijital katman ekliyor. Cihazın fiyatı 999 dolar olarak belirlendi ve önümüzdeki ay satışa sunulacak.", "19 Mar 2025", "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=700&q=80"],
        ["haber_017", "Spor", "NBA'de Sezonun En İyi Oyuncusu Açıklandı", "NBA, düzenli sezonun en değerli oyuncusunu açıkladı. Ödül büyük sürpriz yarattı.", "Oylamayla belirlenen MVP ödülü bu sezon beklenmedik bir isme gitti. Genç oyuncu takımını playoff'a taşıyan performansıyla tüm analistleri şaşırttı.", "18 Mar 2025", "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=700&q=80"],
        ["haber_018", "Bilim", "Antartika'da Yeni Bir Tür Keşfedildi", "Bilim insanları Antarktika'nın derin sularında daha önce bilinmeyen bir deniz canlısı türü keşfetti.", "Uluslararası araştırma ekibi, 3000 metre derinlikte biyolüminesans özelliğe sahip yeni bir deniz canlısı türünü katalogladı. Türün okyanus ekosistemi hakkında önemli ipuçları sunabileceği düşünülüyor.", "17 Mar 2025", "https://images.unsplash.com/photo-1551415923-a2297c7fda79?w=700&q=80"],
        ["haber_019", "Sağlık", "Yapay Zeka Kanser Teşhisinde Doktorları Geçti", "Yeni bir yapay zeka modeli, kanser tarama görüntülerini uzman doktorlardan daha yüksek doğrulukla analiz etti.", "Stanford Üniversitesi'nde yapılan araştırmada, derin öğrenme tabanlı model meme kanseri taramalarında yüzde 94 doğruluk oranına ulaşırken uzman radyologların ortalaması yüzde 88 oldu.", "16 Mar 2025", "https://images.unsplash.com/photo-1576671081837-49000212a370?w=700&q=80"],
        ["haber_020", "Dünya", "G20 Zirvesi'nde Yapay Zeka Düzenlemesi Kararlaştırıldı", "G20 ülkeleri, yapay zeka teknolojilerinin küresel düzenlemesi için ortak bir çerçeve oluşturma kararı aldı.", "Japonya'da düzenlenen G20 zirvesinde liderler, yapay zekanın etik kullanımı ve güvenliği için bağlayıcı uluslararası standartlar oluşturulmasını kararlaştırdı. Anlaşma 2026'ya kadar hayata geçirilecek.", "15 Mar 2025", "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=700&q=80"],
    ];
    haberler.forEach(h => insert.run(...h));
    console.log("✅ 20 haber eklendi");
}

// 1. TÜM HABERLERİ LİSTELE
app.get("/news", (req, res) => {
    const { category, sort } = req.query;
    let query = "SELECT * FROM news";
    const params = [];
    if (category) { query += " WHERE category = ?"; params.push(category); }
    if (sort === "popular") query += " ORDER BY created_at DESC";
    else if (sort === "date") query += " ORDER BY date DESC";
    else query += " ORDER BY created_at DESC";
    res.json({ success: true, data: db.prepare(query).all(...params) });
});

// 2. ARAMA
app.get("/news/search", (req, res) => {
    const { q } = req.query;
    if (!q) return res.status(400).json({ success: false, message: "q gerekli" });
    const news = db.prepare("SELECT * FROM news WHERE title LIKE ? OR summary LIKE ? OR content LIKE ?")
        .all(`%${q}%`, `%${q}%`, `%${q}%`);
    res.json({ success: true, data: news });
});

// 3. HABER DETAYI
app.get("/news/:id", (req, res) => {
    const news = db.prepare("SELECT * FROM news WHERE id = ?").get(req.params.id);
    if (!news) return res.status(404).json({ success: false, message: "Bulunamadı" });
    res.json({ success: true, data: news });
});

// 4. OKUNDU
app.put("/news/:id/read", (req, res) => {
    const { read } = req.body;
    db.prepare("INSERT INTO read_status (news_id, is_read) VALUES (?, ?) ON CONFLICT(news_id) DO UPDATE SET is_read = ?")
        .run(req.params.id, read ? 1 : 0, read ? 1 : 0);
    res.json({ success: true });
});

// 5. FAVORİYE EKLE
app.post("/favorites", (req, res) => {
    const { newsId } = req.body;
    if (!newsId) return res.status(400).json({ success: false });
    const exists = db.prepare("SELECT * FROM favorites WHERE news_id = ?").get(newsId);
    if (exists) return res.status(409).json({ success: false, message: "Zaten var" });
    const id = "fav_" + Date.now();
    db.prepare("INSERT INTO favorites (id, news_id) VALUES (?, ?)").run(id, newsId);
    res.status(201).json({ success: true, id });
});

// 6. FAVORİLERİ GETİR
app.get("/favorites", (req, res) => {
    const favs = db.prepare(`
    SELECT f.*, n.title, n.category, n.summary, n.date, n.image
    FROM favorites f JOIN news n ON f.news_id = n.id
    ORDER BY f.created_at DESC
  `).all();
    res.json({ success: true, data: favs });
});

// 7. FAVORİDEN KALDIR
app.delete("/favorites/:id", (req, res) => {
    db.prepare("DELETE FROM favorites WHERE news_id = ? OR id = ?").run(req.params.id, req.params.id);
    res.status(204).send();
});

// 8. FAVORİYE NOT EKLE
app.put("/favorites/:id", (req, res) => {
    const { note, tag } = req.body;
    db.prepare("UPDATE favorites SET note = ?, tag = ? WHERE news_id = ? OR id = ?")
        .run(note || "", tag || "", req.params.id, req.params.id);
    res.json({ success: true });
});

// 9. OFFLİNE KAYDET
app.post("/offline-news", (req, res) => {
    const { newsId } = req.body;
    if (!newsId) return res.status(400).json({ success: false });
    const exists = db.prepare("SELECT * FROM offline_news WHERE news_id = ?").get(newsId);
    if (exists) return res.status(409).json({ success: false, message: "Zaten var" });
    const id = "off_" + Date.now();
    db.prepare("INSERT INTO offline_news (id, news_id) VALUES (?, ?)").run(id, newsId);
    res.status(201).json({ success: true, id });
});

// 10. OFFLİNE GETİR
app.get("/offline-news", (req, res) => {
    const items = db.prepare(`
    SELECT o.*, n.title, n.category, n.summary, n.content, n.date, n.image
    FROM offline_news o JOIN news n ON o.news_id = n.id
    ORDER BY o.created_at DESC
  `).all();
    res.json({ success: true, data: items });
});

// 11. OFFLİNE SİL
app.delete("/offline-news/:id", (req, res) => {
    db.prepare("DELETE FROM offline_news WHERE news_id = ? OR id = ?").run(req.params.id, req.params.id);
    res.status(204).send();
});

const PORT = 3001;
app.listen(PORT, () => console.log(`✅ H-News Backend: http://localhost:${PORT}`));