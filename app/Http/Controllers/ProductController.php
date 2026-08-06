<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $cacheKey = 'products_' . md5(json_encode($request->all()));

        $products = Cache::tags(['products'])->remember($cacheKey, now()->addHours(1), function () use ($request) {
            $query = Product::with('categories')
                ->withCount('reviews')
                ->withAvg('reviews', 'rating');

            // Filter: Keyword Search
            $query->when($request->filled('keyword'), function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->keyword . '%')
                  ->orWhere('description', 'like', '%' . $request->keyword . '%');
            });

            // Filter: Categories
            $query->when($request->filled('category_ids'), function ($q) use ($request) {
                $categoryIds = is_array($request->category_ids) ? $request->category_ids : explode(',', $request->category_ids);
                $q->whereHas('categories', function ($q2) use ($categoryIds) {
                    $q2->whereIn('categories.id', $categoryIds);
                });
            });

            // Filter: Price Range
            $query->when($request->filled('min_price'), function ($q) use ($request) {
                $q->where('price', '>=', $request->min_price);
            });
            $query->when($request->filled('max_price'), function ($q) use ($request) {
                $q->where('price', '<=', $request->max_price);
            });

            // Filter: Minimum Average Rating
            $query->when($request->filled('min_rating'), function ($q) use ($request) {
                $q->having('reviews_avg_rating', '>=', $request->min_rating);
            });

            // Sorting
            $sort = $request->input('sort', 'newest');
            if ($sort === 'price_asc') {
                $query->orderBy('price', 'asc');
            } elseif ($sort === 'price_desc') {
                $query->orderBy('price', 'desc');
            } elseif ($sort === 'rating') {
                $query->orderByDesc('reviews_avg_rating');
            } else {
                $query->latest();
            }

            return $query->paginate(12)->withQueryString()->toArray();
        });

        $categories = Cache::remember('categories_all', now()->addHours(24), function () {
            return \App\Models\Category::all()->toArray();
        });

        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->all(),
        ]);
    }
}
