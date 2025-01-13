"use client";

import { GetUsersAction } from "@/redux/actions/users/GetUsersAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const GetUsersComponent = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.getUsers);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(GetUsersAction());
  }, [dispatch]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Users List</h1>

      {/* Search Form */}
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table on larger screens */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border-b border-gray-300">Name</th>
              <th className="px-4 py-2 text-left border-b border-gray-300">Email</th>
              <th className="px-4 py-2 text-left border-b border-gray-300">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => {
              return (
                <tr
                  key={user.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-2 border-b border-gray-300">{user.name}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{user.email}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{user.role}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile view (cards) */}
      <div className="sm:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => {
          return (
            <div key={user.id} className="bg-white p-4 border border-gray-300 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">Role: {user.role}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GetUsersComponent;
