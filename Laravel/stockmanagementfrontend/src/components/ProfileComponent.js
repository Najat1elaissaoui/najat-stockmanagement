"use client";

import ProtectedRoute from "@/protected/protectedRoute";
import { ProfileAction, UpdateProfileAction } from "@/redux/actions/ProfileAction";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileComponent = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null);

  const dispatch = useDispatch();
  const { profile, error, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(ProfileAction());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
      setPassword("********");

      const imageUrl = Array.isArray(profile.image) ? profile.image[0] : profile.image;
      setProfileImage(imageUrl || null);
    }
  }, [profile]);

  const handleUpdate = () => {
    const updatedData = new FormData();
    updatedData.append("name", name);
    updatedData.append("email", email);
    
    if (password !== "********") {
      updatedData.append("password", password);
    }
    
    if (newProfileImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedData.append("image", reader.result);
        dispatch(UpdateProfileAction(updatedData))
          .then(() => {
            toast.success("Profile updated successfully!", { position: "top-right", autoClose: 5000 });
          })
          .catch(() => {
            toast.error("There was an error updating the profile.", { position: "top-right", autoClose: 5000 });
          });
      };
      reader.readAsDataURL(newProfileImage);
    } else {
      updatedData.append("image", profileImage);
      dispatch(UpdateProfileAction(updatedData))
        .then(() => {
          toast.success("Profile updated successfully!", { position: "top-right", autoClose: 5000 });
        })
        .catch(() => {
          toast.error("There was an error updating the profile.", { position: "top-right", autoClose: 5000 });
        });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedFormats.includes(file.type)) {
        toast.error("Invalid file format. Please upload a JPEG or PNG image.", {
          position: "top-right",
          autoClose: 5000,
        });
        return;
      }
  
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error("File size exceeds 2MB. Please upload a smaller image.", {
          position: "top-right",
          autoClose: 5000,
        });
        return;
      }
  
      setNewProfileImage(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };
  
  return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[600px]">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Profile Information</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {loading && <div className="text-gray-500 text-center mb-4">Loading...</div>}

        {!loading && (
          <div className="flex flex-col items-center mb-6">
            <Image
              width={150}
              height={150}
              src={profileImage || "https://via.placeholder.com/150?text=Profile+Image"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 mb-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-600 mb-4"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mt-6">
          <button
            className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
      <ToastContainer />
      </div>
  );
};

export default ProfileComponent;
