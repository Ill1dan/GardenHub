import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Ruler, TreePine, DollarSign, Send, CheckCircle, User as UserIcon, X, MapPin } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { API_BASE_URL } from '../config';

const ManualServicePage = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    // Form State
    const [formData, setFormData] = useState({
        area_type: 'Balcony',
        area_size: '',
        requirements: '',
        budget_range: 'Medium (Standard)'
    });

    // Data State
    const [gardeners, setGardeners] = useState([]);
    const [selectedGardener, setSelectedGardener] = useState(null);

    // UI State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadingGardeners, setLoadingGardeners] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // Fetch Gardeners
        const fetchGardeners = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/users/gardeners`);
                setGardeners(res.data);
                setLoadingGardeners(false);
            } catch (error) {
                console.error('Error fetching gardeners:', error);
                setLoadingGardeners(false);
            }
        };

        fetchGardeners();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelect = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleInitialSubmit = (e) => {
        e.preventDefault();
        // Validate logged in
        if (!user) {
            navigate('/login');
            return;
        }
        setIsModalOpen(true);
    };

    const handleConfirmRequest = async () => {
        if (!selectedGardener) return;

        setSubmitting(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            };

            await axios.post(`${API_BASE_URL}/api/services/request`, {
                service_type: 'manual',
                gardener_id: selectedGardener._id,
                custom_details: {
                    area_type: formData.area_type,
                    area_size: formData.area_size,
                    requirements: formData.requirements,
                    budget_range: formData.budget_range
                },
                date: new Date()
            }, config);

            setIsModalOpen(false);
            setSubmitted(true);
            setSubmitting(false);
        } catch (error) {
            console.error('Error submitting request:', error);
            alert('Failed to submit request. Please try again.');
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex flex-col font-sans bg-gray-50">
                <Navbar />
                <div className="flex-grow flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Sent!</h2>
                        <p className="text-gray-500 mb-8">
                            Your request has been sent to <strong>{selectedGardener?.name}</strong>. They will review your requirements for a {formData.area_type} plantation and respond shortly.
                        </p>
                        <button
                            onClick={() => navigate('/services')}
                            className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition"
                        >
                            Return to Services
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            <Navbar />

            <div className="bg-emerald-800 py-12 text-center text-white">
                <h1 className="text-3xl md:text-4xl font-extrabold">Build Your Green Space</h1>
                <p className="mt-2 text-emerald-100">Tell us what you need, and pick an expert to make it happen.</p>
            </div>

            <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 w-full py-12">
                <form onSubmit={handleInitialSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

                    {/* Step 1: Area Type */}
                    <div className="p-8 border-b border-gray-100">
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold mr-4">1</div>
                            <h2 className="text-xl font-bold text-gray-800">What kind of space is it?</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['Balcony', 'Rooftop', 'Indoor', 'Lawn/Garden'].map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => handleSelect('area_type', type)}
                                    className={`py-4 px-2 rounded-xl border-2 transition-all font-medium ${formData.area_type === type
                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                        : 'border-gray-200 hover:border-emerald-200 text-gray-600'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Step 2: Details */}
                    <div className="p-8 border-b border-gray-100">
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold mr-4">2</div>
                            <h2 className="text-xl font-bold text-gray-800">Space Details</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Approximate Size (sq ft)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Ruler className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="area_size"
                                        value={formData.area_size}
                                        onChange={handleChange}
                                        placeholder="e.g., 120"
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <DollarSign className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <select
                                        name="budget_range"
                                        value={formData.budget_range}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                                    >
                                        <option>Low (Basic)</option>
                                        <option>Medium (Standard)</option>
                                        <option>High (Premium)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Specifics */}
                    <div className="p-8">
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold mr-4">3</div>
                            <h2 className="text-xl font-bold text-gray-800">Your Vision</h2>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Describe your requirements or preferences</label>
                            <textarea
                                name="requirements"
                                value={formData.requirements}
                                onChange={handleChange}
                                rows="4"
                                className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="E.g., I want flowering plants, a small seating area, and automated watering..."
                            ></textarea>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-8 py-6 bg-gray-50 flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-emerald-200 transform transition hover:-translate-y-1"
                        >
                            Select Gardener <UserIcon className="ml-2 h-5 w-5" />
                        </button>
                    </div>

                </form>
            </div>

            {/* Gardener Selection Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}></div>

                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full relative z-10">

                            {/* Modal Header */}
                            <div className="bg-emerald-600 px-4 py-3 sm:px-6 flex justify-between items-center">
                                <h3 className="text-lg leading-6 font-bold text-white">Select a Gardener</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-white hover:text-emerald-100">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-[60vh] overflow-y-auto">
                                <p className="text-sm text-gray-500 mb-4">Choose an expert gardener to handle your request:</p>

                                {loadingGardeners ? (
                                    <div className="text-center py-4">Loading gardeners...</div>
                                ) : (
                                    <div className="space-y-3">
                                        {gardeners.map((gardener) => (
                                            <div
                                                key={gardener._id}
                                                onClick={() => setSelectedGardener(gardener)}
                                                className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${selectedGardener?._id === gardener._id
                                                    ? 'border-emerald-500 bg-emerald-50'
                                                    : 'border-gray-100 hover:border-emerald-200'
                                                    }`}
                                            >
                                                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold mr-3 overflow-hidden">
                                                    {gardener.profilePicture ? (
                                                        <img src={gardener.profilePicture} alt={gardener.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        gardener.name.charAt(0)
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-800">{gardener.name}</h4>
                                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                                        <MapPin className="h-3 w-3 mr-1" /> Available
                                                    </div>
                                                </div>
                                                {selectedGardener?._id === gardener._id && (
                                                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={handleConfirmRequest}
                                    disabled={!selectedGardener || submitting}
                                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${!selectedGardener || submitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-emerald-600 hover:bg-emerald-700'
                                        }`}
                                >
                                    {submitting ? 'Sending Request...' : 'Confirm Request'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default ManualServicePage;
