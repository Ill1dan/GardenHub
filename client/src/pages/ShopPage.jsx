import { useState, useMemo, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ShoppingBag, Star, ArrowRight, ChevronLeft, ChevronRight, Loader2, Plus, X, Package, Trash } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const ShopPage = () => {
    // State for filters
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
    const [sortBy, setSortBy] = useState('recommended'); // 'recommended' | 'trending' | 'newest' | 'price-low' | 'price-high'
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user, token } = useContext(AuthContext);
    console.log('ShopPage User State:', user);
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [newItem, setNewItem] = useState({
        name: '', price: '', stock: '', category: 'Flowers', description: '', image_url: ''
    });
    const [updatingStock, setUpdatingStock] = useState(null); // ID of item being updated
    const [stockToAdd, setStockToAdd] = useState('');

    const categories = ['All', 'Flowers', 'Fruits', 'Vegetables'];

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let url = `${API_BASE_URL} /api/shop`;
                const params = new URLSearchParams();

                if (sortBy === 'trending') {
                    params.append('trending', 'true');
                } else if (sortBy === 'my-listing' && user) {
                    console.log('Filtering by gardener:', user._id);
                    params.append('gardener_id', user._id);
                }

                if (params.toString()) {
                    url += `? ${params.toString()} `;
                }

                console.log('Fetching products from:', url);
                const response = await axios.get(url);
                setProducts(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching shop items:', err);
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [sortBy, user]); // Re-fetch when sortBy or user changes

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${token} ` } };
            await axios.post(`${API_BASE_URL} /api/shop`, newItem, config);
            setShowAddItemModal(false);
            setNewItem({ name: '', price: '', stock: '', category: 'Flowers', description: '', image_url: '' });
            alert('Item added successfully!');
            // Refresh list
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Failed to add item');
        }
    };

    const handleAddStock = async (id) => {
        try {
            const config = { headers: { Authorization: `Bearer ${token} ` } };
            await axios.put(`${API_BASE_URL} /api/shop / ${id}/stock`, { quantity: stockToAdd }, config);
            setUpdatingStock(null);
            setStockToAdd('');
            alert('Stock updated!');
            // Optimistic update or reload
            setProducts(products.map(p => p._id === id ? { ...p, stock: p.stock + Number(stockToAdd) } : p));
        } catch (error) {
            console.error(error);
            alert('Failed to update stock');
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
            try {
                const config = { headers: { Authorization: `Bearer ${token}` } };
                await axios.delete(`${API_BASE_URL}/api/shop/${productId}`, config);
                // Immediately update local state
                setProducts(prev => prev.filter(p => p._id !== productId));
                alert('Product deleted successfully');
            } catch (err) {
                console.error('Failed to delete product', err);
                alert('Failed to delete product. Please try again.');
            }
        }
    };

    // Filter Logic
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query)
            );
        }

        // Category
        if (selectedCategory !== 'All') {
            result = result.filter(item => item.category === selectedCategory);
        }

        // Price
        result = result.filter(item =>
            item.price >= priceRange.min && item.price <= priceRange.max
        );

        // Client-side Sort (for non-trending options)
        // Note: 'trending' is now handled by server fetching, but we can still sort by sales count if returned
        switch (sortBy) {
            case 'newest':
                result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'trending':
                // The server already filtered for trending > 5 sales.
                break;
            case 'my-listing':
                if (user) {
                    result = result.filter(item => item.gardener_id === user._id);
                }
                break;
            default:
                break;
        }

        return result;
    }, [searchQuery, selectedCategory, priceRange, sortBy, products, user]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset page on filter change
    useMemo(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, priceRange, sortBy]);

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            <Navbar />

            {/* Header Banner */}
            <div className="bg-green-800 text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">GardenHub <span className="text-green-300">Shop</span></h1>
                    <p className="text-lg text-green-100 max-w-2xl mx-auto mb-8">
                        Discover fresh produce, rare plants, and gardening essentials directly from our community of expert gardeners.
                    </p>
                    {user && ['gardener', 'admin', 'expert'].includes(user.role) && (
                        <button
                            onClick={() => setShowAddItemModal(true)}
                            className="inline-flex items-center bg-white text-green-800 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            List New Product
                        </button>
                    )}
                </div>
            </div>

            {/* Add Item Modal */}
            {showAddItemModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl transform transition-all scale-100 overflow-hidden">
                        {/* Modal Header */}
                        <div className="bg-green-50 px-6 py-4 border-b border-green-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                <Plus className="w-5 h-5 mr-2 text-green-600" />
                                List New Product
                            </h2>
                            <button onClick={() => setShowAddItemModal(false)} className="text-gray-400 hover:text-red-500 transition-colors bg-white rounded-full p-1 hover:bg-red-50">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 max-h-[80vh] overflow-y-auto">
                            <form onSubmit={handleAddItem} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Organic Basil"
                                        className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                        value={newItem.name}
                                        onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Price ($)</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                                            <input
                                                type="number"
                                                required
                                                min="0"
                                                step="0.01"
                                                className="w-full pl-8 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                                value={newItem.price}
                                                onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Initial Stock</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                            value={newItem.stock}
                                            onChange={e => setNewItem({ ...newItem, stock: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                                    <div className="relative">
                                        <select
                                            className="w-full border border-gray-200 rounded-xl p-3 text-sm appearance-none focus:ring-2 focus:ring-green-500 outline-none bg-white"
                                            value={newItem.category}
                                            onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                                        >
                                            {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                        placeholder="https://source.unsplash.com/..."
                                        value={newItem.image_url}
                                        onChange={e => setNewItem({ ...newItem, image_url: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                                    <textarea
                                        required
                                        className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                        rows="3"
                                        placeholder="Describe your plant..."
                                        value={newItem.description}
                                        onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="pt-2">
                                    <button type="submit" className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold hover:bg-green-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex justify-center items-center">
                                        <Plus className="w-5 h-5 mr-2" /> Add Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}



            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full relative">
                <div className="flex flex-col lg:flex-row gap-8 mt-4">

                    {/* Sidebar Filters */}
                    <div className="lg:w-1/4 space-y-8 h-fit lg:sticky lg:top-24">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <Filter className="w-5 h-5 mr-2 text-green-600" /> Filters
                            </h3>

                            {/* Search */}
                            <div className="mb-6">
                                <label className="text-sm font-medium text-gray-700 block mb-2">Search</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="text"
                                        placeholder="Search for plants..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="mb-6">
                                <label className="text-sm font-medium text-gray-700 block mb-2">Category</label>
                                <div className="space-y-2">
                                    {categories.map(cat => (
                                        <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={selectedCategory === cat}
                                                onChange={() => setSelectedCategory(cat)}
                                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                                            />
                                            <span className={`text-sm ${selectedCategory === cat ? 'text-green-700 font-medium' : 'text-gray-600'} group-hover:text-green-600 transition-colors`}>
                                                {cat}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-medium text-gray-700">Price Range</label>
                                    <span className="text-xs text-green-600 font-medium">${priceRange.min} - ${priceRange.max}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                        min="0"
                                    />
                                    <span className="text-gray-400">-</span>
                                    <input
                                        type="number"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                        min="0"
                                    />
                                </div>
                            </div>

                            {/* Reset Button */}
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('All');
                                    setPriceRange({ min: 0, max: 100 });
                                    setSortBy('recommended');
                                }}
                                className="w-full py-2 text-sm text-gray-500 hover:text-green-600 font-medium transition-colors border-t border-gray-100 mt-2"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-gray-500 text-sm mb-4 sm:mb-0">
                                Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> results
                            </p>
                            <div className="flex items-center gap-2 text-sm">
                                <label className="text-gray-600 mr-2">Sort by:</label>
                                <select
                                    className="border-none bg-gray-50 rounded-lg px-4 py-2 font-medium text-gray-700 focus:ring-2 focus:ring-green-500 cursor-pointer"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="recommended">Recommended</option>
                                    <option value="trending">Trending</option>
                                    <option value="newest">Newest Arrivals</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    {user && ['gardener', 'admin', 'expert'].includes(user.role) && (
                                        <option value="my-listing">My Listings</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
                            </div>
                        ) : error ? (
                            <div className="text-center py-20 bg-white rounded-2xl border border-red-100">
                                <p className="text-red-500">{error}</p>
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {paginatedProducts.map((product) => (
                                    <div key={product._id} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col relative">
                                        {/* Image - Clickable */}
                                        <Link to={`/shop/${product._id}`} className="block aspect-[4/3] bg-gray-100 relative overflow-hidden">
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=600'; // Generic garden fallback
                                                }}
                                            />
                                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-green-700 shadow-sm">
                                                ${product.price.toFixed(2)}
                                            </div>
                                            {product.stock < 10 && (
                                                <div className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-white shadow-sm">
                                                    Low Stock
                                                </div>
                                            )}
                                        </Link>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">{product.category}</span>
                                                <div className="flex items-center text-yellow-400 text-xs font-bold">
                                                    <Star className="w-3 h-3 fill-current mr-1" />
                                                    {product.gardener?.rating || 0}
                                                </div>
                                            </div>

                                            <Link to={`/shop/${product._id}`} className="block">
                                                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors line-clamp-1">
                                                    {product.name}
                                                </h3>

                                                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                                                    {product.description}
                                                </p>
                                            </Link>

                                            <div className="mt-auto">
                                                <div className="flex items-center text-xs text-gray-500 mb-4 justify-between">
                                                    <span className={`${product.stock < 10 ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                                                        {product.stock} left in stock
                                                    </span>

                                                    {/* Add Stock UI for Gardener */}
                                                    {user && (user.role === 'admin' || (product.gardener_id && user._id === product.gardener_id)) && (
                                                        <div className="flex items-center gap-1 z-30">
                                                            {updatingStock === product._id ? (
                                                                <div className="flex items-center bg-gray-100 rounded p-1">
                                                                    <input
                                                                        type="number"
                                                                        className="w-12 text-xs border rounded px-1 py-0.5"
                                                                        autoFocus
                                                                        value={stockToAdd}
                                                                        onChange={(e) => setStockToAdd(e.target.value)}
                                                                    />
                                                                    <button
                                                                        onClick={() => handleAddStock(product._id)}
                                                                        className="ml-1 text-green-600 font-bold hover:text-green-800"
                                                                    >✓</button>
                                                                    <button
                                                                        onClick={() => setUpdatingStock(null)}
                                                                        className="ml-1 text-red-500 font-bold hover:text-red-700"
                                                                    >✕</button>
                                                                </div>
                                                            ) : (
                                                                <button
                                                                    onClick={() => { setUpdatingStock(product._id); setStockToAdd(''); }}
                                                                    className="text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100 border border-green-200 cursor-pointer"
                                                                >
                                                                    + Stock
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                                    <div className="text-xs text-gray-500">
                                                        By <span className="font-medium text-gray-700">{product.gardener?.name || 'Unknown'}</span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        {user && (user.role === 'admin' || (product.gardener_id && user._id === product.gardener_id)) && (
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product._id); }}
                                                                className="h-8 w-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                                                                title="Delete Listing"
                                                            >
                                                                <Trash className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                        <Link to={`/shop/${product._id}`} className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
                                                            {user && (user.role === 'admin' || (product.gardener_id && user._id === product.gardener_id)) ? (
                                                                <Package className="w-4 h-4" />
                                                            ) : (
                                                                <ShoppingBag className="w-4 h-4" />
                                                            )}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 border-dashed">
                                <div className="mx-auto h-24 w-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                    <ShoppingBag className="h-10 w-10 text-gray-300" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                                <p className="mt-1 text-gray-500">Try adjusting your search or filters.</p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedCategory('All');
                                        setPriceRange({ min: 0, max: 100 });
                                    }}
                                    className="mt-6 text-green-600 font-medium hover:text-green-700"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        {!loading && filteredProducts.length > itemsPerPage && (
                            <div className="flex justify-center mt-12 gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-10 h-10 rounded-lg font-medium transition-colors cursor-pointer ${currentPage === page
                                            ? 'bg-green-600 text-white shadow-md'
                                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ShopPage;
