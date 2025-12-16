import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowRight, Leaf, Shield, Sun, Users, Star } from 'lucide-react';

const HomePage = () => {
    const { user } = useContext(AuthContext);

    const stats = [
        { label: 'Active Users', value: '2,000+' },
        { label: 'Expert Gardeners', value: '150+' },
        { label: 'Plants Sold', value: '15k+' },
        { label: 'Happy Homes', value: '98%' },
    ];

    const features = [
        {
            icon: Leaf,
            title: 'Premium Plants',
            description: 'Source the healthiest plants and rare seeds directly from verified local nurseries.'
        },
        {
            icon: Users,
            title: 'Expert Gardeners',
            description: 'Hire rated professionals for landscaping, maintenance, and plant care consultations.'
        },
        {
            icon: Shield,
            title: 'Guaranteed Quality',
            description: 'Every service and product comes with our "Green Thumb" satisfaction guarantee.'
        },
        {
            icon: Sun,
            title: 'Easy Scheduling',
            description: 'Book services at your convenience with our smart real-time scheduling system.'
        }
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
            <Navbar />

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-green-50/50">
                <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-green-100/40 to-transparent pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
                    <div className="lg:w-1/2 space-y-8">
                        <div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-6">
                                <Star className="h-4 w-4 mr-1 fill-green-800" /> #1 Gardening Platform
                            </span>
                            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                                Bring <span className="text-green-600">Nature</span> to <br /> Your Doorstep
                            </h1>
                            <p className="mt-4 text-xl text-gray-500 max-w-lg">
                                Connect with expert gardeners, discover rare plants, and transform your home into a thriving green sanctuary.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            {user ? (
                                <Link
                                    to={user.role === 'admin' ? '/admin-dashboard' : user.role === 'gardener' ? '/gardener-dashboard' : '/dashboard'}
                                    className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 md:text-lg shadow-lg hover:shadow-green-200 transition-all transform hover:-translate-y-1"
                                >
                                    Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/register"
                                        className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 md:text-lg shadow-lg hover:shadow-green-200 transition-all transform hover:-translate-y-1"
                                    >
                                        Get Started
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="inline-flex justify-center items-center px-8 py-4 border border-gray-200 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 md:text-lg hover:text-green-600 transition-colors"
                                    >
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Abstract Green Graphic / Placeholder for Hero Image */}
                    <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-full">
                        {/* You could use an <img> here if you had an asset. Using shapes for now. */}
                        <div className="absolute right-10 top-20 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                        <div className="absolute right-40 bottom-20 w-72 h-72 bg-emerald-200 rounded-full blur-3xl opacity-30"></div>

                        {/* SVG Illustration Placeholder */}
                        <div className="relative h-full w-full flex items-center justify-center">
                            <Leaf className="h-96 w-96 text-green-600 opacity-10 rotate-12" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <div key={index}>
                                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Everything you need for your <span className="text-green-600">Garden</span>
                        </h2>
                        <p className="mt-4 text-lg text-gray-500">
                            We provide a complete ecosystem for plant lovers, from connecting with experts to finding the perfect tools.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                                <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                                    <feature.icon className="h-6 w-6 text-green-600 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-500 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-green-600 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-extrabold text-white mb-6">
                        Ready to start your green journey?
                    </h2>
                    <p className="text-green-100 text-lg mb-8">
                        Join thousands of happy gardeners today. It takes less than a minute to get started.
                    </p>
                    <Link
                        to="/register"
                        className="inline-block bg-white text-green-700 font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-gray-100 transition-colors"
                    >
                        Create Free Account
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default HomePage;
