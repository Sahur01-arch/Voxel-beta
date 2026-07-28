Voxel-Beta

WhatsApp Bot berbasis Node.js yang dikembangkan untuk penggunaan yang lebih ringan dan efisien.

✨ Fitur

Voxel-Beta mempertahankan sebagian besar fitur utama dari basis kode aslinya, dengan beberapa fitur yang sengaja dipangkas:

- ❌ AI
- ❌ Jadibot

Kedua fitur tersebut dihapus untuk meningkatkan efisiensi serta mengurangi kemungkinan konflik ketika menambahkan patch atau pengembangan baru.

Dengan dipangkasnya fitur tersebut, penggunaan RAM bot diperkirakan sekitar 60–100 MB, tergantung penggunaan dan fitur yang aktif.

Fitur lainnya tetap tersedia dan dapat digunakan secara normal.

📦 Instalasi

Pastikan sudah terpasang:

- Node.js
- npm atau Yarn
- Python 3
- Git

Clone repository:

git clone https://github.com/Sahur01-arch/Voxel-beta.git
cd Voxel-beta

Install dependency menggunakan Yarn:

yarn install

Atau menggunakan npm:

npm install

«Disarankan menggunakan Yarn.»

Pastikan Python 3 sudah terpasang terlebih dahulu karena beberapa dependency dapat membutuhkannya saat proses instalasi.

Jika instalasi dependency mengalami error ketika menggunakan Termux Native, disarankan menjalankannya melalui PRoot-Distro.

🐧 PRoot-Distro

Jika menggunakan Termux, kamu dapat menjalankan Voxel-Beta melalui PRoot-Distro.

Rekomendasi distro:

Distro| Keterangan
Arch Linux| ⭐ Rekomendasi. Package cenderung lebih baru
Debian| Stabil, tetapi gunakan NVM jika versi Node.js tersedia terlalu lama
Ubuntu| Alternatif yang mirip dengan Debian

Untuk Debian atau Ubuntu, jika Node.js yang tersedia masih di bawah versi 20, gunakan NVM untuk memasang versi Node.js yang lebih baru.

⚙️ Konfigurasi

Sebelum menjalankan bot, ubah file:

settings-example.js

menjadi:

settings.js

Kemudian buka:

nano settings.js

atau gunakan text editor pilihanmu.

Masukkan konfigurasi dan API Key yang diperlukan pada file "settings.js". Informasi mengenai API yang digunakan dan konfigurasi yang tersedia dapat dilihat langsung di dalam file tersebut.

Pastikan konfigurasi owner, nomor bot, API Key, dan pengaturan lainnya sudah benar sebelum menjalankan bot.

▶️ Menjalankan Bot

Setelah konfigurasi selesai, jalankan:

node index.js

Atau gunakan:

node start.js

Untuk menjalankan bot secara terus-menerus, PM2 sangat disarankan.

Contoh:

npm install -g pm2
pm2 start index.js --name voxel-beta
pm2 save

Melihat log:

pm2 logs voxel-beta

Restart:

pm2 restart voxel-beta

🗄️ Database

Voxel-Beta mendukung penyimpanan database menggunakan:

- JSON Database — penyimpanan lokal
- MongoDB — penyimpanan menggunakan MongoDB

Konfigurasi database dapat disesuaikan melalui "settings.js".

🌐 Self-Hosting File / Image

Jika kamu tidak ingin menggunakan layanan hosting eksternal untuk menyimpan image atau file, kamu dapat membuat server sendiri menggunakan Express.js.

Voxel-Beta memiliki struktur server yang dapat digunakan sebagai dasar untuk kebutuhan tersebut.

Namun, konfigurasi dan setup self-hosting harus dilakukan sendiri sesuai kebutuhan, termasuk:

- Routing
- Penyimpanan file
- Upload file
- Akses publik
- Domain atau IP
- HTTPS jika diperlukan

📁 Struktur Utama

Voxel-Beta/
├── lib/
│   ├── converter.js
│   ├── exif.js
│   ├── function.js
│   ├── game.js
│   ├── math.js
│   ├── scraper.js
│   ├── template_menu.js
│   └── tictactoe.js
├── src/
│   ├── media/
│   ├── nulis/
│   ├── antispam.js
│   ├── database.js
│   ├── message.js
│   └── server.js
├── index.js
├── naze.js
├── start.js
├── settings-example.js
├── package.json
└── speed.py

⚠️ Catatan

- Gunakan Node.js versi 20 atau lebih baru jika dependency membutuhkan versi tersebut.
- Jika menggunakan Termux dan instalasi native mengalami masalah, gunakan PRoot-Distro.
- Gunakan Yarn sebagai package manager yang direkomendasikan.
- Pastikan Python 3 tersedia sebelum menjalankan instalasi dependency.
- Jangan membagikan "settings.js" karena dapat berisi API Key dan konfigurasi sensitif.
- Untuk deployment jangka panjang, gunakan PM2 agar bot dapat berjalan di background dan otomatis di-restart.

👤 Author

Saryu

🔗 Credits

Forked from Nazedev/hitori

Git Fork:

https://github.com/nazedev/hitori

Original project:

https://github.com/nazedev/hitori

---

«Voxel-Beta dikembangkan dengan fokus pada efisiensi, stabilitas, dan kemudahan pengembangan lebih lanjut.»
