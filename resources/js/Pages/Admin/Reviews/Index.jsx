import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Index({ reviews }) {
    const { delete: destroy } = useForm();
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const confirmDelete = (id) => {
        setDeletingId(id);
        setConfirmingDeletion(true);
    };

    const deleteItem = () => {
        destroy(route('admin.reviews.destroy', deletingId), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const closeModal = () => {
        setConfirmingDeletion(false);
        setDeletingId(null);
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Reviews</h2>}
        >
            <Head title="Reviews" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Review List</h3>
                                <Link
                                    href={route('admin.reviews.create')}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Add New Review
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {reviews.data.map((review) => (
                                        <tr key={review.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{review.product?.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.rating} / 5</td>
                                            <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{review.comment}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex gap-2">
                                                    <Link 
                                                        href={route('admin.reviews.edit', review.id)} 
                                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button 
                                                        onClick={() => confirmDelete(review.id)} 
                                                        className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                            
                            <div className="mt-4">
                                <div className="flex gap-2">
                                    {reviews.links.map((link, i) => (
                                        <Link 
                                            key={i} 
                                            href={link.url || '#'} 
                                            className={`px-3 py-1 border rounded ${link.active ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'} ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={confirmingDeletion} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete this review?
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Once this review is deleted, all of its resources and data will be permanently deleted.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <DangerButton className="ml-3" onClick={deleteItem}>
                            Delete Review
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
