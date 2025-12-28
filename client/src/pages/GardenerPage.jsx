
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Phone, User, Star, Leaf, Award, Search, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../config';

const GardenerPage = () => {
    const [gardeners, setGardeners] = useState([]);
    const [filteredGardeners, setFilteredGardeners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchGardeners = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/users/gardeners`);
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

    // Reliable garden/plant images
    const coverImages = [
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80", // Garden Path (Verified)
        "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80", // Tomato/Garden
        "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=800&q=80", // Rose/Start
        "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=800&q=80", // Cucumber/Greenery
        "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=800&q=80", // Lettuce/Greenery
        "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80", // Flowers
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80", // Garden Path (Repeated)
        "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80", // Tomato/Garden (Repeated)
        "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=800&q=80", // Rose/Start (Repeated)
        "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=800&q=80", // Cucumber/Greenery (Repeated)
        "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=800&q=80", // Lettuce/Greenery (Repeated)
        "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80", // Flowers (Repeated)
    ];

    const getCoverImage = (gardener) => {
        if (!gardener || !gardener._id) return coverImages[0];
        // Use the sum of character codes of the ID to get a consistent index
        const sum = gardener._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return coverImages[sum % coverImages.length];
    };

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

    const getMockRating = (index) => (4 + (index % 10) / 10).toFixed(1);

    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-gray-50/50">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-br from-green-700 via-emerald-600 to-teal-500 py-24 px-4 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                        </svg>
                    </div>

                    <div className="relative container mx-auto text-center max-w-4xl z-10">
                        <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-xs font-semibold tracking-wider mb-6 backdrop-blur-sm border border-white/10">
                            <Leaf className="inline-block w-3 h-3 mr-1 mb-0.5" /> EXPERT GARDENERS
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight drop-shadow-sm leading-tight">
                            Find Your Perfect <br className="hidden md:block" />
                            <span className="text-green-100">Green Companion</span>
                        </h1>
                        <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                            Connect with professional gardeners who can transform your outdoor space into a thriving sanctuary.
                        </p>

                        {/* Floating Search Bar */}
                        <div className="max-w-2xl mx-auto relative group">
                            <div className="absolute -inset-1 bg-white/30 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
                            <div className="relative bg-white/90 backdrop-blur-md rounded-full shadow-2xl flex items-center p-2 border border-white/50">
                                <div className="pl-4 pr-3 text-green-600">
                                    <Search className="h-6 w-6" />
                                </div>
                                <input
                                    type="text"
                                    className="flex-grow bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-500 text-lg py-3 px-2 outline-none"
                                    placeholder="Search by name or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="bg-green-600 text-white rounded-full p-3 hover:bg-green-700 transition transform hover:scale-105 shadow-md">
                                    <ArrowRight className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="container mx-auto px-4 max-w-7xl -mt-16 relative z-20 pb-20">
                    {loading ? (
                        <div className="flex flex-col justify-center items-center py-32 bg-white rounded-3xl shadow-xl border border-gray-100">
                            <div className="relative">
                                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-100 border-t-green-500"></div>
                                <Leaf className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-600 h-6 w-6" />
                            </div>
                            <p className="text-gray-500 font-medium mt-6 animate-pulse">Scouting for experts...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-red-50">
                            <div className="inline-block p-4 rounded-full bg-red-100 mb-4 animate-bounce">
                                <Award className="h-8 w-8 text-red-600" />
                            </div>
                            <p className="font-semibold text-red-600 text-lg mb-2">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-8 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-800 font-bold transition-all transform hover:-translate-y-1"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : filteredGardeners.length === 0 ? (
                        <div className="text-center py-24 bg-white rounded-3xl shadow-xl border border-gray-100">
                            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="h-10 w-10 text-gray-300" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No gardeners found</h3>
                            <p className="text-gray-500">We couldn't find any matches for "{searchTerm}".</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredGardeners.map((gardener, index) => (
                                <div
                                    key={gardener._id}
                                    className="group bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative"
                                >
                                    {/* Cover Image */}
                                    <div className="h-40 relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-700">
                                        <img
                                            key={getCoverImage(gardener)}
                                            src={getCoverImage(gardener)}
                                            alt="Garden background"
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>

                                        {/* Rating Badge */}
                                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1 z-10">
                                            <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                                            {getMockRating(index)}
                                        </div>
                                    </div>

                                    <div className="px-8 relative flex-grow flex flex-col pt-0 z-20">
                                        {/* Avatar */}
                                        <div className="relative -mt-16 mb-6 self-start">
                                            <div className="p-1 bg-white rounded-full shadow-lg">
                                                {gardener.profilePicture ? (
                                                    <img
                                                        src={gardener.profilePicture}
                                                        alt={gardener.name}
                                                        className="h-28 w-28 rounded-full border-4 border-gray-50 object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="h-28 w-28 rounded-full border-4 border-gray-50 bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-100 transition-colors">
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
                                                <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-green-50 text-green-700 uppercase tracking-wide border border-green-100">
                                                    {gardener.role}
                                                </span>
                                                <span className="inline-flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 group-hover:bg-white transition-colors">
                                                    <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                                                    Dhaka, BD
                                                </span>
                                            </div>
                                        </div>

                                        {/* Skills/Tags */}
                                        <div className="mb-8">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Expertise</p>
                                            <div className="flex flex-wrap gap-2">
                                                {getMockSkills(index).map(skill => (
                                                    <span key={skill} className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-semibold border border-gray-100 group-hover:border-green-100 group-hover:bg-green-50/50 transition-all cursor-default overflow-hidden">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="border-t border-gray-100 my-auto w-full"></div>

                                        {/* Contact Info & Action */}
                                        <div className="pt-6 pb-8 space-y-4 w-full">
                                            <div className="flex items-center text-gray-600 text-sm group/link cursor-pointer hover:text-green-700 transition-colors">
                                                <div className="h-9 w-9 rounded-full bg-gray-50 flex items-center justify-center mr-3 group-hover/link:bg-green-100 transition-colors">
                                                    <Mail className="h-4 w-4 text-gray-400 group-hover/link:text-green-600" />
                                                </div>
                                                <span className="truncate font-medium tracking-tight">{gardener.email}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600 text-sm group/link cursor-pointer hover:text-green-700 transition-colors">
                                                <div className="h-9 w-9 rounded-full bg-gray-50 flex items-center justify-center mr-3 group-hover/link:bg-green-100 transition-colors">
                                                    <Phone className="h-4 w-4 text-gray-400 group-hover/link:text-green-600" />
                                                </div>
                                                <span className="font-medium tracking-tight">{gardener.phone || 'Number hidden'}</span>
                                            </div>

                                            <button className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-green-200/50 hover:shadow-xl hover:shadow-green-300/50 hover:-translate-y-1 active:translate-y-0 active:shadow-sm transition-all flex items-center justify-center group/btn relative overflow-hidden cursor-pointer">
                                                <span className="relative z-10 flex items-center gap-2">
                                                    View Profile <Sparkles className="h-4 w-4 opacity-70 group-hover/btn:opacity-100 animate-pulse" />
                                                </span>
                                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
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
