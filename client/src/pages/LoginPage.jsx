import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await login(email, password);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Login to GardenHub</h2>
                {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-200 cursor-pointer"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600 mb-6">
                    Don't have an account? <Link to="/register" className="text-green-600 hover:underline">Register</Link>
                </p>

                {/* Demo Accounts Section */}
                <div className="mt-6 border-t pt-4">
                    <p className="text-sm text-gray-500 text-center mb-3">Demo Accounts (Click to Auto-fill)</p>
                    <div className="grid grid-cols-1 gap-2">
                        <button
                            onClick={() => { setEmail('viewer@gardenhub.com'); setPassword('password123'); }}
                            className="text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 text-xs flex justify-between items-center group"
                        >
                            <div>
                                <span className="font-bold text-gray-700 block">User (Viewer)</span>
                                <span className="text-gray-500">viewer@gardenhub.com</span>
                            </div>
                            <span className="text-green-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Use »</span>
                        </button>

                        <button
                            onClick={() => { setEmail('gardener@gardenhub.com'); setPassword('password123'); }}
                            className="text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 text-xs flex justify-between items-center group"
                        >
                            <div>
                                <span className="font-bold text-green-700 block">Gardener</span>
                                <span className="text-gray-500">gardener@gardenhub.com</span>
                            </div>
                            <span className="text-green-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Use »</span>
                        </button>

                        <button
                            onClick={() => { setEmail('admin@gardenhub.com'); setPassword('password123'); }}
                            className="text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 text-xs flex justify-between items-center group"
                        >
                            <div>
                                <span className="font-bold text-purple-700 block">Admin</span>
                                <span className="text-gray-500">admin@gardenhub.com</span>
                            </div>
                            <span className="text-green-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Use »</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
