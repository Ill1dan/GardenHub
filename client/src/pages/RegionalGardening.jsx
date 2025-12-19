import React, { useState } from 'react';
import { regionalData } from '../data/regionalData';
import { MapPin, Thermometer, CloudRain, Droplets, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RegionalGardening = () => {
    const [selectedRegion, setSelectedRegion] = useState(regionalData[0]);

    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-gray-50">
            <Navbar />

            <main className="flex-grow pt-8 pb-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Discover What's Best For Your Region
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Get personalized gardening recommendations based on your local climate, soil conditions, and environmental factors across Bangladesh.
                        </p>
                    </div>

                    {/* Region Selector */}
                    <div className="bg-white rounded-xl shadow-md p-8 mb-10 transition-shadow">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Select Region</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                            {regionalData.map((region) => (
                                <button
                                    key={region.id}
                                    onClick={() => setSelectedRegion(region)}
                                    className={`p-4 rounded-lg text-lg font-medium transition-all duration-300 cursor-pointer ${selectedRegion.id === region.id
                                        ? 'bg-green-600 text-white shadow-lg transform scale-105'
                                        : 'bg-green-50 text-green-800 hover:bg-green-100 hover:shadow-md hover:-translate-y-1'
                                        }`}
                                >
                                    {region.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Region Overview */}
                    <div className="bg-white rounded-xl shadow-md p-8 mb-10 border-l-8 border-green-500 hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <MapPin className="text-green-600" />
                            Region Overview: {selectedRegion.name}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="p-4 bg-gray-50 rounded-lg hovered-card transition-all duration-300 hover:bg-green-50">
                                <div className="flex items-center gap-2 mb-2 text-green-700">
                                    <Thermometer size={20} />
                                    <h3 className="font-semibold">Climate</h3>
                                </div>
                                <p className="text-gray-600 text-sm">{selectedRegion.overview.climate}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg hovered-card transition-all duration-300 hover:bg-amber-50">
                                <div className="flex items-center gap-2 mb-2 text-amber-700">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                    </svg>
                                    <h3 className="font-semibold">Soil</h3>
                                </div>
                                <p className="text-gray-600 text-sm">{selectedRegion.overview.soil}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg hovered-card transition-all duration-300 hover:bg-blue-50">
                                <div className="flex items-center gap-2 mb-2 text-blue-600">
                                    <CloudRain size={20} />
                                    <h3 className="font-semibold">Rainfall</h3>
                                </div>
                                <p className="text-gray-600 text-sm">{selectedRegion.overview.rainfall}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg hovered-card transition-all duration-300 hover:bg-teal-50">
                                <div className="flex items-center gap-2 mb-2 text-teal-600">
                                    <Droplets size={20} />
                                    <h3 className="font-semibold">Salinity</h3>
                                </div>
                                <p className="text-gray-600 text-sm">{selectedRegion.overview.salinity}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        {/* Recommended Plants */}
                        <div className="bg-white rounded-xl shadow-md p-8 h-full">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommended Plants</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {selectedRegion.recommendedPlants.map((plant, index) => (
                                    <div key={index} className="group relative overflow-hidden rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-default hover:-translate-y-1">
                                        <div className="aspect-w-16 aspect-h-9 h-32 w-full overflow-hidden bg-gray-200">
                                            <img
                                                src={plant.image}
                                                alt={plant.name}
                                                className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80'; // Fallback image
                                                }}
                                            />
                                        </div>
                                        <div className="p-3 bg-white">
                                            <h3 className="font-semibold text-gray-800 text-center group-hover:text-green-600 transition-colors">{plant.name}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Soil & Fertilizer Tips */}
                        <div className="bg-white rounded-xl shadow-md p-8 h-full">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Soil & Fertilizer Tips</h2>
                            <ul className="space-y-4">
                                {selectedRegion.tips.map((tip, index) => (
                                    <li key={index} className="flex items-start gap-3 p-4 bg-green-50/50 rounded-lg border border-green-100 hover:bg-green-100 transition-colors duration-300">
                                        <div className="mt-1 bg-green-200 p-1.5 rounded-full text-green-700 flex-shrink-0">
                                            <ArrowRight size={14} />
                                        </div>
                                        <span className="text-gray-700 font-medium">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Common Problems */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-red-100 hover:shadow-lg transition-shadow duration-300">
                        <div className="bg-red-50 p-6 border-b border-red-100 flex items-center gap-3">
                            <div className="bg-red-100 p-2 rounded-full text-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-red-800">Common Problems</h2>
                        </div>
                        <div className="p-8">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="flex-grow">
                                    <p className="text-gray-700 text-lg leading-relaxed border-l-4 border-red-300 pl-4 py-1 bg-red-50/30 rounded-r-lg">
                                        {selectedRegion.commonProblems}
                                    </p>
                                    <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full w-fit">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        Recommended Action: Consult with an expert gardener if these problems persist.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default RegionalGardening;
