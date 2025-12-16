import { Link, useLocation } from 'react-router-dom';
import { Leaf, User, Menu, X } from 'lucide-react';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const getDashboardPath = () => {
        if (!user) return '/login';
        if (user.role === 'admin') return '/admin-dashboard';
        if (user.role === 'gardener' || user.role === 'expert') return '/gardener-dashboard';
        return '/dashboard';
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        ...(user ? [{ name: 'Dashboard', path: getDashboardPath() }] : []),
        { name: 'Gardeners', path: '/gardeners' },
        { name: 'Shop', path: '/shop' },
        { name: 'Service', path: '/services' },
        { name: 'Problems', path: '/problems' },
        { name: 'Regional', path: '/regional' },
        { name: 'Membership', path: '/membership' },
    ];

    return (
        <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-green-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center group">
                        <div className="bg-green-100 p-2 rounded-xl group-hover:bg-green-200 transition-colors">
                            <Leaf className="h-6 w-6 text-green-700" />
                        </div>
                        <span className="ml-3 font-bold text-xl text-gray-800 tracking-tight">
                            Garden<span className="text-green-600">Hub</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive(link.path)
                                    ? 'text-green-700 bg-green-50'
                                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50/50'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* User Profile / Mobile Menu */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-3">
                                <div className="hidden md:flex flex-col items-end">
                                    <span className="text-sm font-semibold text-gray-700">{user.name}</span>
                                    <span className="text-xs text-green-600 font-medium capitalize">{user.role}</span>
                                </div>
                                <div className="relative group cursor-pointer">
                                    {user.profilePicture ? (
                                        <img
                                            src={user.profilePicture}
                                            alt={user.name}
                                            className="h-10 w-10 rounded-full border-2 border-green-200 object-cover group-hover:border-green-400 transition"
                                        />
                                    ) : (
                                        <div className="bg-green-100 p-2 rounded-full border border-green-200 group-hover:border-green-300 transition">
                                            <User className="h-5 w-5 text-green-700" />
                                        </div>
                                    )}
                                    {/* Dropdown could go here */}
                                </div>
                                <button
                                    onClick={logout}
                                    className="hidden md:block text-sm text-gray-500 hover:text-red-600 transition ml-2 cursor-pointer"
                                >
                                    Log out
                                </button>
                            </div>
                        ) : (
                            <div className="hidden md:flex space-x-3">
                                <Link to="/login" className="text-gray-600 hover:text-green-700 px-4 py-2 text-sm font-medium">Login</Link>
                                <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 shadow-sm hover:shadow-green-200 transition">Register</Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-600 hover:text-green-600 focus:outline-none"
                            >
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path)
                                    ? 'text-green-700 bg-green-50'
                                    : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
