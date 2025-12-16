import { Users, Eye, Shovel, Search, Filter, Edit2, Trash2, MoreVertical, Activity, ChevronRight, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminDashboard = () => {
    // Mock Data
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Viewer', experience: 'N/A', joinDate: '2024-01-15', status: 'Active' },
        { id: 2, name: 'Alice Smith', email: 'alice@garden.com', role: 'Gardener', experience: '5 Years', joinDate: '2024-02-01', status: 'Active' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer', experience: 'N/A', joinDate: '2024-02-10', status: 'Inactive' },
        { id: 4, name: 'Emma Brown', email: 'emma@garden.com', role: 'Gardener', experience: '2 Years', joinDate: '2024-03-05', status: 'Active' },
        { id: 5, name: 'Charlie Day', email: 'charlie@example.com', role: 'Viewer', experience: 'N/A', joinDate: '2024-03-20', status: 'Active' },
    ];

    const stats = [
        { title: 'Total Users', count: 1250, icon: Users, color: 'blue', trend: '+12%', trendUp: true },
        { title: 'Viewers', count: 850, icon: Eye, color: 'purple', trend: '+5%', trendUp: true },
        { title: 'Gardeners', count: 400, icon: Shovel, color: 'green', trend: '-2%', trendUp: false },
    ];

    const activities = [
        { id: 1, text: 'New gardener registered: David Ko', time: '10 min ago', color: 'bg-green-100 text-green-700' },
        { id: 2, text: 'User report: Bug in payment flow', time: '1h ago', color: 'bg-red-100 text-red-700' },
        { id: 3, text: 'System backup completed', time: '3h ago', color: 'bg-blue-100 text-blue-700' },
        { id: 4, text: 'New post flagged in Community', time: '5h ago', color: 'bg-yellow-100 text-yellow-700' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#f3f4f6] font-sans text-gray-900 selection:bg-green-100 selection:text-green-900">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full mb-10">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">User Management</h1>
                        <p className="text-gray-500 mt-1">Manage platform users, roles, and permissions.</p>
                    </div>
                    <button className="hidden sm:flex items-center text-sm font-medium text-green-600 hover:text-green-700">
                        View System Health <ArrowUpRight className="ml-1 h-4 w-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content (Stats + Table) */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.title}</p>
                                            <div className="flex items-baseline mt-1 space-x-2">
                                                <h3 className="text-3xl font-bold text-gray-900">{stat.count}</h3>
                                                <span className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${stat.trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                                    {stat.trendUp ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                                                    {stat.trend}
                                                </span>
                                            </div>
                                        </div>
                                        <div className={`p-3 rounded-full bg-${stat.color}-50`}>
                                            <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-4">vs last month</p>
                                </div>
                            ))}
                        </div>

                        {/* Filter & Table Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Filters */}
                            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="relative flex-grow max-w-md">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors"
                                        placeholder="Search users..."
                                    />
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="flex items-center px-4 py-2.5 border border-gray-200 rounded-lg text-gray-600 bg-white hover:bg-gray-50 text-sm font-medium transition-colors">
                                        <Filter className="h-4 w-4 mr-2" />
                                        Filters
                                    </button>
                                    <button className="flex items-center px-4 py-2.5 border border-transparent rounded-lg text-white bg-green-600 hover:bg-green-700 text-sm font-medium shadow-sm transition-colors">
                                        + User
                                    </button>
                                </div>
                            </div>

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
                                        {users.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center text-green-700 font-bold">
                                                                {user.name.charAt(0)}
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                            <div className="text-sm text-gray-500">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'Gardener' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {user.joinDate}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <button className="text-gray-400 hover:text-green-600 transition-colors p-1 rounded-full hover:bg-gray-100">
                                                            <Edit2 className="h-4 w-4" />
                                                        </button>
                                                        <button className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-gray-100">
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination (Mock UI) */}
                            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-sm text-gray-500">Showing <span className="font-medium">1-5</span> of <span className="font-medium">24</span> results</span>
                                <div className="flex space-x-2">
                                    <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-500 disabled:opacity-50" disabled>Previous</button>
                                    <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-900 hover:bg-gray-50">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Activity Log */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
                                <Activity className="h-5 w-5 mr-2 text-green-600" />
                                Activity Log
                            </h3>
                            <div className="space-y-6 relative">
                                {/* Vertical Line */}
                                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gray-100"></div>

                                {activities.map((activity) => (
                                    <div key={activity.id} className="relative pl-8">
                                        <div className={`absolute left-0 top-1 h-5 w-5 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${activity.color.split(' ')[0]}`}>
                                        </div>
                                        <p className="text-sm text-gray-800 font-medium leading-tight">{activity.text}</p>
                                        <span className="text-xs text-gray-400 block mt-1">{activity.time}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-6 w-full py-2 bg-gray-50 text-gray-600 font-medium text-sm rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
                                View History
                            </button>
                        </div>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default AdminDashboard;
