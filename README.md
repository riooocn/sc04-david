# Katalog Produk Multi-Filter (LaraShop)

Proyek ini adalah implementasi sistem **Katalog Produk Multi-Filter** dengan fokus utama pada optimasi *query database* (mencegah masalah N+1 Query) dan desain API/Filter yang dinamis. Proyek ini dibangun menggunakan **Laravel 11**, **React**, dan **Inertia.js**, dipadukan dengan desain *UI modern* menggunakan **TailwindCSS**.

## 📌 Deskripsi Singkat & Requirement

Proyek ini dibuat untuk menjawab tantangan fungsional berikut:

- **CRUD Produk**: Manajemen data produk (nama, harga, stok).
- **Relasi Database Kompleks**: 
  - Satu produk memiliki banyak kategori (Many-to-Many).
  - Satu produk memiliki banyak ulasan / review (One-to-Many).
- **Endpoint List Produk Dinamis**: Mendukung kombinasi filter yang dinamis (Kategori, Rentang Harga, Rating Rata-rata Minimum, dan Pencarian Keyword). Semua filter bersifat opsional dan dapat digabung secara bersamaan.
- **Optimasi N+1 Query**: Data respons secara langsung (melalui database query) menampilkan nilai agregat rating rata-rata dan jumlah review *tanpa* mengulangi query secara individual (menggunakan `withCount` dan `withAvg`).
- **Sorting & Pagination**: Mendukung pengurutan berdasarkan harga, rating, dan produk terbaru. Diimplementasikan bersamaan dengan fitur *Pagination*.
- **Sistem Caching Berbasis Redis**: Response *list* produk di-cache secara menyeluruh. Sistem *cache* akan di-invalidate secara otomatis apabila terdapat penambahan data produk atau review baru menggunakan sistem **Laravel Observers** dan *Cache Tags*.

## 🛠️ Stack Teknologi

- **Backend**: Laravel 11, PHP 8.3
- **Frontend**: React.js, Inertia.js, Vite
- **Styling**: TailwindCSS
- **Database**: MySQL
- **Caching**: Redis

## 🚀 Cara Instalasi (Installation Guide)

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di *local environment* Anda.

### 1. Prasyarat (Prerequisites)
Pastikan sistem Anda sudah menginstall perangkat lunak berikut:
- PHP >= 8.2
- Composer
- Node.js & NPM
- MySQL Server
- Redis Server (Wajib berjalan di *background* untuk sistem Caching)

### 2. Kloning Repositori
```bash
git clone https://github.com/username/sc04-nama.git
cd sc04-nama
```

### 3. Setup Backend (Laravel)
Jalankan perintah berikut untuk menginstal seluruh *dependency* PHP:
```bash
composer install
```

Salin file *environment* bawaan:
```bash
cp .env.example .env
```

Buka file `.env` Anda dan pastikan konfigurasi Database dan Redis sudah sesuai dengan lingkungan lokal Anda:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sc04_david
DB_USERNAME=root
DB_PASSWORD=

CACHE_STORE=redis
CACHE_PREFIX=
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
```
*(Catatan: Anda harus membuat database kosong bernama `sc04_david` di MySQL Anda terlebih dahulu).*

*Generate Application Key:*
```bash
php artisan key:generate
```

### 4. Menyiapkan Database & Dummy Data
Proyek ini sudah dilengkapi dengan *Seeder* untuk membuat data *dummy* produk (Kategori asli, Nama elektronik realistis, Harga proporsional, dan URL gambar *placeholder*).

Jalankan perintah ini untuk melakukan migrasi tabel sekaligus menanamkan data *seed*:
```bash
php artisan migrate:fresh --seed
```

### 5. Setup Frontend (React + Vite)
Instal seluruh modul Node.js yang dibutuhkan oleh Vite & React:
```bash
npm install
```

### 6. Menjalankan Server Lokal
Aplikasi ini membutuhkan dua buah *service* yang berjalan berdampingan secara terus-menerus. Bukalah **2 terminal** secara terpisah di dalam folder proyek Anda:

**Terminal 1 (Backend - PHP Server):**
```bash
php artisan serve
```

**Terminal 2 (Frontend - Vite Server):**
```bash
npm run dev
```

Aplikasi sekarang sudah dapat diakses dan digunakan! Buka browser Anda dan kunjungi:  
👉 **`http://127.0.0.1:8000`**

---
*Dibuat dan didesain untuk keperluan evaluasi technical skills kasus Backend / Fullstack.*
