
import ProtectedRoute from '@/protected/protectedRoute';
import { LoginAction } from '@/redux/actions/LoginAction';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        window.location.href = "/dashboard";
      } 
    }, []);

  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginAction(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success('Login Successful');
    }
  }, [error, success]);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen items-center justify-center bg-light-gray">
        <ToastContainer />
        <div className="w-full sm:w-1/2 p-6 bg-white rounded-lg md:px-[10%] px-5">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-4 flex justify-between items-center">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <Link href="/supplier/login" className="text-sm text-gray-600 hover:underline">Login As Supplier</Link>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-300 text-gray-800 py-3 rounded-md hover:bg-gray-400 focus:outline-none font-bold hover:rotate-2 duration-300"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Right side: Image */}
        <div className="hidden sm:block sm:w-1/2 bg-gray-100">
          <Image
            src="https://healthywork.es/wp-content/uploads/2023/03/teambuilding-4-836x836.jpg"
            alt="Login Image"
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default LoginComponent;
