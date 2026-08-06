import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        image_url: '',
        price: '',
        stock: '',
        category_ids: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    const handleCategoryChange = (e) => {
        const id = parseInt(e.target.value);
        if (e.target.checked) {
            setData('category_ids', [...data.category_ids, id]);
        } else {
            setData('category_ids', data.category_ids.filter((categoryId) => categoryId !== id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Product</h2>}
        >
            <Head title="Create Product" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={submit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Title</label>
                                        <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                        {errors.title && <div className="text-red-600 text-sm mt-1">{errors.title}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Price</label>
                                        <input type="number" step="0.01" value={data.price} onChange={e => setData('price', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                        {errors.price && <div className="text-red-600 text-sm mt-1">{errors.price}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                                        <input type="number" value={data.stock} onChange={e => setData('stock', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                        {errors.stock && <div className="text-red-600 text-sm mt-1">{errors.stock}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                        <input type="url" value={data.image_url} onChange={e => setData('image_url', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                        {errors.image_url && <div className="text-red-600 text-sm mt-1">{errors.image_url}</div>}
                                    </div>
                                    
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea rows="4" value={data.description} onChange={e => setData('description', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                        {errors.description && <div className="text-red-600 text-sm mt-1">{errors.description}</div>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {categories.map((cat) => (
                                                <label key={cat.id} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        value={cat.id}
                                                        checked={data.category_ids.includes(cat.id)}
                                                        onChange={handleCategoryChange}
                                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    />
                                                    <span className="text-sm text-gray-700">{cat.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.category_ids && <div className="text-red-600 text-sm mt-1">{errors.category_ids}</div>}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mt-6">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        Save
                                    </button>
                                    <Link href={route('admin.products.index')} className="text-gray-600 hover:text-gray-900">
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
