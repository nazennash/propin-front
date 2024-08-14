import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosPrivateInstance } from '../apiconfig';
import { useAuth } from '../Auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Extract login function from auth context

    // Redirect to dashboard if there is an existing token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/'); // Redirect to homepage if token exists
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivateInstance.post('users/seller-login/', {
                email,
                password
            });
            const token = response.data.access;
            const user = response.data.username;

            // Log token and user for debugging
            console.log('Login response:', response.data);
            console.log('Token:', token);
            console.log('User:', user);

            // Store token and user in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Set user authentication state
            login(user);

            // Redirect to homepage after successful login
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid credentials');
        }
    };

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-3xl font-bold mb-5">Login</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
