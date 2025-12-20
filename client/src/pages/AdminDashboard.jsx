import { Users, Eye, Shovel, Search, Filter, Edit2, Trash2, MoreVertical, Activity, ChevronRight, TrendingUp, TrendingDown, ArrowUpRight, Shield, UserX, XCircle, CheckCircle, MessageSquare, MessageCircle, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const AdminDashboard = () => {
    const { user: currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, viewers: 0, gardeners: 0, experts: 0 });
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Users
                const usersRes = await fetch('http://localhost:5000/api/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const usersData = await usersRes.json();

                if (usersRes.ok) {
                    setUsers(usersData);
                }

                // Fetch Stats
                const statsRes = await fetch('http://localhost:5000/api/users/stats', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const statsData = await statsRes.json();
                if (statsRes.ok) {
                    setStats(statsData);
                }

                // Fetch Activity Logs
                const logsRes = await fetch('http://localhost:5000/api/users/activity', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const logsData = await logsRes.json();
                if (logsRes.ok) {
                    setActivities(logsData);
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching admin data:", error);
                setLoading(false);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token]);

    const handleBanUser = async (userId, currentStatus) => {
        try {
            const res = await fetch(`http://localhost:5000/api/users/${userId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ isBanned: !currentStatus })
            });
            const data = await res.json();
            if (res.ok) {
                // Update local state
                setUsers(users.map(u => u._id === userId ? { ...u, isBanned: data.isBanned } : u));
            }
        } catch (error) {
            console.error("Error banning user:", error);
        }
    };

    const handleUpgradeRole = async (userId, newRole) => {
        try {
            const res = await fetch(`http://localhost:5000/api/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole })
            });
            const data = await res.json();
            if (res.ok) {
                // Update local state
                setUsers(users.map(u => u._id === userId ? { ...u, role: data.role } : u));
                // Refresh stats roughly or re-fetch
            }
        } catch (error) {
            console.error("Error upgrading user:", error);
        }
    };

    const statsCards = [
        { title: 'Total Users', count: stats.totalUsers, icon: Users, color: 'blue', trend: '+12%', trendUp: true },
        { title: 'Viewers', count: stats.viewers, icon: Eye, color: 'purple', trend: '+5%', trendUp: true },
        { title: 'Gardeners', count: stats.gardeners, icon: Shovel, color: 'green', trend: '-2%', trendUp: false },
    ];

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen flex flex-col bg-[#f3f4f6] font-sans text-gray-900 selection:bg-green-100 selection:text-green-900">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full mb-10">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">User Management</h1>
                        <p className="text-gray-500 mt-1">Manage platform users, roles, and permissions.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content (Stats + Table) */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {statsCards.map((stat, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.title}</p>
                                            <div className="flex items-baseline mt-1 space-x-2">
                                                <h3 className="text-3xl font-bold text-gray-900">{stat.count}</h3>
                                            </div>
                                        </div>
                                        <div className={`p-3 rounded-full bg-${stat.color}-50`}>
                                            <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Filter & Table Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage).map((u) => (
                                            <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            {u.profilePicture ? (
                                                                <img className="h-10 w-10 rounded-full object-cover border border-green-200" src={u.profilePicture} alt="" />
                                                            ) : (
                                                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center text-green-700 font-bold">
                                                                    {u.name.charAt(0)}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="ml-4 max-w-[150px] sm:max-w-[200px]">
                                                            <div className="text-sm font-medium text-gray-900 truncate" title={u.name}>{u.name}</div>
                                                            <div className="text-sm text-gray-500 truncate" title={u.email}>{u.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${u.role === 'gardener' ? 'bg-green-100 text-green-800' : u.role === 'expert' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(u.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {u.isBanned ? (
                                                        <span className="px-2 py-1 inline-flex text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                                            Banned
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-1 inline-flex text-xs font-semibold rounded-full bg-green-50 text-green-700 border border-green-200">
                                                            Active
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end space-x-2">

                                                        {/* Upgrade Role (Gardener -> Expert) */}
                                                        {u.role === 'gardener' && !u.isBanned && (
                                                            <button
                                                                onClick={() => handleUpgradeRole(u._id, 'expert')}
                                                                className="text-purple-600 hover:text-purple-900 flex items-center bg-purple-50 px-2 py-1 rounded"
                                                                title="Upgrade to Expert"
                                                            >
                                                                <Shield className="h-3 w-3 mr-1" /> Upgrade
                                                            </button>
                                                        )}

                                                        {/* Demote Role (Expert -> Gardener) */}
                                                        {u.role === 'expert' && !u.isBanned && (
                                                            <button
                                                                onClick={() => handleUpgradeRole(u._id, 'gardener')}
                                                                className="text-amber-600 hover:text-amber-900 flex items-center bg-amber-50 px-2 py-1 rounded"
                                                                title="Demote to Gardener"
                                                            >
                                                                <TrendingDown className="h-3 w-3 mr-1" /> Demote
                                                            </button>
                                                        )}

                                                        {/* Ban/Unban */}
                                                        <button
                                                            onClick={() => handleBanUser(u._id, u.isBanned)}
                                                            className={`flex items-center px-2 py-1 rounded ${u.isBanned ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'text-red-600 bg-red-50 hover:bg-red-100'}`}
                                                            title={u.isBanned ? "Unban User" : "Ban User"}
                                                        >
                                                            {u.isBanned ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                                                            {u.isBanned ? "Unban" : "Ban"}
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Controls */}
                            <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                                <div className="flex-1 flex justify-between items-center">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                    >
                                        Previous
                                    </button>
                                    <span className="text-sm text-gray-700">
                                        Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{Math.ceil(users.length / usersPerPage)}</span>
                                    </span>
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(users.length / usersPerPage)))}
                                        disabled={currentPage === Math.ceil(users.length / usersPerPage)}
                                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${currentPage === Math.ceil(users.length / usersPerPage) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Sidebar: Activity Log */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
                                <Activity className="h-5 w-5 mr-2 text-green-600" />
                                System Activity
                            </h3>
                            <div className="space-y-6 relative ml-2">
                                {/* Vertical Line */}
                                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gray-100"></div>

                                {activities.length === 0 ? (
                                    <p className="text-sm text-gray-500 pl-8">No recent activity</p>
                                ) : (
                                    activities.map((activity) => (
                                        <div key={activity._id} className="relative pl-8">
                                            <div className={`absolute left-0 top-1 h-5 w-5 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${activity.type === 'success' ? 'bg-green-100 text-green-700' :
                                                activity.type === 'error' ? 'bg-red-100 text-red-700' :
                                                    'bg-blue-100 text-blue-700'
                                                }`}>
                                            </div>
                                            <p className="text-sm text-gray-800 font-medium leading-tight">{activity.text}</p>
                                            <span className="text-xs text-gray-400 block mt-1">{new Date(activity.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Forum Admin Link */}
                        <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl shadow-lg p-6 text-white relative overflow-hidden transition-all hover:shadow-xl duration-300">
                            <div className="relative z-10">
                                <h3 className="font-bold text-xl mb-2 flex items-center">
                                    <MessageSquare className="h-6 w-6 mr-2 text-green-100" />
                                    Community Hub
                                </h3>
                                <p className="text-green-50 text-sm mb-6 leading-relaxed">
                                    Oversee discussions, moderate content, and engage with the gardening community.
                                </p>
                                <button
                                    onClick={() => navigate('/forum')}
                                    className="w-full flex items-center justify-center space-x-2 bg-white text-green-700 font-bold py-3 px-4 rounded-lg hover:bg-green-50 transition-all shadow-sm cursor-pointer transform active:scale-95"
                                >
                                    <span>Manage Forum</span>
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                            {/* Decorative Background Icon */}
                            <div className="absolute -bottom-6 -right-6 opacity-20 transform rotate-12">
                                <MessageCircle className="h-32 w-32 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default AdminDashboard;
