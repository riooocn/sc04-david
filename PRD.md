# Product Requirements Document (PRD)
## Katalog Produk Multi-Filter (sc04-david)

### 1. Tujuan Produk
Membangun sebuah sistem backend (dan frontend minimalis) untuk katalog produk yang mendukung pencarian dan penyaringan data secara dinamis, kompleks, namun tetap berperforma tinggi (teroptimasi).

### 2. Kebutuhan Fungsional (Functional Requirements)
- **Manajemen Data (CRUD)**: 
  - Produk (nama, harga, deskripsi, stok).
  - Kategori Produk.
  - Review Produk (komentar, rating 1-5).
- **Relasi Data**:
  - Produk ke Kategori: *Many-to-Many* (satu produk bisa memiliki banyak kategori, dan sebaliknya).
  - Produk ke Review: *One-to-Many* (satu produk memiliki banyak review).
- **Endpoint Katalog (`GET /api/products` atau setara di Inertia)**:
  - **Filter**: Kategori, rentang harga (min & max), rata-rata rating minimum, pencarian keyword.
  - **Kondisi Filter**: Semua filter bersifat opsional dan dapat digabungkan (kombinasi).
  - **Sorting**: Berdasarkan Harga, Rating, atau Terbaru.
  - **Pagination**: Wajib (misal 12 atau 15 produk per halaman).
- **Optimasi & Performa**:
  - Response harus menampilkan rata-rata rating dan jumlah review **tanpa memicu N+1 query problem**.
  - Response list produk harus di-cache.
  - Cache harus ter-invalidate (dibersihkan) secara otomatis ketika ada penambahan/perubahan pada produk atau review.

### 3. Kebutuhan Non-Fungsional (Non-Functional Requirements)
- **Framework**: Laravel + Starter Kit Breeze (React / Inertia.js).
- **Database**: MySQL.

### 4. Target Pengguna
- Pengunjung web yang ingin mencari produk dengan spesifikasi atau kriteria tertentu dengan cepat.
