import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser, loginUser } from '../redux/slice/authSlice';
import { createUserData } from '../redux/slice/userSlice';
import { auth } from '../Firebase/firebaseConfig'; // Firebase authentication import

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [verificationSent, setVerificationSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [checkingVerification, setCheckingVerification] = useState(false); // New state to track verification check
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, email, password } = formData;
  const user = useSelector((state) => state.auth.user);
  const authLoading = useSelector((state) => state.auth.loading);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(signUpUser({ email, password })).unwrap();

      if (resultAction) {
        alert('Check your email for verification');
        setVerificationSent(true);
      }
    } catch (error) {
      alert('This Email Already Exists');
      navigate('/login', { replace: true });
    }
  };

useEffect(() => {
  if (verificationSent) {
    setCheckingVerification(true); // Start checking for email verification

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Wait for 4 seconds to give Firebase time to update the emailVerified status
        const intervalId = setInterval(async () => {
          await user.reload(); // Reload user data to get updated email verification status
          if (user.emailVerified) {
            setEmailVerified(true);
            setCheckingVerification(false);
            clearInterval(intervalId); // Clear interval when email is verified
          } else {
            console.log('Email not verified yet.');
          }
        }, 4000); // Add a delay before checking email verification status
      }
    });

    return () => unsubscribe(); // Cleanup auth state listener
  }
}, [verificationSent]);


  useEffect(() => {
    const loginAndCreateUserData = async () => {
      if (emailVerified) {
        try {
          const res = await dispatch(loginUser({ email, password })).unwrap();
          if (res) {
            navigate('/');

            const data = {
              uid: res.uid,
              name: formData.name,
              email: formData.email,
              totalItem: 0,
              price: 0,
              role: 'customer',
               userOrder:{
            status: "pending",
            orderedPrice: 0,
            totalItem:0,
        } 
            };

            dispatch(createUserData(data));
          }
        } catch (error) {
          console.error('Error during login or user data creation:', error);
        }
      }
    };

    loginAndCreateUserData();
  }, [emailVerified, setEmailVerified, user, dispatch, email, password, formData, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg md:shadow-black md:shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Create Your Account</h2>
        <form className="space-y-4" onSubmit={createUser}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
            <input
              onChange={handleChange}
              value={formData.name}
              type="text"
              id="name"
              className="mt-2 block w-full p-3 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
              placeholder="Enter your name"
              required
            />
          </div>
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
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
              disabled={authLoading || verificationSent}
            >
              {authLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </div>
        </form>
        {verificationSent && (
          <p className="text-center text-sm text-gray-500">A verification email has been sent. Please verify your email.</p>
        )}
       
        <h3 className="text-center text-sm text-gray-500 flex justify-center items-center gap-2 mt-6">
          Already have an account?{" "}
          <p onClick={() => navigate('/login', { replace: true })} className="text-indigo-600 hover:underline hover:cursor-pointer">
            Sign in
          </p>
        </h3>
      </div>
    </div>
  );
};

export default Signup;
