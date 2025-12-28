import { Briefcase, DollarSign, Star, AlertCircle, Calendar, CheckCircle, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/Dashboard/FeatureCard';
import WeatherCard from '../components/Dashboard/WeatherCard';

import ScheduleList from '../components/Dashboard/ScheduleList';
import Inbox from '../components/Dashboard/Inbox';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const GardenerDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const firstName = user ? user.name.split(' ')[0] : 'Gardener';

    // State for dynamic requests
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                };
                const res = await axios.get(`${API_BASE_URL}/api/services/gardener-requests`, config);
                // Filter for pending requests for the "New Job Requests" section
                setRequests(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching requests:', error);
                setLoading(false);
            }
        };

        if (user) {
            fetchRequests();
        }
    }, [user]);

    const handleAcceptRequest = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            };
            await axios.put(`${API_BASE_URL}/api/services/request/${id}/status`, { status: 'approved' }, config);

            // Refresh requests
            const updatedRequests = requests.map(req =>
                req._id === id ? { ...req, status: 'approved' } : req
            );
            setRequests(updatedRequests);
            alert('Job Accepted!');

        } catch (error) {
            console.error('Error accepting job:', error);
            alert('Failed to accept job');
        }
    };

    const pendingRequests = requests.filter(req => req.status === 'pending');
    const displayedRequests = requests.filter(req => req.status === 'pending' || req.status === 'approved');
    const activeJobs = requests.filter(req => req.status === 'approved' || req.status === 'in_progress');

    return (
        <div className="min-h-screen flex flex-col bg-[#f3f4f6] font-sans text-gray-900 selection:bg-green-100 selection:text-green-900">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

                {/* Welcome & Weather Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Welcome Section - Spans 2 cols */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                Good Morning, <span className="text-green-700">{firstName}</span>! 🌻
                            </h1>
                            <p className="text-gray-500 mt-1 text-lg">Here's what's happening in your garden network today.</p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-green-500">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-gray-500 text-sm font-medium uppercase">Active Jobs</h3>
                                    <Briefcase className="h-5 w-5 text-green-500" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{activeJobs.length}</p>
                                <p className="text-xs text-green-600 mt-1 font-medium">{pendingRequests.length} new request(s)</p>
                            </div>

                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-gray-500 text-sm font-medium uppercase">Earnings</h3>
                                    <DollarSign className="h-5 w-5 text-blue-500" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">$450</p>
                                <p className="text-xs text-gray-400 mt-1">This week</p>
                            </div>

                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-yellow-500">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-gray-500 text-sm font-medium uppercase">Rating</h3>
                                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">4.9</p>
                                <p className="text-xs text-gray-400 mt-1">Variable</p>
                            </div>
                        </div>

                        {/* Recent Requests List (Dynamic) */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[250px]">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-800 text-lg">New Job Requests</h3>
                                {pendingRequests.length > 0 && (
                                    <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        {pendingRequests.length} Pending
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                {loading && <p className="text-gray-500">Loading requests...</p>}

                                {!loading && displayedRequests.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                        <p>No active requests.</p>
                                    </div>
                                )}

                                {displayedRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((req) => (
                                    <div key={req._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-green-200 transition-colors bg-gray-50/50 gap-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold mr-4 flex-shrink-0">
                                                {req.user_id.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800">{req.user_id.name}</h4>
                                                <p className="text-sm text-gray-500">
                                                    {req.service_type === 'package' ? req.package_id.name : 'Custom Service'}
                                                    {req.date && ` • ${new Date(req.date).toLocaleDateString()}`}
                                                </p>
                                                {req.service_type === 'manual' && (
                                                    <p className="text-xs text-gray-500 mt-1 italic max-w-xs truncate">
                                                        "{req.custom_details?.requirements}"
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {req.status === 'pending' ? (
                                            <button
                                                onClick={() => handleAcceptRequest(req._id)}
                                                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition w-full sm:w-auto text-center"
                                            >
                                                Accept
                                            </button>
                                        ) : (
                                            <div className="flex items-center text-green-700 bg-green-50 px-4 py-2 rounded-lg text-sm font-medium border border-green-100 w-full sm:w-auto justify-center">
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                Accepted
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Pagination Controls */}
                                {!loading && displayedRequests.length > itemsPerPage && (
                                    <div className="flex justify-between items-center pt-2 mt-4 border-t border-gray-100">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className={`text-sm font-medium px-3 py-1 rounded-md ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-green-600 hover:bg-green-50 cursor-pointer'}`}
                                        >
                                            Previous
                                        </button>
                                        <span className="text-xs text-gray-500">
                                            Page {currentPage} of {Math.ceil(displayedRequests.length / itemsPerPage)}
                                        </span>
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(displayedRequests.length / itemsPerPage)))}
                                            disabled={currentPage === Math.ceil(displayedRequests.length / itemsPerPage)}
                                            className={`text-sm font-medium px-3 py-1 rounded-md ${currentPage === Math.ceil(displayedRequests.length / itemsPerPage) ? 'text-gray-300 cursor-not-allowed' : 'text-green-600 hover:bg-green-50 cursor-pointer'}`}
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Forum / Community Section */}
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg border border-transparent p-6 text-white relative overflow-hidden">
                            <div className="relative z-10 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-2xl mb-2">Join the Conversation! 🌿</h3>
                                    <p className="text-green-50 mb-6 max-w-md">
                                        Share your expert tips, answer questions, and connect with the gardening community in our dedicated forum.
                                    </p>
                                    <button
                                        onClick={() => navigate('/forum')}
                                        className="bg-white text-green-700 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-50 transition-colors cursor-pointer"
                                    >
                                        Visit Community Forum
                                    </button>
                                </div>
                                <div className="hidden sm:block opacity-20 transform scale-150 rotate-12 translate-x-4">
                                    <Briefcase className="h-40 w-40" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Weather & Schedule - Spans 1 col */}
                    <div className="space-y-6">
                        <WeatherCard />
                        <ScheduleList />
                        <Inbox />
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default GardenerDashboard;
