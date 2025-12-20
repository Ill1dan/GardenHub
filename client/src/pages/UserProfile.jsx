import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Camera, Save, X, ArrowLeft, Edit2 } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const UserProfile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        profilePicture: user?.profilePicture || '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (formData.password && formData.password !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }

        setLoading(true);
        try {
            const res = await axios.put('http://localhost:5000/api/users/profile', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                profilePicture: formData.profilePicture,
                ...(formData.password && { password: formData.password })
            });

            updateUser(res.data);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setIsEditing(false);
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Update failed' });
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div className="text-center mt-20">Please log in to view your profile.</div>;

    return (
        <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center text-gray-600 hover:text-green-700 transition-colors duration-200 cursor-pointer group"
                >
                    <div className="bg-white p-2 rounded-full shadow-sm group-hover:shadow-md transition-all duration-200 mr-2 border border-gray-100">
                        <ArrowLeft className="h-5 w-5" />
                    </div>
                    <span className="font-medium">Back</span>
                </button>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Header Background */}
                    <div className="h-40 bg-gradient-to-r from-green-600 via-emerald-500 to-green-400 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
                    </div>

                    <div className="relative px-8 pb-8">
                        {/* Profile Picture Section */}
                        <div className="relative -mt-20 mb-8 flex flex-col sm:flex-row items-center sm:items-end sm:justify-between">
                            <div className="relative group">
                                {formData.profilePicture ? (
                                    <img
                                        src={formData.profilePicture}
                                        alt={user.name}
                                        className="h-40 w-40 rounded-full border-[6px] border-white object-cover shadow-lg bg-white ring-1 ring-black/5"
                                    />
                                ) : (
                                    <div className="h-40 w-40 rounded-full border-[6px] border-white bg-green-100 flex items-center justify-center shadow-lg ring-1 ring-black/5">
                                        <User className="h-20 w-20 text-green-600" />
                                    </div>
                                )}
                                {isEditing && (
                                    <div className="absolute bottom-2 right-2 bg-green-600 text-white p-2 rounded-full shadow-md cursor-pointer hover:bg-green-700 transition-colors">
                                        <Camera className="h-5 w-5" />
                                    </div>
                                )}
                            </div>

                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="mt-6 sm:mt-0 sm:mb-4 px-6 py-2.5 bg-green-600 text-white rounded-full hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-md font-medium flex items-center gap-2 cursor-pointer"
                                >
                                    <Edit2 className="h-4 w-4" />
                                    Edit Profile
                                </button>
                            )}
                        </div>

                        {/* User Info Header */}
                        <div className="mb-8 text-center sm:text-left">
                            <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-1">{user.name}</h1>
                            <div className="flex items-center justify-center sm:justify-start space-x-2">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide
                                    ${user.role === 'admin' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                                        user.role === 'gardener' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                                            user.role === 'expert' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                                                'bg-green-100 text-green-700 border border-green-200'}`}>
                                    {user.role}
                                </span>
                            </div>
                        </div>

                        {message && (
                            <div className={`mb-8 p-4 rounded-xl flex items-center border ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                {message.type === 'error' && <X className="h-5 w-5 mr-3 flex-shrink-0" />}
                                <p className="text-sm font-medium">{message.text}</p>
                            </div>
                        )}

                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                                        <User className="h-5 w-5 mr-2 text-green-600" />
                                        Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture URL</label>
                                            <div className="relative rounded-lg shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Camera className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="profilePicture"
                                                    value={formData.profilePicture}
                                                    onChange={handleChange}
                                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm"
                                                    placeholder="https://example.com/avatar.jpg"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                            <div className="relative rounded-lg shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <User className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                            <div className="relative rounded-lg shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Mail className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                            <div className="relative rounded-lg shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Phone className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                                        <User className="h-5 w-5 mr-2 text-green-600" />
                                        Security
                                    </h3>
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm"
                                                placeholder="Leave blank to keep current"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="inline-flex items-center px-8 py-3 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                                    >
                                        {loading ? 'Saving Changes...' : (
                                            <>
                                                <Save className="h-4 w-4 mr-2" />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300 group">
                                    <div className="flex items-center mb-3">
                                        <div className="bg-white p-2 rounded-lg shadow-sm text-green-600 group-hover:text-green-700 transition-colors">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <span className="text-xs uppercase tracking-wide font-bold text-gray-500 ml-3">Email Address</span>
                                    </div>
                                    <p className="text-gray-900 font-semibold text-lg ml-[3.25rem]">{user.email}</p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300 group">
                                    <div className="flex items-center mb-3">
                                        <div className="bg-white p-2 rounded-lg shadow-sm text-green-600 group-hover:text-green-700 transition-colors">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <span className="text-xs uppercase tracking-wide font-bold text-gray-500 ml-3">Phone Number</span>
                                    </div>
                                    <p className="text-gray-900 font-semibold text-lg ml-[3.25rem]">{user.phone || 'Not provided'}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
