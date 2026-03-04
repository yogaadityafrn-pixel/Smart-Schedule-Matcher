# 🗓️ MeetSync Elite: Smart Schedule Matcher

**MeetSync Elite** adalah aplikasi web berbasis *client-side* yang dirancang untuk menyelesaikan masalah klasik mahasiswa dan organisasi: **Menentukan waktu rapat yang pas.** Aplikasi ini memungkinkan banyak pengguna untuk membagikan jadwal sibuk mereka dan secara otomatis menemukan "irisan" waktu kosong di mana semua orang bisa hadir.



## 🚀 Fitur Utama
* **Drag-to-Select Interface**: Pengalaman pengguna yang intuitif untuk menandai jadwal sibuk hanya dengan menggeser kursor atau jari (pada perangkat *mobile*).
* **Stateless Architecture**: Tidak memerlukan *database* atau *backend*. Semua data jadwal dienkripsi menggunakan Base64 dan disimpan langsung di dalam URL parameters.
* **Smart Intersection Algorithm**: Algoritma cerdas yang membandingkan matriks waktu dari semua partisipan untuk menampilkan slot waktu yang 100% kosong.
* **Mobile-First Design**: Antarmuka responsif yang tetap nyaman digunakan di layar ponsel dengan fitur *swipeable calendar*.
* **Custom Toast Notifications**: Sistem notifikasi kustom untuk pengalaman pengguna yang lebih halus dan modern.

## 🛠️ Teknologi yang Digunakan
* **HTML5 & CSS3**: Menggunakan CSS Grid, Flexbox, dan variabel CSS untuk desain dashboard SaaS yang modern.
* **Vanilla JavaScript**: Logika murni untuk manipulasi DOM, penanganan *touch events*, dan algoritma irisan tanpa *library* eksternal.
* **Phosphor Icons**: Untuk set ikon yang konsisten dan profesional.
* **URL API**: Memanfaatkan `URLSearchParams` untuk sinkronisasi data antar pengguna.

## 📖 Cara Penggunaan
1.  Buka aplikasi dan masukkan nama Anda.
2.  Tandai jadwal sibuk Anda (kuliah, organisasi, atau janji lain) pada grid kalender.
3.  Klik **"Bagikan Jadwal"** untuk mendapatkan *link* khusus.
4.  Kirim *link* tersebut ke anggota tim lainnya.
5.  Setelah semua mengisi, klik **"Cari Waktu Rapat"** untuk melihat hasil irisan waktu (berwarna hijau).

## 🏁 Instalasi Lokal
Jika Anda ingin menjalankan proyek ini di komputer lokal:
1. Clone repositori ini:
   ```bash
   git clone [https://github.com/username/meetsync-elite.git](https://github.com/username/meetsync-elite.git)
