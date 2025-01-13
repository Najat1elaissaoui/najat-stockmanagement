"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserInfoAction from "@/redux/actions/users/UserInfoAction";
import UpdateUserAction from "@/redux/actions/users/UpdateUserAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "@/protected/protectedRoute";

const Page = ({ params: promisedParams }) => {
  const dispatch = useDispatch();

  const { user, isLoading, error } = useSelector((state) => state.userInfo);
  const { isUpdating, userUpdate, errorUpdate } = useSelector((state) => state.updateUser);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await promisedParams;
      if (resolvedParams && resolvedParams.id) {
        dispatch(UserInfoAction(resolvedParams.id));
      }
    };

    unwrapParams();
  }, [dispatch, promisedParams]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        role: user.role || "",
        status: user.status || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedData = { ...formData };
  
    if (updatedData.password === "") {
      updatedData.password = user.password;
    }
  
    if (updatedData.email === user.email) {
      delete updatedData.email;
    }
  
    dispatch(UpdateUserAction(user.id, updatedData));
  };
  
  useEffect(() => {
    if (error || errorUpdate) {
      const errorMessage = error || errorUpdate;
      toast.error(`${errorMessage}`);
    }

    if (userUpdate) {
      toast.success("User updated successfully!");
    }
  }, [error, errorUpdate, userUpdate]);

  return (
    <ProtectedRoute>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
        <ToastContainer />
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-800 border-b pb-4 mb-6">User Info Page</h1>

          {isLoading && <p className="text-center text-gray-600">Loading...</p>}

          {user && (
            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 w-full">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full py-3 px-4 text-lg rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-lg"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full py-3 px-4 text-lg rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-lg"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="*********"
                      className="mt-1 block w-full py-3 px-4 text-lg rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-lg"
                    />
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                      name="role"
                      id="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="mt-1 block w-full py-3 px-4 text-lg rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-lg"
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                      <option value="supplier">Supplier</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <input
                      type="text"
                      name="status"
                      id="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="mt-1 block w-full py-3 px-4 text-lg rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
