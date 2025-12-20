import { Sprout, ShoppingBag, Shovel, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/Dashboard/FeatureCard';
import CommunityPreview from '../components/Dashboard/CommunityPreview';
import ExpertBanner from '../components/Dashboard/ExpertBanner';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const firstName = user ? user.name.split(' ')[0] : 'Gardener';

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 selection:bg-green-100 selection:text-green-900">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-16">

                {/* Hero / Welcome Section */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                                Good Morning, <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">{firstName}</span>! 🌿
                            </h1>
                            <p className="text-gray-500 mt-2 text-lg">Your garden is looking great today. What would you like to do?</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FeatureCard
                            title="My Garden"
                            description="Track your plants, manage watering schedules, and monitor growth."
                            icon={Sprout}
                            onClick={() => { }}
                        />
                        <FeatureCard
                            title="Identify Problem"
                            description="Snap a photo to detect diseases or pests instantly."
                            icon={Zap}
                            onClick={() => { }}
                        />
                        <FeatureCard
                            title="Shop Plants"
                            description="Browse our curated collection of seeds, tools, and plants."
                            icon={ShoppingBag}
                            onClick={() => { }}
                        />
                        <FeatureCard
                            title="Book Gardener"
                            description="Hire a professional to help maintain your green space."
                            icon={Shovel}
                            onClick={() => { }}
                        />
                    </div>
                </section>

                {/* Expert Banner Section */}
                <section>
                    <ExpertBanner />
                </section>

                {/* Community Section */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Community Highlights</h2>
                            <p className="text-gray-500 mt-1">Trending tips and show-offs from fellow gardeners.</p>
                        </div>
                        <button
                            onClick={() => navigate('/forum')}
                            className="text-green-600 font-semibold hover:text-green-700 hover:underline cursor-pointer"
                        >
                            View all
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <CommunityPreview
                            title="My Tomato plant is finally fruiting! 🍅"
                            content="After 3 months of care and using the recommended fertilizer, I finally see these beauties. Check out the progress..."
                            author="Sarah Jenkins"
                            authorImage="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
                            time="2h ago"
                            tags={['Vegetables', 'Organic']}
                            likes={124}
                            comments={18}
                        />
                        <CommunityPreview
                            title="Best indoor plants for low light?"
                            content="I have a north-facing window and want to add some greenery. Any suggestions for bomb-proof houseplants?"
                            author="Mike Chen"
                            authorImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                            time="5h ago"
                            tags={['Indoor', 'Advice']}
                            likes={45}
                            comments={32}
                        />
                        <CommunityPreview
                            title="DIY Automatic Watering System"
                            content="Built this simple gravity-fed system for my balcony using recycled bottles. Here are the plans for anyone interested."
                            author="Alex Rivera"
                            authorImage="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
                            time="1d ago"
                            tags={['DIY', 'Tips']}
                            likes={892}
                            comments={56}
                        />
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
};

export default UserDashboard;
