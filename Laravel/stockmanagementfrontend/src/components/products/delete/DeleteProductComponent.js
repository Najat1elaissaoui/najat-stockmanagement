import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GetProductsAction from "@/redux/actions/products/GetProductsAction";
import DeleteProductAction from "@/redux/actions/products/DeleteProductAction";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteProductComponent = () => {
  const dispatch = useDispatch();
  const { isLoading, productsGet, error } = useSelector((state) => state.getProducts);

  useEffect(() => {
    dispatch(GetProductsAction());
  }, [dispatch]);

  const handleDeleteProduct = async (productId) => {
    await dispatch(DeleteProductAction(productId));
    toast.success("Product deleted successfully.", { autoClose: 1000 });
    dispatch(GetProductsAction());
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg mt-20">
      <ToastContainer />
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900">Delete Product</h2>

      {/* Mobile View */}
      <div className="block lg:hidden">
        {isLoading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : productsGet?.length ? (
          productsGet.map((product) => (
            <div key={product.id} className="p-4 mb-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
              <h3 className="text-lg font-bold text-gray-700 mb-2">{product.title}</h3>
              <p className="text-sm text-gray-600">Price: ${product.price}</p>
              <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="bg-red-500 font-bold text-white px-4 py-2 rounded hover:bg-red-600 mt-2"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No products available.</p>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <table className="w-full text-left table-auto bg-gray-50 rounded-md shadow-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-4 font-medium text-sm">Product</th>
              <th className="p-4 font-medium text-sm">Category</th>
              <th className="p-4 font-medium text-sm">Price</th>
              <th className="p-4 font-medium text-sm">Quantity</th>
              <th className="p-4 font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-600">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-red-600">{error}</td>
              </tr>
            ) : productsGet?.length ? (
              productsGet.map((product) => (
                <tr key={product.id} className="border-b border-gray-200">
                  <td className="p-4 text-gray-700">{product.title}</td>
                  <td className="p-4 text-gray-600">{product.category?.title || "N/A"}</td>
                  <td className="p-4 text-gray-600">${product.price}</td>
                  <td className="p-4 text-gray-600">{product.quantity}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-500 font-bold text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-600">No products available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeleteProductComponent;
