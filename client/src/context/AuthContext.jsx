import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    // Set default axios header
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }

    useEffect(() => {
        const checkUser = async () => {
            if (token) {
                try {
                    const res = await axios.get(`${API_BASE_URL}/api/users/me`);
                    setUser(res.data);
                } catch (error) {
                    console.error('Error fetching user', error);
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                }
            }
            setLoading(false);
        };

        checkUser();
    }, [token]);

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/api/users/login`, {
                email,
                password,
            });
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            setUser(res.data);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed',
            };
        }
    };

    const register = async (userData) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/api/users/register`, userData);
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            setUser(res.data);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed',
            };
        }
    };

    const updateUser = (updatedUserData) => {
        setUser(updatedUserData);
        // If we want to persist updates to the token payload immediately without re-login, 
        // we might not touch the token unless the backend issues a new one. 
        // The backend `updateUserProfile` DOES return a new token.
        if (updatedUserData.token) {
            localStorage.setItem('token', updatedUserData.token);
            setToken(updatedUserData.token);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
