import { Briefcase, DollarSign, Star, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/Dashboard/FeatureCard';
import WeatherCard from '../components/Dashboard/WeatherCard';
import ScheduleList from '../components/Dashboard/ScheduleList';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const GardenerDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const firstName = user ? user.name.split(' ')[0] : 'Gardener';

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
                                <p className="text-2xl font-bold text-gray-900">3</p>
                                <p className="text-xs text-green-600 mt-1 font-medium">+1 new request</p>
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

                        {/* Recent Requests List (New functionality) */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-800 text-lg">New Job Requests</h3>
                                <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full cursor-pointer hover:bg-green-100 transition">
                                    <AlertCircle className="h-4 w-4 mr-1" />
                                    2 Urgent
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-green-200 transition-colors cursor-pointer bg-gray-50/50">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold mr-4">
                                            JS
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">John Smith</h4>
                                            <p className="text-sm text-gray-500">Full Garden Cleanup • 5km away</p>
                                        </div>
                                    </div>
                                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition">Accept</button>
                                </div>
                                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-green-200 transition-colors cursor-pointer bg-gray-50/50">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold mr-4">
                                            AL
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">Alice Lee</h4>
                                            <p className="text-sm text-gray-500">Tree Pruning • 2.5km away</p>
                                        </div>
                                    </div>
                                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition">Accept</button>
                                </div>
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
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default GardenerDashboard;
