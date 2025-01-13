import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GetProductsAction from '@/redux/actions/products/GetProductsAction';
import UpdateProductAction from '@/redux/actions/products/UpdateProductAction';
import ModalComponent from '@/components/modal/ModalComponent';
import GetCategoriesAction from '@/redux/actions/categories/GetCategoriesAction';
import GetSuppliersAction from '@/redux/actions/suppliers/GetSuppliersAction';

const UpdateProductComponent = () => {
  const dispatch = useDispatch();
  const { isLoading, productsGet, error } = useSelector(state => state.getProducts);
  const { isLoading: updateLoading, updatedProduct, updateError } = useSelector(state => state.updateProduct);
  const { categories } = useSelector(state => state.getCategories);
  const { getSupplier: suppliers } = useSelector(state => state.getSuppliers);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category_id: '',
    supplier_id: '',
    description: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    dispatch(GetProductsAction());
    dispatch(GetCategoriesAction());
    dispatch(GetSuppliersAction());
  }, [dispatch]);

  useEffect(() => {
    if (updatedProduct) {
      toast.success('Product updated successfully!');
      closeModal();
    }

    if (updateError) {
      toast.error(updateError);
    }

  }, [updatedProduct, updateError]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      title: product.title,
      category_id: product.category_id,
      supplier_id: product.supplier_id,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setFormData({
      title: '',
      category_id: '',
      supplier_id: '',
      description: '',
      price: '',
      quantity: '',
    });
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async () => {
    const form = new FormData();
    form.append('title', formData.title);
    form.append('category_id', formData.category_id);
    form.append('supplier_id', formData.supplier_id);
    form.append('description', formData.description);
    form.append('price', formData.price);
    form.append('quantity', formData.quantity);

    await dispatch(UpdateProductAction(selectedProduct.id, form));
    dispatch(GetProductsAction());
    closeModal();
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg mt-20">
      <ToastContainer />
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900">Update Product</h2>
      
      {/* Mobile View */}
      <div className="block lg:hidden">
        {isLoading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          productsGet?.map(product => (
            <div key={product.id} className="p-4 mb-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
              <h3 className="text-lg font-bold text-gray-700 mb-2">{product.title}</h3>
              <p className="text-sm text-gray-600">Price: ${product.price}</p>
              <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
              <button onClick={() => openModal(product)} className="bg-yellow-500 font-bold text-white px-4 py-2 rounded hover:bg-yellow-600 mt-2">Edit</button>
            </div>
          ))
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
              <tr><td colSpan="5" className="p-4 text-center text-gray-600">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan="5" className="p-4 text-center text-red-600">{error}</td></tr>
            ) : (
              productsGet?.map(product => (
                <tr key={product.id} className="border-b border-gray-200">
                  <td className="p-4 text-gray-700">{product.title}</td>
                  <td className="p-4 text-gray-600">{product.category.title}</td>
                  <td className="p-4 text-gray-600">${product.price}</td>
                  <td className="p-4 text-gray-600">{product.quantity}</td>
                  <td className="p-4 text-center">
                    <button onClick={() => openModal(product)} className="bg-yellow-500 font-bold text-white px-4 py-2 rounded hover:bg-yellow-600">Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Editing */}
      <ModalComponent isOpen={isModalOpen} onClose={closeModal} title="Update Product">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-200" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category</label>
          <select name="category_id" value={formData.category_id} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-200">
            <option value="">Select Category</option>
            {categories?.map(category => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Supplier</label>
          <select name="supplier_id" value={formData.supplier_id} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-200">
            <option value="">Select Supplier</option>
            {suppliers?.map(supplier => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-200" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-200" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Quantity</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-200" />
        </div>
        <button onClick={handleUpdateSubmit} disabled={updateLoading} className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 focus:outline-none disabled:bg-gray-400">
          {updateLoading ? 'Updating...' : 'Update Product'}
        </button>
      </ModalComponent>
    </div>
  );
};

export default UpdateProductComponent;
