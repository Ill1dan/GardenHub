import { Leaf, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-green-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center mb-6">
                            <div className="bg-green-800 p-2 rounded-lg mr-3">
                                <Leaf className="h-6 w-6 text-green-300" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">GardenHub</span>
                        </div>
                        <p className="text-green-200 mb-6 leading-relaxed">
                            Cultivating a greener world, one garden at a time. Join our community of plant enthusiasts today.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition-colors">
                                <Facebook className="h-5 w-5 text-green-100" />
                            </a>
                            <a href="#" className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition-colors">
                                <Twitter className="h-5 w-5 text-green-100" />
                            </a>
                            <a href="#" className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition-colors">
                                <Instagram className="h-5 w-5 text-green-100" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-green-50">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link to="/" className="text-green-200 hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/shop" className="text-green-200 hover:text-white transition-colors">Shop Plants</Link></li>
                            <li><Link to="/gardeners" className="text-green-200 hover:text-white transition-colors">Find a Gardener</Link></li>
                            <li><Link to="/membership" className="text-green-200 hover:text-white transition-colors">Membership</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-green-50">Resources</h3>
                        <ul className="space-y-4">
                            <li><Link to="/problems" className="text-green-200 hover:text-white transition-colors">Plant Problems</Link></li>
                            <li><Link to="/regional" className="text-green-200 hover:text-white transition-colors">Regional Guide</Link></li>
                            <li><Link to="#" className="text-green-200 hover:text-white transition-colors">Care Tips</Link></li>
                            <li><Link to="#" className="text-green-200 hover:text-white transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-green-50">Contact Us</h3>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center text-green-200">
                                <MapPin className="h-5 w-5 mr-3 text-green-400" />
                                123 Green Street, Garden City
                            </li>
                            <li className="flex items-center text-green-200">
                                <Phone className="h-5 w-5 mr-3 text-green-400" />
                                +1 (555) 123-4567
                            </li>
                            <li className="flex items-center text-green-200">
                                <Mail className="h-5 w-5 mr-3 text-green-400" />
                                support@gardenhub.com
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-green-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-green-300 text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} GardenHub. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-sm text-green-300">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
