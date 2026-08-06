import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Edit({ review, products }) {
    const { data, setData, put, processing, errors } = useForm({
        product_id: review.product_id || '',
        rating: review.rating || 5,
        comment: review.comment || '',
    });

    const [confirmingSave, setConfirmingSave] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setConfirmingSave(true);
    };

    const confirmUpdate = () => {
        put(route('admin.reviews.update', review.id), {
            onSuccess: () => setConfirmingSave(false),
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Review</h2>}
        >
            <Head title="Edit Review" />

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
                                        Save Changes
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

            <Modal show={confirmingSave} onClose={() => setConfirmingSave(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Confirm Changes
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Are you sure you want to save the changes you made to this review?
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
