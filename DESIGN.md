# Design Document (Frontend UI/UX)
## React + Inertia.js (Breeze Starter Kit)

### 1. Konsep Visual
- **Tema**: Modern, E-commerce Minimalist (bersih, dominasi *white-space*).
- **Warna**: Neutral tones (Tailwind default `gray-50` s/d `gray-900`) dipadu dengan warna *primary* yang solid (misal Indigo atau Blue).

### 2. Struktur Halaman (Layout)
Halaman Katalog Produk akan dibagi menjadi 3 bagian utama:
1. **Header**: Search bar pencarian (Keyword Search).
2. **Sidebar Kiri (Filter)**:
   - Filter Kategori (Checkboxes / Select).
   - Filter Rentang Harga (Input `min` dan `max`).
   - Filter Rating (Radio buttons: 4 Bintang ke atas, 3 Bintang ke atas, dst).
   - Tombol "Terapkan Filter" dan "Reset".
3. **Main Content (Kanan)**:
   - Header kecil berisi **Sort Dropdown** (Harga Termurah, Termahal, Rating Tertinggi, Terbaru).
   - **Product Grid**: Grid responsif (1 kolom di mobile, 3-4 kolom di desktop).
   - **Product Card**: Menampilkan Gambar Placeholder, Nama, Harga, Rata-rata Rating (icon Bintang + teks), dan Jumlah Review.
   - **Pagination**: Tombol navigasi halaman di bagian bawah grid.

### 3. Mekanisme State & Interaktivitas (React)
- **URL-Driven State**: Mengingat banyak filter, state sebaiknya direfleksikan pada URL Query Parameters agar pengguna bisa membagikan link hasil filter (contoh: `?search=baju&min_price=50000&sort=price_asc`).
- **Inertia.js Router**: Menggunakan `router.get('/products', filterData, { preserveState: true, preserveScroll: true })` agar filter tidak melakukan *full page reload* (terasa seperti SPA).
- **Debounce**: Untuk input pencarian nama produk, kita dapat mengaplikasikan fitur *debounce* (misal 300ms) agar tidak terlalu sering memukul server/database saat user mengetik.
