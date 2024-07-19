import React, { useState } from "react";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";

export const Register = () => {
  const [view, setView] = useState('requestOTP');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate()
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || '/';
  console.log(redirectPath)


  const [user, setUser] = useState('');
  const auth = useAuth();



  const requestOtp = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('https://pinacore-rnlyj.ondigitalocean.app/users/request-otp/', { phone_number: phoneNumber });
      setView('verifyOTP');
      setError('OTP sent successfully');
    } catch (err) {
      console.log(err);
      setError('Failed to request OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.patch(
        'https://pinacore-rnlyj.ondigitalocean.app/users/verify-otp/',
        { phone_number: phoneNumber, otp: otp }
      );

      const token = response.data.access;
      const refresh = response.data.refresh;
      const phone_number = response.data.phone_number
      const name = response.data.name;



      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('phoneNumber', phone_number);
      localStorage.setItem('name', name);

      if (response.status === 200) {
        auth.login(user);
        navigate(redirectPath, { replace: true });
        window.location.reload();
      }

    } catch (err) {
      console.error('Error verifying OTP:', err);
      setError('Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };



  const registerUser = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('https://pinacore-rnlyj.ondigitalocean.app/users/register/', { phone_number: phoneNumber, name: name });
      alert('Registered');
    } catch (err) {
      setError('Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {view === 'requestOTP' && (
        <div className="w-full max-w-sm shadow-md rounded px-10 pt-6 pb-8 mb-4 mx-auto mt-20">
          <form className="w-full max-w-sm" method="POST" onSubmit={(e) => { e.preventDefault(); requestOtp(); }}>
            <div className="font-bold text-center mb-5">
              <h1>Request OTP</h1>
            </div>
            <div className="flex items-center border-b border-teal-500 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Enter Phone number"
                aria-label="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button
                className="flex-shrink-0 bg-[#4286f4] hover:bg-[#24C6DC] border-[#4286f4] hover:border-[#24C6DC] text-sm border-4 text-white py-1 px-2 rounded"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Submit'}
              </button>
            </div>
          </form>
          {error && <div className="mt-4 text-red-500">{error}</div>}
          <div className="mt-4">
            <span>Don't have an account? <a className="text-red-500 font-bold" onClick={() => setView('registration')}>Register</a></span>
          </div>
        </div>
      )}

      {view === 'verifyOTP' && (
        <div className="w-full max-w-sm shadow-md rounded px-10 pt-6 pb-8 mb-4 mx-auto mt-20">
          <form className="w-full max-w-sm" method="POST" onSubmit={(e) => { e.preventDefault(); verifyOtp(); }}>
            <div className="font-bold text-center mb-5">
              <h1>Verify OTP</h1>
            </div>
            <div className="flex items-center border-b border-teal-500 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Enter OTP"
                aria-label="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                className="flex-shrink-0 bg-[#4286f4] hover:bg-[#24C6DC] border-[#4286f4] hover:border-[#24C6DC] text-sm border-4 text-white py-1 px-2 rounded"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Verify'}
              </button>
            </div>
          </form>
          {error && <div className="mt-4 text-red-500">{error}</div>}
          <div className="mt-4">
            message that otp is sent
          </div>
        </div>
      )}

      {view === 'registration' && (
        <div className="w-full max-w-sm shadow-md rounded px-10 pt-6 pb-8 mb-4 mx-auto mt-20">
          <form className="w-full max-w-sm" method="POST" onSubmit={(e) => { e.preventDefault(); registerUser(); }}>
            <div className="font-bold text-center mb-5">
              <h1>Register</h1>
            </div>
            <div className="flex flex-col items-center py-2">
              <input
                className="appearance-none bg-transparent border-b w-full text-gray-700 mb-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Enter Phone number"
                aria-label="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <input
                className="appearance-none bg-transparent border-b w-full text-gray-700 mb-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Name"
                aria-label="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button
                className="flex-shrink-0 bg-[#4286f4] hover:bg-[#24C6DC] border-[#4286f4] hover:border-[#24C6DC] text-sm border-4 text-white py-1 px-2 rounded mt-2"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Submit'}
              </button>
            </div>
          </form>
          {error && <div className="mt-4 text-red-500">{error}</div>}
          <div className="mt-4 text-center">
            <span>Already have an account? <a className="text-red-500 font-bold" onClick={() => setView('requestOTP')}>Login</a></span>
          </div>
        </div>
      )}
    </>
  );
};
