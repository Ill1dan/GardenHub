import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingBag, Truck, ShieldCheck, Loader2, PackagePlus, Check, Trash } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import AuthContext from '../context/AuthContext';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token } = useContext(AuthContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [stockToAdd, setStockToAdd] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdateStock = async () => {
        if (!stockToAdd || isNaN(stockToAdd) || Number(stockToAdd) <= 0) return;
        setIsUpdating(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const res = await axios.put(`${API_BASE_URL}/api/shop/${id}/stock`, { quantity: Number(stockToAdd) }, config);
            setProduct({ ...product, stock: res.data.stock });
            setStockToAdd('');
        } catch (error) {
            console.error("Failed to update stock", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                await axios.delete(`${API_BASE_URL}/api/shop/${id}`, config);
                navigate('/shop');
            } catch (error) {
                console.error("Failed to delete product", error);
                alert('Failed to delete product');
            }
        }
    };

    // Fetch product details
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/api/shop/${id}`);
                setProduct(response.data);

                // Fetch related (rudimentary implementation: fetch all and filter by category on client for now)
                // In a real app, this would be a specific endpoint
                const allResponse = await axios.get(`${API_BASE_URL}/api/shop`);
                const allItems = allResponse.data;
                const related = allItems
                    .filter(item => item.category === response.data.category && item._id !== id)
                    .slice(0, 4);
                setRelatedProducts(related);

            } catch (error) {
                console.error("Error fetching product:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col font-sans">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-8">
                    <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
                    <p className="text-gray-500">Loading product details...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col font-sans">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                    <p className="text-gray-500 mb-8">The product you are looking for does not exist or has been removed.</p>
                    <Link to="/shop" className="text-green-600 font-medium hover:underline flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                {/* Breadcrumb / Back */}
                <div className="mb-8">
                    <Link to="/shop" className="text-gray-500 hover:text-green-600 flex items-center transition-colors w-fit">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
                    </Link>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Image Section */}
                        <div className="bg-gray-100 relative h-96 md:h-auto">
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=600'; // Generic garden fallback
                                }}
                            />
                        </div>

                        {/* Details Section */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <div className="flex items-center space-x-2 text-sm text-green-600 font-bold tracking-wide uppercase mb-3">
                                <span>{product.category}</span>
                                <span className="text-gray-300">•</span>
                                <span className={product.stock > 0 ? "text-green-600" : "text-red-500"}>
                                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>

                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 lh-tight">{product.name}</h1>

                            <div className="flex items-center mb-6">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.gardener?.rating || 0) ? 'fill-current' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <span className="ml-2 text-gray-500 text-sm">({product.gardener?.rating || 0} rating)</span>
                                <span className="mx-4 text-gray-300">|</span>
                                <span className="text-gray-500 text-sm">{product.sales} sold</span>
                            </div>

                            <div className="text-3xl font-bold text-gray-900 mb-8">${product.price.toFixed(2)}</div>

                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {product.description}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                {user && (user.role === 'admin' || (product.gardener_id && user._id === product.gardener_id)) ? (
                                    <div className="w-full bg-green-50 rounded-xl p-6 border border-green-100">
                                        <h3 className="font-bold text-green-800 mb-4 flex items-center">
                                            <PackagePlus className="w-5 h-5 mr-2" /> Manage Inventory
                                        </h3>
                                        <div className="flex gap-3">
                                            <input
                                                type="number"
                                                min="1"
                                                placeholder="Qty to add"
                                                className="flex-1 border border-green-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none bg-white"
                                                value={stockToAdd}
                                                onChange={(e) => setStockToAdd(e.target.value)}
                                            />
                                            <button
                                                onClick={handleUpdateStock}
                                                disabled={isUpdating || !stockToAdd}
                                                className="bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Add Stock'}
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-center mt-4 border-t border-green-200 pt-4">
                                            <p className="text-xs text-green-600">
                                                Current Stock: <span className="font-bold">{product.stock}</span>
                                            </p>
                                            <button
                                                onClick={handleDelete}
                                                className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center transition-colors"
                                            >
                                                <Trash className="w-3 h-3 mr-1" /> Delete Product
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <button className="flex-1 bg-green-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-green-700 hover:shadow-green-200 transition-all flex items-center justify-center">
                                            <ShoppingBag className="w-5 h-5 mr-3" /> Add to Cart
                                        </button>
                                        <button className="flex-1 bg-white text-gray-700 font-bold py-4 px-8 rounded-xl border border-gray-200 hover:bg-gray-50 hover:text-green-600 transition-colors">
                                            Buy Now
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
                                <div className="flex items-center text-gray-600">
                                    <Truck className="w-5 h-5 mr-3 text-green-600" />
                                    <span className="text-sm">Fast Delivery</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <ShieldCheck className="w-5 h-5 mr-3 text-green-600" />
                                    <span className="text-sm">Quality Guarantee</span>
                                </div>
                                <div className="col-span-2 text-sm text-gray-500 mt-2">
                                    Sold by <span className="font-bold text-gray-900">{product.gardener?.name || 'Unknown'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products (Simple implementation: Same category) */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {relatedProducts.map(related => (
                            <Link key={related._id} to={`/shop/${related._id}`} className="group block">
                                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all">
                                    <div className="aspect-square bg-gray-100 relative">
                                        <img src={related.image_url} alt={related.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors truncate">{related.name}</h4>
                                        <p className="text-gray-500 text-sm mt-1">${related.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default ProductDetailsPage;
