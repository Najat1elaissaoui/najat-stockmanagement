"use client";

import { CreateUserAction } from "@/redux/actions/users/CreateUserAction";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateUserComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
    role: "",
    is_active: false,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
  
    if (name === "image" && files) {
      const file = files[0];
  
      const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedFormats.includes(file.type)) {
        toast.error("Invalid image format. Only JPEG, PNG, and GIF are allowed.", {
          position: "top-right",
        });
        return;
      }
  
      const maxSizeInBytes = 2 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        toast.error("Image size exceeds 2MB. Please upload a smaller image.", {
          position: "top-right",
        });
        return;
      }
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
        setImagePreview(URL.createObjectURL(file));
      };
  
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(CreateUserAction(formData));
      if (result.success) {
        toast.success("User created successfully!", { position: "top-right" });
        setFormData({
          name: "",
          email: "",
          image: "",
          password: "",
          role: "",
          is_active: false,
        });
        setImagePreview(null);
      } else {
        throw new Error(result.error || "Failed to create user.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred.", { position: "top-right" });
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center mt-20">
      <ToastContainer />
      <div className="bg-gray-100 p-8 rounded-xl md:shadow-lg shadow-none w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
          Create User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image */}
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex justify-center items-center">
              {imagePreview ? (
                <Image
                  width={100}
                  height={100}
                  src={imagePreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">No Image</span>
              )}
            </div>
          </div>

          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-lg font-medium text-gray-600">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-lg font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          {/* Role Dropdown */}
          <div className="mb-4">
            <label htmlFor="role" className="block text-lg font-medium text-gray-600">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="supplier">Supplier</option>
            </select>
          </div>

          {/* Is Active Checkbox */}
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-gray-500"
              />
              <span className="ml-2 text-lg text-gray-600">Is Active</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-gray-600 text-white p-3 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserComponent;
