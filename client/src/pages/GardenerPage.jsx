import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Phone, User, Calendar, Star, Leaf, Award, Search, MapPin, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const GardenerPage = () => {
    const [gardeners, setGardeners] = useState([]);
    const [filteredGardeners, setFilteredGardeners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchGardeners = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/gardeners');
                setGardeners(response.data);
                setFilteredGardeners(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching gardeners:', err);
                setError('Failed to load gardeners. Please try again later.');
                setLoading(false);
            }
        };

        fetchGardeners();
    }, []);

    useEffect(() => {
        const results = gardeners.filter(gardener =>
            gardener.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            gardener.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredGardeners(results);
    }, [searchTerm, gardeners]);

    // Mock data for UI enhancement (since these aren't in DB yet)
    const getMockSkills = (index) => {
        const skillsPool = [
            ['Landscaping', 'Pruning', 'Design'],
            ['Soil Health', 'Pest Control', 'Organic'],
            ['Urban Gardening', 'Vertical Gardens'],
            ['Lawn Care', 'Irrigation', 'Trees'],
            ['Flower Beds', 'Seasonal Planting']
        ];
        return skillsPool[index % skillsPool.length];
    };

    const getMockRating = (index) => {
        return (4 + (index % 10) / 10).toFixed(1);
    };

    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-gray-50/50">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <div className="bg-green-700 relative overflow-hidden text-white py-20 sm:py-24">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-1/2 -right-1/2 w-[100rem] h-[100rem] rounded-full bg-green-600/30 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50/50 to-transparent"></div>
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-green-500/30 text-green-50 backdrop-blur-sm border border-green-400/30 mb-6">
                            <Leaf className="h-4 w-4 mr-2" /> Expert Gardeners
                        </span>
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                            Find Your Perfect <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-emerald-100">Green Companion</span>
                        </h1>
                        <p className="text-xl text-green-100 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Connect with professional gardeners who can transform your outdoor space into a thriving sanctuary.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-11 pr-4 py-4 border-2 border-transparent bg-white rounded-full leading-5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-300 focus:ring-0 sm:text-lg shadow-xl transition-all"
                                    placeholder="Search by name or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-20">
                    {loading ? (
                        <div className="flex flex-col justify-center items-center h-64 bg-white rounded-3xl shadow-xl p-8">
                            <Leaf className="h-12 w-12 text-green-600 animate-spin mb-4" />
                            <p className="text-gray-500 font-medium">Finding experts...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12 bg-white rounded-3xl shadow-xl">
                            <div className="inline-block p-4 rounded-full bg-red-100 mb-4">
                                <Award className="h-8 w-8 text-red-600" />
                            </div>
                            <p className="font-semibold text-red-600 text-lg">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 font-medium transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : filteredGardeners.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-gray-100">
                            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="h-10 w-10 text-gray-300" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No gardeners found</h3>
                            <p className="text-gray-500">We couldn't find any matches for "{searchTerm}".</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredGardeners.map((gardener, index) => (
                                <div key={gardener._id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full">
                                    {/* Cover Image */}
                                    <div className="h-32 bg-gradient-to-br from-green-500 to-emerald-700 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] opacity-20"></div>
                                        {/* Badge */}
                                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center">
                                            <Star className="w-3 h-3 text-yellow-300 mr-1 fill-yellow-300" />
                                            {getMockRating(index)}
                                        </div>
                                    </div>

                                    <div className="px-6 relative flex-grow flex flex-col">
                                        {/* Avatar */}
                                        <div className="relative -mt-16 mb-4 self-start">
                                            <div className="p-1.5 bg-white rounded-full shadow-md">
                                                {gardener.profilePicture ? (
                                                    <img
                                                        src={gardener.profilePicture}
                                                        alt={gardener.name}
                                                        className="h-28 w-28 rounded-full border-4 border-gray-50 object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-28 w-28 rounded-full border-4 border-gray-50 bg-green-50 flex items-center justify-center text-green-600">
                                                        <User className="h-12 w-12" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Header Info */}
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-700 transition-colors mb-2">
                                                {gardener.name}
                                            </h3>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 uppercase tracking-wide border border-green-100">
                                                    {gardener.role}
                                                </span>
                                                <span className="inline-flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                                    <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                                                    Dhaka, BD
                                                </span>
                                            </div>
                                        </div>

                                        {/* Skills/Tags */}
                                        <div className="mb-6">
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Expertise</p>
                                            <div className="flex flex-wrap gap-2">
                                                {getMockSkills(index).map(skill => (
                                                    <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors cursor-default">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="border-t border-gray-100 my-auto"></div>

                                        {/* Contact Info & Action */}
                                        <div className="pt-6 pb-6 space-y-4">
                                            <div className="flex items-center text-gray-600 text-sm group/link cursor-pointer hover:text-green-700 transition-colors">
                                                <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center mr-3 group-hover/link:bg-green-50 transition-colors">
                                                    <Mail className="h-4 w-4 text-gray-400 group-hover/link:text-green-600" />
                                                </div>
                                                <span className="truncate font-medium">{gardener.email}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600 text-sm group/link cursor-pointer hover:text-green-700 transition-colors">
                                                <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center mr-3 group-hover/link:bg-green-50 transition-colors">
                                                    <Phone className="h-4 w-4 text-gray-400 group-hover/link:text-green-600" />
                                                </div>
                                                <span className="font-medium">{gardener.phone || 'Number hidden'}</span>
                                            </div>

                                            <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all flex items-center justify-center group/btn relative overflow-hidden">
                                                <span className="relative z-10 flex items-center">
                                                    View Profile <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                                </span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default GardenerPage;
