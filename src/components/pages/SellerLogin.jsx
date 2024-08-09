import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../apiconfig.jsx';
import { useAuth } from '../Auth';

export const SellerLogin = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const auth = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await auth.sellerLogin({
                username: usernameOrEmail.includes('@') ? undefined : usernameOrEmail,
                email: usernameOrEmail.includes('@') ? usernameOrEmail : undefined,
                password: password,
            });
        } catch (err) {
            console.error('Error logging in:', err);
            setError('Invalid login credentials or not a seller');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-3xl font-bold mb-5">Seller Login</h1>
            <form onSubmit={handleLogin} className="space-y-5">
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Username or Email</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-3 rounded-md"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Password</label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 p-3 rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default SellerLogin;
