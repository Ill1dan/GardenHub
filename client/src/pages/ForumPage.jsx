import { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CommunityPreview from '../components/Dashboard/CommunityPreview';
import AuthContext from '../context/AuthContext';
import { Plus, X, Search } from 'lucide-react';
import axios from 'axios';

const ForumPage = () => {
    const { user, token } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/forum');
                setPosts(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching posts:", err);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleInputChange = (e) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newPost.title || !newPost.content) return;

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const res = await axios.post('http://localhost:5000/api/forum', newPost, config);
            setPosts([res.data, ...posts]);
            setIsModalOpen(false);
            setNewPost({ title: '', content: '' });
        } catch (err) {
            console.error("Error creating post:", err);
            alert("Failed to create post. Please try again.");
        }
    };

    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + "y ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + "mo ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + "d ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + "h ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + "m ago";
        return Math.floor(seconds) + "s ago";
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-green-100 selection:text-green-900">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                        Community <span className="text-green-600">Forum</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Share your gardening journey, ask for advice, and connect with fellow plant enthusiasts.
                    </p>
                </div>

                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search discussions..."
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm shadow-sm transition-shadow hover:shadow-md"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {user && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full md:w-auto flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 md:py-3 md:text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
                        >
                            <Plus className="mr-2 h-5 w-5" />
                            Share Experience
                        </button>
                    )}
                </div>

                {/* Content Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-2xl p-5 h-64 border border-gray-100"></div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map((post) => (
                                <CommunityPreview
                                    key={post._id}
                                    author={post.user_id ? post.user_id.name : 'Unknown User'}
                                    authorImage={post.user_id && post.user_id.profilePicture ? post.user_id.profilePicture : null}
                                    time={timeAgo(post.createdAt)}
                                    title={post.title}
                                    content={post.content}
                                    tags={['Gardening']}
                                    likes={0}
                                    comments={0}
                                />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {filteredPosts.length > postsPerPage && (
                            <div className="flex justify-center items-center space-x-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                >
                                    Previous
                                </button>

                                {[...Array(Math.ceil(filteredPosts.length / postsPerPage))].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-4 py-2 border rounded-lg text-sm font-medium ${currentPage === i + 1 ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredPosts.length / postsPerPage)))}
                                    disabled={currentPage === Math.ceil(filteredPosts.length / postsPerPage)}
                                    className={`px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium ${currentPage === Math.ceil(filteredPosts.length / postsPerPage) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}

                {!loading && filteredPosts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No posts found. Be the first to share!</p>
                    </div>
                )}

            </main>

            <Footer />

            {/* Create Post Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl transform transition-all scale-100 flex flex-col max-h-[90vh]">

                        {/* Modal Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900">
                                Share Your Experience
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-colors cursor-pointer"
                                type="button"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-5">
                                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="block w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                        placeholder="e.g., How to grow organic tomatoes"
                                        value={newPost.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                                    <textarea
                                        name="content"
                                        id="content"
                                        rows="5"
                                        className="block w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                                        placeholder="Share your tips, questions, or stories..."
                                        value={newPost.content}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 shadow-lg shadow-green-200 transition-all transform active:scale-95 cursor-pointer"
                                    >
                                        Post
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForumPage;
