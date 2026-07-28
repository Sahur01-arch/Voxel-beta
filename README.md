### Voxel-Beta

WhatsApp Bot berbasis Node.js yang dikembangkan dengan fokus pada performa ringan, efisiensi tinggi, dan kemudahan pengembangan.

---

### ✨ Fitur Utama

Voxel-Beta mempertahankan fitur inti dari basis kode aslinya, namun dengan pendekatan yang lebih minimalis dan optimal.

### ❌ Fitur yang dihapus

- ❌ AI
- ❌ Jadibot

Penghapusan fitur ini dilakukan untuk:

- Meningkatkan efisiensi performa
- Mengurangi penggunaan RAM
- Meminimalkan konflik saat pengembangan atau patch baru

### 📊 Performa

Dengan optimasi ini, penggunaan RAM bot berada di kisaran:

- ± 60–100 MB

«Nilai ini dapat berubah tergantung fitur yang aktif dan beban penggunaan.»

### ✅ Fitur lain

Fitur lainnya tetap aktif, stabil, dan dapat digunakan seperti biasa tanpa perubahan signifikan.

---

### 📦 Instalasi

##### 🔧 Requirement

Pastikan sudah terpasang:

- Node.js (disarankan v20+)
- npm atau Yarn (disarankan Yarn)
- Python 3
- Git

---

#### 📥 Clone Repository

git clone https://github.com/Sahur01-arch/Voxel-beta.git
cd Voxel-beta

---

#### 📦 Install Dependency

### ✅ Menggunakan Yarn (REKOMENDASI)

yarn install

atau npm

npm install

«⚠️ Disarankan menggunakan Yarn untuk stabilitas dependency yang lebih baik.»

---

### 🐍 Catatan Python

Pastikan Python 3 sudah terinstall, karena beberapa dependency membutuhkan proses build native.

---

### ⚠️ Termux Issue

Jika terjadi error saat instalasi di Termux Native, gunakan:

- PRoot-Distro (REKOMENDASI)

---

##### 🐧 PRoot-Distro (Termux)

Jika menggunakan Termux, disarankan menjalankan bot melalui PRoot-Distro untuk stabilitas penuh.

📌 Rekomendasi distro:

Distro| Keterangan
Arch Linux| ⭐ REKOMENDASI UTAMA (package terbaru & stabil untuk dev)
Debian| Stabil, namun mungkin perlu NVM untuk Node.js terbaru
Ubuntu| Alternatif Debian dengan kompatibilitas luas

---

#### ⚙️ Catatan Node.js

Jika versi Node.js di distro masih di bawah v20, gunakan:

- NVM (Node Version Manager)

---

#### ⚙️ Konfigurasi

Sebelum menjalankan bot, ubah file:

settings-example.js

menjadi:

settings.js

---

#### ✏️ Edit konfigurasi

nano settings.js

atau gunakan editor lain sesuai preferensi.

---

#### 🔑 Penting

Isi konfigurasi berikut dengan benar:

- Owner number
- Bot number
- API Key
- Database config
- Setting fitur lainnya

«Semua detail konfigurasi sudah dijelaskan langsung di dalam file "settings.js".»

⚠️ **Jangan membagikan file **"settings.js" karena berisi data sensitif.

---

### ▶️ Menjalankan Bot

### 🚀 Start manual

node index.js

atau

node start.js

---

#### 🔁 Rekomendasi: PM2 (Production)

Untuk menjaga bot tetap hidup 24/7:

npm install -g pm2
pm2 start index.js --name voxel-beta
pm2 save

---

#### 📊 Monitoring

pm2 logs voxel-beta

---

#### 🔄 Restart Bot

pm2 restart voxel-beta

---

#### 🗄️ Database

Voxel-Beta mendukung dua jenis database:

- JSON Database → ringan & lokal
- MongoDB → scalable & cloud-ready

---

#### ⚙️ Konfigurasi

Semua pengaturan database dapat diatur melalui:

settings.js

---

#### 🌐 Self-Hosting File / Image

Voxel-Beta mendukung opsi self-hosting server file/image menggunakan Express.js.

#### 📌 Yang bisa dikembangkan:

- Routing API
- Upload file
- File storage lokal
- Public access endpoint
- Domain / IP binding
- HTTPS support

«⚠️ Implementasi self-hosting sepenuhnya diserahkan kepada user sesuai kebutuhan masing-masing.»

---

#### 📁 Struktur Project

Voxel-Beta/
├── lib/                 # Utility & helper functions
├── src/                 # Core system bot
├── index.js            # Entry utama bot
├── naze.js             # Core handler
├── start.js            # Alternative start file
├── settings-example.js # Template config
├── package.json        # Dependency manager
└── speed.py            # Utility script

---

#### ⚠️ Catatan Penting

- Gunakan Node.js v20+ (REKOMENDASI)
- Gunakan Yarn untuk stabilitas dependency
- Gunakan PRoot-Distro jika di Termux
- Pastikan Python 3 sudah terinstall
- Jangan expose "settings.js"
- Gunakan PM2 untuk production deployment

---

### 👤 Author

Saryu

---

#### 🔗 Credits

Forked from:

- Nazedev / hitori

GitHub:

- "https://github.com/nazedev/hitori" (https://github.com/nazedev/hitori)

---

#### 🚀 Kesimpulan

Voxel-Beta dirancang untuk menjadi:

- Ringan
- Stabil
- Mudah dikembangkan
- Siap production

«Fokus utama: efisiensi, performa, dan fleksibilitas pengembangan jangka panjang.»
