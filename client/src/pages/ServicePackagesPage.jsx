import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Check, Star, ArrowRight, Loader, X, User } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { API_BASE_URL } from '../config';

const ServicePackagesPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [packages, setPackages] = useState([]);
    const [gardeners, setGardeners] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [selectedGardener, setSelectedGardener] = useState(null);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pkgRes, gardenerRes] = await Promise.all([
                    axios.get(`${API_BASE_URL}/api/services/packages`),
                    axios.get(`${API_BASE_URL}/api/users/gardeners`)
                ]);
                setPackages(pkgRes.data);
                setGardeners(gardenerRes.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);

                // Fallback for demo if users/gardeners fetch fails or is empty
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSelectPackage = (pkg) => {
        if (!user) {
            navigate('/login');
            return;
        }
        setSelectedPackage(pkg);
        setIsModalOpen(true);
    };

    const handleConfirmBooking = async () => {
        if (!selectedGardener) return;

        setBookingLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            };

            await axios.post(`${API_BASE_URL}/api/services/request`, {
                service_type: 'package',
                package_id: selectedPackage._id,
                gardener_id: selectedGardener._id,
                date: new Date()
            }, config);

            setSuccessMessage(`Request sent to ${selectedGardener.name}!`);
            setTimeout(() => {
                setIsModalOpen(false);
                setSuccessMessage('');
                setSelectedPackage(null);
                setSelectedGardener(null);
            }, 2000);
        } catch (error) {
            console.error('Error booking:', error);
            alert('Failed to book service. Please try again.');
        } finally {
            setBookingLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            <Navbar />

            {/* Header */}
            <div className="bg-green-700 py-16 text-center text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight">Curated Plant Packages</h1>
                    <p className="mt-4 text-xl text-green-100 max-w-2xl mx-auto">
                        Professionally designed green spaces, ready to be installed in your home.
                    </p>
                </div>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex-grow flex items-center justify-center">
                    <Loader className="w-12 h-12 text-green-600 animate-spin" />
                </div>
            ) : (
                /* Packages Grid */
                <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {packages.map((pkg) => (
                            <div key={pkg._id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow flex flex-col">
                                {/* Image */}
                                <div className="h-48 bg-gray-200 relative">
                                    <img
                                        src={pkg.image_url || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'}
                                        alt={pkg.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-green-700 shadow-sm">
                                        {pkg.recommended_size}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                                    <p className="text-gray-500 mb-6 line-clamp-2">{pkg.description}</p>

                                    <div className="space-y-3 mb-8 flex-grow">
                                        {pkg.features && pkg.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start">
                                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                                                    <Check className="w-3 h-3 text-green-600" />
                                                </div>
                                                <span className="ml-3 text-sm text-gray-600">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-gray-100 pt-6 flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-gray-500 uppercase font-semibold">Price</span>
                                            <div className="text-2xl font-bold text-green-700 flex flex-col">
                                                {user?.isPremium ? (
                                                    <>
                                                        <span className="text-gray-400 line-through text-sm font-normal">৳{pkg.price.toLocaleString()}</span>
                                                        <span>৳{(pkg.price * 0.7).toLocaleString()}</span>
                                                    </>
                                                ) : (
                                                    <span>৳{pkg.price.toLocaleString()}</span>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleSelectPackage(pkg)}
                                            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 shadow-sm transition-colors"
                                        >
                                            Select <ArrowRight className="ml-2 w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Gardener Selection Modal */}
            {isModalOpen && selectedPackage && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}></div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full relative z-10">

                            {/* Modal Header */}
                            <div className="bg-green-600 px-4 py-3 sm:px-6 flex justify-between items-center">
                                <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
                                    Select a Gardener
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-green-100 hover:text-white">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-[60vh] overflow-y-auto">
                                {successMessage ? (
                                    <div className="text-center py-8">
                                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                                            <Check className="h-8 w-8 text-green-600" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900">{successMessage}</h3>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-sm text-gray-500 mb-4">
                                            Choose an available gardener for your <strong>{selectedPackage.name}</strong> service.
                                        </p>

                                        <div className="space-y-3">
                                            {gardeners.length === 0 ? (
                                                <p className="text-center text-gray-500 py-4">No gardeners available right now.</p>
                                            ) : (
                                                gardeners.map((gardener) => (
                                                    <div
                                                        key={gardener._id}
                                                        onClick={() => setSelectedGardener(gardener)}
                                                        className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${selectedGardener?._id === gardener._id
                                                            ? 'border-green-500 bg-green-50 ring-1 ring-green-500'
                                                            : 'border-gray-200 hover:border-green-300'
                                                            }`}
                                                    >
                                                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full overflow-hidden">
                                                            {gardener.profilePicture ? (
                                                                <img src={gardener.profilePicture} alt={gardener.name} className="h-full w-full object-cover" />
                                                            ) : (
                                                                <div className="h-full w-full flex items-center justify-center bg-green-100 text-green-700 font-bold">
                                                                    {gardener.name.charAt(0)}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="ml-3 flex-grow">
                                                            <div className="text-sm font-medium text-gray-900">{gardener.name}</div>
                                                            <div className="text-xs text-gray-500 flex items-center">
                                                                <Star className="h-3 w-3 text-yellow-500 mr-1" /> 4.9 (Demo)
                                                            </div>
                                                        </div>
                                                        {selectedGardener?._id === gardener._id && (
                                                            <Check className="h-5 w-5 text-green-600" />
                                                        )}
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Modal Footer */}
                            {!successMessage && (
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        disabled={!selectedGardener || bookingLoading}
                                        onClick={handleConfirmBooking}
                                        className={`w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${!selectedGardener ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                                            }`}
                                    >
                                        {bookingLoading ? 'Sending...' : 'Confirm Request'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="mt-3 w-full inline-flex justify-center rounded-xl border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default ServicePackagesPage;
