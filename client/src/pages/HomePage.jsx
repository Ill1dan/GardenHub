import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const HomePage = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold text-green-600 mb-6">Welcome to GardenHub</h1>
                {user ? (
                    <div>
                        <p className="text-xl mb-4">Hello, <span className="font-semibold">{user.name}</span>!</p>
                        <p className="text-gray-600 mb-6">Role: {user.role}</p>
                        <button
                            onClick={logout}
                            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="space-x-4">
                        <Link
                            to="/login"
                            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
