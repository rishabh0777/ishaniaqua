import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slice/authSlice';
import { useSelector } from 'react-redux';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.auth);
  const authLoading = useSelector((state) => state.auth.loading);


  // Unified change handler
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const login = (e) => {
    e.preventDefault();
    const { email, password } = formData;  // Destructure formData
    const userData = { email, password };

    // Dispatch login action
    dispatch(loginUser(userData));

    // Only store non-circular data in localStorage
    localStorage.setItem('email', email);
    // Optionally store the token if available
    // localStorage.setItem('token', user.token);
  };

  // Navigate after login success
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    } else if (error) {
      console.error(error);
    }
  }, [user, error, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg md:shadow-black md:shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Login to Your Account</h2>
        <form className="space-y-4" onSubmit={login}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              onChange={handleChange}
              value={formData.email}
              type="email"
              id="email"
              className="mt-2 block w-full p-3 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              onChange={handleChange}
              value={formData.password}
              type="password"
              id="password"
              className="mt-2 block w-full p-3 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <button
              type="button"
              className="flex items-center justify-center w-full py-3 bg-gray-700 text-white rounded-md hover:bg-gray-500 transition duration-300"
            >
              <i className="ri-google-fill mr-2"></i> Log in with Google
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700  transition duration-300"
            >
              { authLoading?'Logging in':'Login' }
            </button>
          </div>
        </form>
        <h3 className="text-center text-sm text-gray-500 flex justify-center items-center gap-2">
          Don't have an account?{' '}
          <p
            onClick={() => navigate('/signup', { replace: true })}
            className="text-indigo-600 hover:underline hover:cursor-pointer"
          >
            Create one
          </p>
        </h3>
      </div>
    </div>
  );
};

export default Login;
