import React, { useState, useEffect, useRef } from 'react';
import { Head, router } from '@inertiajs/react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', background: 'red', color: 'white' }}>
                    <h2>Something went wrong in React:</h2>
                    <pre>{this.state.error && this.state.error.toString()}</pre>
                    <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
                </div>
            );
        }
        return this.props.children;
    }
}

function ProductIndex({ products, categories, filters }) {
    const [searchParams, setSearchParams] = useState({
        keyword: filters?.keyword || '',
        category_ids: Array.isArray(filters?.category_ids) 
            ? filters.category_ids 
            : (filters?.category_ids ? filters.category_ids.split(',') : []),
        min_price: filters?.min_price || '',
        max_price: filters?.max_price || '',
        min_rating: filters?.min_rating || '',
        sort: filters?.sort || 'newest',
    });

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const handler = setTimeout(() => {
            const queryParams = {};
            if (searchParams.keyword) queryParams.keyword = searchParams.keyword;
            if (searchParams.category_ids.length > 0) queryParams.category_ids = searchParams.category_ids.join(',');
            if (searchParams.min_price) queryParams.min_price = searchParams.min_price;
            if (searchParams.max_price) queryParams.max_price = searchParams.max_price;
            if (searchParams.min_rating) queryParams.min_rating = searchParams.min_rating;
            if (searchParams.sort && searchParams.sort !== 'newest') queryParams.sort = searchParams.sort;

            router.get('/products', queryParams, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 500);

        return () => clearTimeout(handler);
    }, [searchParams]);

    const handleFilterChange = (key, value) => {
        setSearchParams(prev => ({ ...prev, [key]: value }));
    };

    const handleCategoryToggle = (id) => {
        setSearchParams(prev => {
            const newCategoryIds = prev.category_ids.includes(id.toString())
                ? prev.category_ids.filter(cId => cId !== id.toString())
                : [...prev.category_ids, id.toString()];
            return { ...prev, category_ids: newCategoryIds };
        });
    };

    const categoryList = Array.isArray(categories) ? categories : Object.values(categories || {});
    const productList = Array.isArray(products?.data) ? products.data : Object.values(products?.data || {});
    const linksList = Array.isArray(products?.links) ? products.links : Object.values(products?.links || {});

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <Head title="Product Catalog" />
            <header className="bg-white shadow-sm sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        LaraShop
                    </h1>
                    <div className="w-full max-w-md ml-8">
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2 rounded-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm text-sm"
                                placeholder="Search products..."
                                value={searchParams.keyword}
                                onChange={(e) => handleFilterChange('keyword', e.target.value)}
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Categories</h2>
                        <div className="space-y-3 max-h-60 overflow-y-auto pl-1 py-1 pr-3 -ml-1 custom-scrollbar">
                            {categoryList.map(category => (
                                <label key={category.id} className="flex items-center group cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 transition-colors cursor-pointer"
                                        checked={searchParams.category_ids.includes(category.id.toString())}
                                        onChange={() => handleCategoryToggle(category.id)}
                                    />
                                    <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{category.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Price Range</h2>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                placeholder="Min"
                                className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm shadow-sm transition-shadow"
                                value={searchParams.min_price}
                                onChange={(e) => handleFilterChange('min_price', e.target.value)}
                            />
                            <span className="text-gray-400">-</span>
                            <input
                                type="number"
                                placeholder="Max"
                                className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm shadow-sm transition-shadow"
                                value={searchParams.max_price}
                                onChange={(e) => handleFilterChange('max_price', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Rating</h2>
                        <select
                            className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm shadow-sm transition-shadow"
                            value={searchParams.min_rating}
                            onChange={(e) => handleFilterChange('min_rating', e.target.value)}
                        >
                            <option value="">Any Rating</option>
                            <option value="4">4 Stars & Up</option>
                            <option value="3">3 Stars & Up</option>
                            <option value="2">2 Stars & Up</option>
                            <option value="1">1 Star & Up</option>
                        </select>
                    </div>
                </aside>

                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-semibold text-gray-900">{products?.total}</span> products
                        </p>
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-500">Sort by:</label>
                            <select
                                className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm py-1.5 shadow-sm transition-shadow"
                                value={searchParams.sort}
                                onChange={(e) => handleFilterChange('sort', e.target.value)}
                            >
                                <option value="newest">Newest Arrivals</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                            </select>
                        </div>
                    </div>

                    {productList.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                            <p className="mt-1 text-gray-500">Try adjusting your filters or search terms.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {productList.map(product => {
                                    const prodCategories = Array.isArray(product.categories) ? product.categories : Object.values(product.categories || {});
                                    return (
                                    <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col h-full">
                                        <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden flex items-center justify-center p-0">
                                            {product.image_url ? (
                                                <img src={product.image_url} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-24 h-24 bg-gray-200 rounded-full group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                                                    <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                    </svg>
                                                </div>
                                            )}
                                            {prodCategories.length > 0 && (
                                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-indigo-700 shadow-sm border border-indigo-50">
                                                    {prodCategories[0].name}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="p-5 flex flex-col flex-1">
                                            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-indigo-600 transition-colors">
                                                {product.title}
                                            </h3>
                                            
                                            <div className="flex items-center gap-1.5 mt-2 mb-4">
                                                <svg className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-sm font-medium text-gray-700">
                                                    {product.reviews_avg_rating ? Number(product.reviews_avg_rating).toFixed(1) : 'N/A'}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    ({product.reviews_count} {product.reviews_count === 1 ? 'review' : 'reviews'})
                                                </span>
                                            </div>

                                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                                <span className="text-lg font-bold text-gray-900">
                                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(product.price)}
                                                </span>
                                                <button className="h-8 w-8 rounded-full bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white flex items-center justify-center transition-colors">
                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )})}
                            </div>

                            <div className="mt-12 flex justify-center">
                                <div className="inline-flex items-center justify-center space-x-1 bg-white px-2 py-1.5 rounded-xl shadow-sm border border-gray-100">
                                    {linksList.map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                if (link.url) router.get(link.url, {}, { preserveScroll: true, preserveState: true });
                                            }}
                                            disabled={!link.url}
                                            className={`
                                                px-3 py-1.5 text-sm font-medium rounded-lg transition-colors
                                                ${link.active 
                                                    ? 'bg-indigo-600 text-white shadow-md' 
                                                    : 'text-gray-600 hover:bg-gray-100'
                                                }
                                                ${!link.url && 'opacity-50 cursor-not-allowed'}
                                            `}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

export default function Index(props) {
    return (
        <ErrorBoundary>
            <ProductIndex {...props} />
        </ErrorBoundary>
    );
}
