import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Edit({ product, categories }) {
    const { data, setData, put, processing, errors } = useForm({
        title: product.title || '',
        description: product.description || '',
        image_url: product.image_url || '',
        price: product.price || '',
        stock: product.stock || '',
        category_ids: product.categories ? product.categories.map(c => c.id) : [],
    });

    const [confirmingSave, setConfirmingSave] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setConfirmingSave(true);
    };

    const confirmUpdate = () => {
        put(route('admin.products.update', product.id), {
            onSuccess: () => setConfirmingSave(false),
        });
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Product</h2>}
        >
            <Head title="Edit Product" />

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
                                        Save Changes
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

            <Modal show={confirmingSave} onClose={() => setConfirmingSave(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Confirm Changes
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Are you sure you want to save the changes you made to this product?
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setConfirmingSave(false)}>Cancel</SecondaryButton>
                        <button 
                            onClick={confirmUpdate}
                            disabled={processing}
                            className="ml-3 inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            {processing ? 'Saving...' : 'Yes, Save Changes'}
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
