import GetCategoriesAction from '@/redux/actions/categories/GetCategoriesAction';
import GetProductsAction from '@/redux/actions/products/GetProductsAction';
import { GetUsersAction } from '@/redux/actions/users/GetUsersAction';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const OverviewComponent = () => {
  const dispatch = useDispatch();
  const { isLoading, productsGet } = useSelector(state => state.getProducts);
  const { categories } = useSelector(state => state.getCategories);
  const { users } = useSelector(state => state.getUsers);
  useEffect(() => {
    dispatch(GetProductsAction());
    dispatch(GetCategoriesAction());
    dispatch(GetUsersAction());
  }, [dispatch]);


  const [orders, setOrders] = useState(200);

  useEffect(() => {
    dispatch(GetProductsAction());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setOrders(200); 
    }, 500); 
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Products Overview */}
        <div className="bg-blue-100 shadow-xl rounded-lg p-6 border-t-4 border-blue-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center gap-4">
            <svg className="h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 2a1 1 0 011-1h12a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V2zm2 1v14h12V3H5z" clipRule="evenodd" />
            </svg>
            <div>
              <h2 className="text-xl font-medium text-gray-700">Products</h2>
              <p className="text-3xl font-bold text-gray-900">{isLoading ? 'Loading...' : productsGet.length}</p>
            </div>
          </div>
        </div>

        {/* Categories Overview */}
        <div className="bg-yellow-100 shadow-xl rounded-lg p-6 border-t-4 border-yellow-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center gap-4">
            <svg className="h-12 w-12 text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
            </svg>
            <div>
              <h2 className="text-xl font-medium text-gray-700">Categories</h2>
              <p className="text-3xl font-bold text-gray-900">
                {(categories?.map(category => category.title) || []).length}
              </p>
            </div>
          </div>
        </div>

        {/* Orders Overview */}
        <div className="bg-purple-100 shadow-xl rounded-lg p-6 border-t-4 border-purple-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center gap-4">
            <svg className="h-12 w-12 text-purple-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a6 6 0 100 12 6 6 0 000-12zm0 10a4 4 0 110-8 4 4 0 010 8z" clipRule="evenodd" />
            </svg>
            <div>
              <h2 className="text-xl font-medium text-gray-700">Orders</h2>
              <p className="text-3xl font-bold text-gray-900">{orders}</p>
            </div>
          </div>
        </div>

        {/* Pending Orders Overview */}
        <div className="bg-red-100 shadow-xl rounded-lg p-6 border-t-4 border-red-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center gap-4">
            <svg className="h-12 w-12 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a6 6 0 100 12 6 6 0 000-12zm0 10a4 4 0 110-8 4 4 0 010 8z" clipRule="evenodd" />
            </svg>
            <div>
              <h2 className="text-xl font-medium text-gray-700">Users</h2>
              <p className="text-3xl font-bold text-gray-900">
                {(users.map(user => user.name) || []).length}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OverviewComponent;
