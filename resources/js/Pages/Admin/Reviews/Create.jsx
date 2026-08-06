import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ products }) {
    const { data, setData, post, processing, errors } = useForm({
        product_id: '',
        rating: 5,
        comment: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.reviews.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Review</h2>}
        >
            <Head title="Create Review" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={submit}>
                                <div className="grid grid-cols-1 gap-6 max-w-xl">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Product</label>
                                        <select 
                                            value={data.product_id} 
                                            onChange={e => setData('product_id', e.target.value)} 
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Select a product</option>
                                            {products.map(p => (
                                                <option key={p.id} value={p.id}>{p.title}</option>
                                            ))}
                                        </select>
                                        {errors.product_id && <div className="text-red-600 text-sm mt-1">{errors.product_id}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
                                        <input 
                                            type="number" 
                                            min="1" max="5" 
                                            value={data.rating} 
                                            onChange={e => setData('rating', e.target.value)} 
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                                        />
                                        {errors.rating && <div className="text-red-600 text-sm mt-1">{errors.rating}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Comment</label>
                                        <textarea 
                                            rows="4" 
                                            value={data.comment} 
                                            onChange={e => setData('comment', e.target.value)} 
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                                        />
                                        {errors.comment && <div className="text-red-600 text-sm mt-1">{errors.comment}</div>}
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
                                    <Link href={route('admin.reviews.index')} className="text-gray-600 hover:text-gray-900">
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
