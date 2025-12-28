import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Package, Wrench, ArrowRight, Spade, Shovel } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicePage = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-green-50">
            <Navbar />

            {/* Header Section */}
            <div className="bg-gradient-to-r from-green-800 to-emerald-700 py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 right-0 p-12 opacity-10 transform rotate-12">
                    <Spade className="w-64 h-64 text-white" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                        Services We Provide
                    </h1>
                    <p className="text-xl text-green-50 max-w-2xl mx-auto font-light">
                        Choose the perfect plantation service for your home. Curated packages or fully authorized custom solutions.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

                    {/* Package Option */}
                    <Link to="/services/packages" className="group">
                        <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-[500px] flex flex-col relative border border-green-100 ring-1 ring-green-50">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-emerald-600"></div>

                            <div className="p-10 flex-grow flex flex-col items-center justify-center text-center space-y-6">
                                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors duration-300">
                                    <Package className="w-12 h-12 text-green-600" />
                                </div>

                                <div>
                                    <h2 className="text-3xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors">Package</h2>
                                    <p className="text-gray-500 px-4 leading-relaxed">
                                        Select from our expertly curated plantation packages designed for various home sizes and styles.
                                    </p>
                                </div>

                                <div className="mt-8">
                                    <span className="inline-flex items-center text-green-600 font-semibold group-hover:text-green-800 bg-green-50 px-6 py-2 rounded-full transition-all">
                                        Explore Packages <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </div>

                            {/* Decorative background element */}
                            <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none">
                                <Package className="w-64 h-64 text-green-900 transform translate-x-16 translate-y-16" />
                            </div>
                        </div>
                    </Link>

                    {/* Manual Option */}
                    <Link to="/services/manual" className="group">
                        <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-[500px] flex flex-col relative border border-green-100 ring-1 ring-green-50">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-teal-600"></div>

                            <div className="p-10 flex-grow flex flex-col items-center justify-center text-center space-y-6">
                                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center group-hover:bg-emerald-100 transition-colors duration-300">
                                    <Wrench className="w-12 h-12 text-emerald-600" />
                                </div>

                                <div>
                                    <h2 className="text-3xl font-bold text-gray-800 mb-3 group-hover:text-emerald-700 transition-colors">Manual</h2>
                                    <p className="text-gray-500 px-4 leading-relaxed">
                                        Create your own custom plantation service. Choose specific plants, designs, and gardeners to fit your vision.
                                    </p>
                                </div>

                                <div className="mt-8">
                                    <span className="inline-flex items-center text-emerald-600 font-semibold group-hover:text-emerald-800 bg-emerald-50 px-6 py-2 rounded-full transition-all">
                                        Start Customizing <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </div>
                            {/* Decorative background element */}
                            <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none">
                                <Shovel className="w-64 h-64 text-emerald-900 transform translate-x-16 translate-y-16" />
                            </div>
                        </div>
                    </Link>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ServicePage;
