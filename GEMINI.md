# Gemini Agent Guidelines (GEMINI.md)

Dokumen ini berisi catatan instruksi teknis untuk AI (Gemini) selama proses pengembangan proyek `sc04-david`.

## Fokus Utama (Prioritas Tinggi)
1. **Pencegahan N+1 Query**:
   - Dilarang menggunakan `$product->reviews->count()` atau `$product->reviews->avg('rating')` di perulangan PHP/Blade/React.
   - **Solusi Wajib**: Gunakan Eloquent `withCount('reviews')` dan `withAvg('reviews', 'rating')` pada *Query Builder* di Controller.
2. **Strategi Caching**:
   - Cache hasil list produk. Generate *cache key* berdasarkan seluruh input filter yang digunakan (misal `md5(json_encode(request()->all()))`).
   - Gunakan *Cache Tags* (misal: `Cache::tags(['products'])`).
   - Implementasikan Laravel **Observers** pada model `Product` dan `Review`. Pada method `created`, `updated`, `deleted`, lakukan eksekusi: `Cache::tags(['products'])->flush()`.
3. **Filter Dinamis**:
   - Gunakan fitur `when()` dari Eloquent untuk menambahkan kondisi filter secara dinamis hanya jika parameter URL ada nilainya.
   - Relasi Many-to-Many (kategori): Gunakan `whereHas('categories', fn($q) => $q->whereIn('categories.id', $requestedIds))`.

## Langkah Pengerjaan
1. Selesaikan instalasi Laravel & Breeze (React).
2. Buat *Schema Migrations* untuk `categories`, `category_product`, dan `reviews`.
3. Definisikan relasi di Eloquent Models.
4. Buat Factory & DatabaseSeeder untuk menghasilkan data *dummy* dalam jumlah memadai.
5. Bangun logika Controller (Produk) untuk menampilkan data ter-filter, ter-sortir, dan ter-cache.
6. Buat halaman tampilan UI dengan React + TailwindCSS yang terhubung via Inertia.js.
