
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, Sprout, Bug, AlertTriangle, Leaf, ChevronDown, Activity, Sparkles, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { API_BASE_URL } from '../config';

const ProblemsPage = () => {
    // State
    const [filterOptions, setFilterOptions] = useState({ plantTypes: [], commonSymptoms: [] });
    const [selectedSymptom, setSelectedSymptom] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPlantType, setSelectedPlantType] = useState('');
    const [plantNameQuery, setPlantNameQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProblems, setTotalProblems] = useState(0);

    // Initial load: Get filters
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/problems/filters`);
                const data = await res.json();
                setFilterOptions(data);
            } catch (error) {
                console.error("Error fetching filters:", error);
            }
        };
        fetchFilters();
    }, []);

    // Function to perform diagnosis search
    const handleDiagnosis = async (page = 1) => {
        setLoading(true);
        setSearched(true);
        // Scroll to results if strictly a pagination change, but if it's a new search it might naturally be appropriate
        if (page !== 1) {
            const resultsElement = document.getElementById('results-section');
            if (resultsElement) resultsElement.scrollIntoView({ behavior: 'smooth' });
        }

        try {
            const queryParams = new URLSearchParams();
            if (selectedSymptom) queryParams.append('symptom', selectedSymptom);
            if (selectedPlantType) queryParams.append('plantType', selectedPlantType);
            if (plantNameQuery) queryParams.append('plantName', plantNameQuery);
            queryParams.append('page', page);
            queryParams.append('limit', 9);

            const res = await fetch(`${API_BASE_URL}/api/problems/search?${queryParams.toString()}`);
            const data = await res.json();

            // Handle both old and new API response formats safely
            if (data.problems) {
                setResults(data.problems);
                setCurrentPage(data.currentPage);
                setTotalPages(data.totalPages);
                setTotalProblems(data.totalProblems);
            } else {
                // Fallback if API hasn't updated or returns array directly
                setResults(Array.isArray(data) ? data : []);
                setTotalPages(1);
                setCurrentPage(1);
            }

        } catch (error) {
            console.error("Error diagnosing:", error);
        } finally {
            setLoading(false);
        }
    };

    // Wrapper for button click (resets to page 1)
    const onSearchClick = () => {
        setCurrentPage(1);
        handleDiagnosis(1);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            handleDiagnosis(newPage);
        }
    };

    // Helper to get icon based on problem type
    const getProblemIcon = (type) => {
        switch (type) {
            case 'pest': return <Bug className="text-red-500" size={20} />;
            case 'disease': return <Activity className="text-amber-500" size={20} />;
            case 'environmental': return <Leaf className="text-blue-500" size={20} />;
            case 'weed': return <Sprout className="text-green-500" size={20} />;
            default: return <AlertTriangle className="text-gray-500" size={20} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-gray-50/50">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-br from-green-700 via-emerald-600 to-teal-500 py-20 px-4 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                        </svg>
                    </div>

                    <div className="relative container mx-auto text-center max-w-4xl z-10">
                        <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-xs font-semibold tracking-wider mb-4 backdrop-blur-sm border border-white/10">
                            PLANT DOCTOR
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight drop-shadow-sm">
                            What's Ailing Your Greenery?
                        </h1>
                        <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto leading-relaxed font-light">
                            Diagnose issues instantly. From pests to diseases, we help you identify the problem and find the perfect organic solution.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 max-w-6xl -mt-10 relative z-20 pb-20">

                    {/* Diagnosis Card */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="p-8 md:p-10">

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                                {/* Step 1 */}
                                <div className="md:col-span-5 relative">
                                    <div className="absolute -left-4 -top-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-xl border-4 border-white shadow-sm z-10">
                                        1
                                    </div>
                                    <div className="bg-gray-50/80 p-6 rounded-2xl border border-gray-100 h-full hover:border-green-200 transition-colors duration-300">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 pl-4">
                                            Identify Symptoms
                                        </h3>
                                        <label className="block text-gray-500 text-sm font-medium mb-2 pl-1">Primary Symptom</label>
                                        <div className="relative group">
                                            <select
                                                className="w-full p-4 pl-5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none appearance-none cursor-pointer shadow-sm transition-all group-hover:border-green-300"
                                                value={selectedSymptom}
                                                onChange={(e) => {
                                                    setSelectedSymptom(e.target.value);
                                                    setSearchTerm(e.target.value);
                                                }}
                                            >
                                                <option value="">Select a symptom...</option>
                                                {filterOptions.commonSymptoms && filterOptions.commonSymptoms.map((sym, idx) => (
                                                    <option key={idx} value={sym}>{sym}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-green-500 transition-colors" size={20} />
                                        </div>
                                        <p className="text-xs text-gray-400 mt-3 pl-1">
                                            Tip: Check leaves, stems, and soil carefully.
                                        </p>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="hidden md:flex md:col-span-1 items-center justify-center py-10">
                                    <div className="h-full w-px bg-gray-200 relative">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2">
                                            <span className="text-gray-300 text-xs uppercase tracking-widest">Then</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="md:col-span-6 relative">
                                    <div className="absolute -left-4 -top-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-xl border-4 border-white shadow-sm z-10">
                                        2
                                    </div>
                                    <div className="bg-gray-50/80 p-6 rounded-2xl border border-gray-100 h-full hover:border-green-200 transition-colors duration-300">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 pl-4">
                                            Plant Details <span className="text-sm font-normal text-gray-400 ml-auto">(Optional)</span>
                                        </h3>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-gray-500 text-sm font-medium mb-2 pl-1">Type</label>
                                                <div className="relative group">
                                                    <select
                                                        className="w-full p-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-green-400 outline-none appearance-none cursor-pointer shadow-sm transition-all"
                                                        value={selectedPlantType}
                                                        onChange={(e) => setSelectedPlantType(e.target.value)}
                                                    >
                                                        <option value="">Any</option>
                                                        {filterOptions.plantTypes && filterOptions.plantTypes.map((type, idx) => (
                                                            <option key={idx} value={type}>{type}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-gray-500 text-sm font-medium mb-2 pl-1">Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Rose"
                                                    className="w-full p-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-green-400 outline-none shadow-sm placeholder-gray-300 transition-all"
                                                    value={plantNameQuery}
                                                    onChange={(e) => setPlantNameQuery(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex justify-center">
                                <button
                                    onClick={onSearchClick}
                                    className="group relative px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-green-200 hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3 active:scale-95 cursor-pointer"
                                >
                                    <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all"></div>
                                    <Sparkles size={22} className="text-green-100 animate-pulse" />
                                    <span>Run Diagnosis</span>
                                </button>
                            </div>

                        </div>
                    </div>


                    {/* Results Section */}
                    {searched && (
                        <div id="results-section" className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <div className="flex items-center justify-between mb-8 px-2">
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                                    <Activity className="text-green-600" />
                                    Diagnostic Results
                                </h2>
                                <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                                    {totalProblems} found
                                </span>
                            </div>

                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                                    <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-100 border-t-green-500 mb-6"></div>
                                    <p className="text-gray-500 font-medium animate-pulse">Analyzing symptoms...</p>
                                </div>
                            ) : results.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                        {results.map((problem) => (
                                            <div key={problem._id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">

                                                <div className="p-6 pb-0 flex-grow">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${problem.type === 'disease' ? 'bg-amber-100 text-amber-700' :
                                                            problem.type === 'pest' ? 'bg-red-100 text-red-700' :
                                                                problem.type === 'weed' ? 'bg-emerald-100 text-emerald-700' :
                                                                    'bg-blue-100 text-blue-700'
                                                            }`}>
                                                            {problem.type}
                                                        </span>
                                                        <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-green-50 transition-colors">
                                                            {getProblemIcon(problem.type)}
                                                        </div>
                                                    </div>

                                                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                                                        {problem.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-400 mb-6 flex items-center gap-1">
                                                        Found in <span className="font-medium text-gray-600">{problem.plant_id?.name || 'Various Plants'}</span>
                                                    </p>

                                                    <div className="mb-6">
                                                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Symptoms</h4>
                                                        <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                            "{problem.symptoms}"
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="p-6 pt-0 mt-auto">
                                                    <div className="bg-green-50/50 rounded-xl p-4 border border-green-100 group-hover:border-green-200 transition-colors">
                                                        <h4 className="text-xs font-bold text-green-700 uppercase mb-2 flex items-center gap-2">
                                                            <CheckCircle size={14} /> Recommended Solution
                                                        </h4>
                                                        <p className="text-sm text-green-900 font-medium">
                                                            {problem.solution}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pagination Controls */}
                                    {totalPages > 1 && (
                                        <div className="flex justify-center items-center gap-4">
                                            <button
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className="p-3 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm cursor-pointer"
                                            >
                                                <ChevronLeft size={20} />
                                            </button>

                                            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm text-sm font-medium text-gray-600">
                                                Page <span className="text-green-600 font-bold">{currentPage}</span> of {totalPages}
                                            </div>

                                            <button
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                                className="p-3 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm cursor-pointer"
                                            >
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 shadow-sm">
                                    <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <AlertTriangle className="h-10 w-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Matches Found</h3>
                                    <p className="text-gray-500 max-w-md mx-auto">
                                        We couldn't identify a specific problem with those criteria. Try generalizing your search or selecting fewer filters.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main >

            <Footer />
        </div >
    );
};

export default ProblemsPage;
