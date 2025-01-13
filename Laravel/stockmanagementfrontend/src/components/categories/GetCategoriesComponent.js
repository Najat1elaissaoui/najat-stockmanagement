import GetCategoriesAction from '@/redux/actions/categories/GetCategoriesAction';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const GetCategoriesComponent = () => {
  const dispatch = useDispatch();
  const { isLoading, categories = [], error } = useSelector((state) => state.getCategories);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(GetCategoriesAction());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategories = (categories || []).filter((category) => 
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg mt-20">
      <div className="mb-6">
        {/* Search Form */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search categories..."
          className="p-3 w-full md:w-1/2 mx-auto border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="hidden lg:block">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900">Category List</h2>
        <table className="w-full text-left table-auto bg-gray-50 rounded-md shadow-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-4 font-medium text-sm">Title</th>
              <th className="p-4 font-medium text-sm">Description</th>
              <th className="p-4 font-medium text-sm">Created At</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-600">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-red-600">{error}</td>
              </tr>
            ) : filteredCategories.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-600">No categories found.</td>
              </tr>
            ) : (
              filteredCategories.map((category) => (
                <tr key={category.id} className="border-b border-gray-200">
                  <td className="p-4 text-gray-700">{category.title.substring(0, 20)} ...</td>
                  <td className="p-4 text-gray-600">{category.description.substring(0, 10)} ...</td>
                  <td className="p-4 text-gray-600">{new Date(category.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="block lg:hidden">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900">Categories</h2>
        <div className="bg-white p-6 rounded-xl shadow-md max-w-sm mx-auto">
          {/* Render categories data dynamically */}
          {isLoading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center text-gray-600">No categories found.</div>
          ) : (
            filteredCategories.map((category) => (
              <div key={category.id} className="mb-6 border-b pb-6">
                <h3 className="font-semibold text-xl text-gray-800 text-center">{category.title.substring(0, 20)}</h3>
                <p className="text-gray-600 mt-2">
                  <span className="font-semibold text-gray-800 text-center">{category.description.substring(0, 10)} ...</span>
                </p>
                <p className="text-gray-600 mt-2">
                  <span className="font-semibold text-green-600 text-center">{new Date(category.created_at).toLocaleDateString()}</span>
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GetCategoriesComponent;
