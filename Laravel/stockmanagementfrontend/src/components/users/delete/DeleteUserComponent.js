import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUsersAction } from "@/redux/actions/users/GetUsersAction";
import { DeleteUserAction } from "@/redux/actions/users/DeleteUserAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteUserComponent = () => {
  const [isClient, setIsClient] = useState(false); 
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.getUsers);
  const { isDeleting, userDelete, errorDelete } = useSelector((state) => state.deleteUser);

  const handleDeleteUser = async (id) => {
    await dispatch(DeleteUserAction(id));
    dispatch(GetUsersAction());
  };

  useEffect(() => {
    setIsClient(true);
    dispatch(GetUsersAction());
  }, [dispatch]);

  useEffect(() => {
    if (userDelete) {
      toast.success(userDelete.message, { autoClose: 1000 });
      dispatch(GetUsersAction());
    } else if (errorDelete) {
      toast.error(errorDelete, { autoClose: 1000 });
    }
  }, [userDelete, errorDelete, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <ToastContainer />
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">User Delete</h1>

        {/* Table for larger screens */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left border-b border-gray-300">Name</th>
                <th className="px-4 py-2 text-left border-b border-gray-300">Email</th>
                <th className="px-4 py-2 text-left border-b border-gray-300">Role</th>
                <th className="px-4 py-2 text-center border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-2 border-b border-gray-300">{user.name}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{user.email}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{user.role}</td>
                  <td className="px-4 py-2 border-b border-gray-300 text-center">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md mr-2 hover:bg-red-600"
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile view (cards) */}
        <div className="sm:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 border border-gray-300 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">Role: {user.role}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeleteUserComponent;
