import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthContext from '../context/AuthContext';
import { Check, Star, Shield, Zap, X } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const MembershipPage = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleUpgrade = async () => {
        if (!user) {
            window.location.href = '/login';
            return;
        }

        setLoading(true);
        setMessage('');
        try {
            const res = await axios.put(`${API_BASE_URL}/api/users/upgrade`);
            updateUser(res.data);
            setMessage('Successfully upgraded to Premium Membership!');
        } catch (error) {
            console.error(error);
            setMessage('Failed to upgrade. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-white overflow-hidden pb-12">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 opacity-90" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
                        <span className="block">Choose Your Plan</span>
                        <span className="block text-green-600">Unlock Exclusive Perks</span>
                    </h1>
                    <p className="max-w-xl mx-auto text-lg text-gray-500 mb-10">
                        Join our community of gardening enthusiasts. Upgrade to Premium to get the best deals on plants and expert services.
                    </p>
                </div>
            </div>

            {/* Plans Section */}
            <div className="flex-grow container mx-auto px-4 py-12 relative z-10 -mt-10">
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                    {/* Free Plan */}
                    <div className="bg-white/70 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl overflow-hidden transform transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col relative">
                        {user && !user.isPremium && (
                            <div className="absolute top-0 right-0 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-bl-lg">
                                CURRENT PLAN
                            </div>
                        )}
                        <div className="p-8 flex-grow">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 text-gray-600 mb-6 mx-auto">
                                <Shield className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">Free Plan</h3>
                            <p className="text-center text-gray-500 mb-8">Perfect for getting started</p>
                            <div className="text-center mb-8">
                                <span className="text-4xl font-extrabold text-gray-900">Free</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                                    <span className="text-gray-600">Access to Community Forum</span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                                    <span className="text-gray-600">Browse Shop & Services</span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                                    <span className="text-gray-600">Basic Plant Care Guides</span>
                                </li>
                                <li className="flex items-start">
                                    <X className="h-5 w-5 text-gray-300 mr-3 mt-0.5" />
                                    <span className="text-gray-400">Exclusive Discounts</span>
                                </li>
                                <li className="flex items-start">
                                    <X className="h-5 w-5 text-gray-300 mr-3 mt-0.5" />
                                    <span className="text-gray-400">Priority Experts Support</span>
                                </li>
                            </ul>
                        </div>
                        <div className="p-8 bg-gray-50/50">
                            <button disabled className="w-full block bg-gray-200 text-gray-500 font-bold py-3 px-4 rounded-xl cursor-default">
                                {user ? 'Active' : 'Get Started'}
                            </button>
                        </div>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-white/80 backdrop-blur-xl border border-green-200 rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:-translate-y-2 hover:shadow-green-200/50 flex flex-col relative ring-4 ring-green-50">
                        {user?.isPremium && (
                            <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-sm">
                                CURRENT PLAN
                            </div>
                        )}
                        <div className="p-8 flex-grow">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-white mb-6 mx-auto shadow-lg shadow-green-200">
                                <Star className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">Premium Membership</h3>
                            <p className="text-center text-gray-500 mb-8">For the true garden enthusiast</p>
                            <div className="text-center mb-8">
                                <span className="text-4xl font-extrabold text-gray-900">$9.99</span>
                                <span className="text-gray-500 text-lg">/month</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                                        <Check className="h-4 w-4 text-green-600" />
                                    </div>
                                    <span className="text-gray-700 font-medium">Everything in Free</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                                        <Zap className="h-4 w-4 text-green-600" />
                                    </div>
                                    <span className="text-gray-700 font-medium"><span className="text-green-600 font-bold">30% OFF</span> on All Shop Items</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                                        <Zap className="h-4 w-4 text-green-600" />
                                    </div>
                                    <span className="text-gray-700 font-medium"><span className="text-green-600 font-bold">30% OFF</span> on All Services</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                                        <Check className="h-4 w-4 text-green-600" />
                                    </div>
                                    <span className="text-gray-700 font-medium">Priority Expert Consultation</span>
                                </li>
                            </ul>
                        </div>
                        <div className="p-8 bg-green-50/50">
                            {user?.isPremium ? (
                                <button disabled className="w-full block bg-green-100 text-green-700 font-bold py-3 px-4 rounded-xl cursor-default">
                                    Active
                                </button>
                            ) : (
                                <button
                                    onClick={handleUpgrade}
                                    disabled={loading}
                                    className="w-full block bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg shadow-green-200 cursor-pointer"
                                >
                                    {loading ? 'Processing...' : 'Upgrade to Premium'}
                                </button>
                            )}
                            {message && <p className="mt-2 text-center text-sm font-medium text-green-600">{message}</p>}
                        </div>
                    </div>
                </div>

                {/* Compare Features Section */}
                <div className="mt-24 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Compare Features</h2>
                    <div className="overflow-hidden bg-white shadow-sm rounded-2xl border border-gray-100">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-6 bg-gray-50 text-sm font-semibold text-gray-500 uppercase tracking-wider">Feature</th>
                                    <th className="p-6 bg-gray-50 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">Free</th>
                                    <th className="p-6 bg-green-50 text-center text-sm font-semibold text-green-800 uppercase tracking-wider">Premium</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="p-6 text-gray-900 font-medium">Community Access</td>
                                    <td className="p-6 text-center text-gray-500"><Check className="h-5 w-5 mx-auto text-green-500" /></td>
                                    <td className="p-6 text-center bg-green-50/30"><Check className="h-5 w-5 mx-auto text-green-600" /></td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-gray-900 font-medium">Shop Discount</td>
                                    <td className="p-6 text-center text-gray-400">-</td>
                                    <td className="p-6 text-center bg-green-50/30 font-bold text-green-600">30%</td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-gray-900 font-medium">Service Discount</td>
                                    <td className="p-6 text-center text-gray-400">-</td>
                                    <td className="p-6 text-center bg-green-50/30 font-bold text-green-600">30%</td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-gray-900 font-medium">Expert Support</td>
                                    <td className="p-6 text-center text-gray-500">Standard</td>
                                    <td className="p-6 text-center bg-green-50/30 font-bold text-gray-800">Priority</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Why Go Premium Section */}
                <div className="mt-24 mb-12 max-w-4xl mx-auto bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-6">Why Go Premium?</h2>
                        <p className="text-xl text-green-100 mb-8 leading-relaxed max-w-2xl mx-auto">
                            Investing in Premium isn't just about discounts—it's about committing to your gardening journey with the best resources and support at your fingertips.
                        </p>
                        {!user?.isPremium && (
                            <button
                                onClick={handleUpgrade}
                                className="inline-block bg-white text-green-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-50 transition-all cursor-pointer"
                            >
                                Get Premium Now
                            </button>
                        )}
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 -ml-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10"></div>
                    <div className="absolute bottom-0 right-0 -mr-16 -mb-16 w-64 h-64 rounded-full bg-white opacity-10"></div>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default MembershipPage;
