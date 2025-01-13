import GetCategoriesAction from '@/redux/actions/categories/GetCategoriesAction';
import UpdateCategoryAction from '@/redux/actions/categories/UpdateCategoryAction';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalComponent from '../modal/ModalComponent';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateCategoryComponent = () => {
  const dispatch = useDispatch();
  const { isLoading, categories, error } = useSelector(state => state.getCategories);
  const { isLoading: updateLoading, updateCategory, updateError } = useSelector(state => state.updateCategory);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });

  useEffect(() => {
    dispatch(GetCategoriesAction());
  }, [dispatch]);

  const openModal = (category) => {
    setSelectedCategory(category);
    setFormData({ title: category.title, description: category.description });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setFormData({ title: '', description: '' });
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async () => {
    await dispatch(UpdateCategoryAction(selectedCategory.id, formData));
    
    dispatch(GetCategoriesAction());
  
    closeModal();
  };

  useEffect(() => {
    if (updateCategory) {
      toast.success('Category updated successfully!');
    }

    if (updateError) {
      toast.error(`Error: ${updateError}`);
    }
  }, [updateCategory, updateError]);
    

  return (
    <>
    <ToastContainer />
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg mt-10">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">Category List</h2>

        {updateError && <p className="text-center text-red-600">{updateError}</p>}
        
        <div className="block lg:hidden">
          {isLoading ? <p className="text-center text-gray-600">Loading...</p> : error ? <p className="text-center text-red-600">{error}</p> : categories?.map((category) => (
            <div key={category.id} className="p-4 mb-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
              <h3 className="text-lg font-bold text-gray-700 mb-2">{category.title.substring(0, 20)}</h3>
              <p className="text-sm text-gray-600 mb-2">{category.description.substring(0, 10)} ...</p>
              <p className="text-sm text-gray-500 mb-4">Created: {new Date(category.created_at).toLocaleDateString()}</p>
              <button onClick={() => openModal(category)} className="bg-yellow-500 font-bold text-white px-4 py-2 rounded hover:bg-yellow-600">Update</button>
            </div>
          ))}
        </div>

        <div className="hidden lg:block">
          <table className="w-full text-left table-auto bg-gray-50 rounded-md shadow-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-4 font-medium text-sm">Title</th>
                <th className="p-4 font-medium text-sm">Description</th>
                <th className="p-4 font-medium text-sm">Created At</th>
                <th className="p-4 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? <tr><td colSpan="4" className="p-4 text-center text-gray-600">Loading...</td></tr> : error ? <tr><td colSpan="4" className="p-4 text-center text-red-600">{error}</td></tr> : categories?.map((category) => (
                <tr key={category.id} className="border-b border-gray-200">
                  <td className="p-4 text-gray-700">{category.title.substring(0, 20)}</td>
                  <td className="p-4 text-gray-600">{category.description.substring(0, 10)} ...</td>
                  <td className="p-4 text-gray-600">{new Date(category.created_at).toLocaleDateString()}</td>
                  <td className="p-4 text-center">
                    <button onClick={() => openModal(category)} className="bg-yellow-500 font-bold text-white px-4 py-2 rounded hover:bg-yellow-600">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ModalComponent isOpen={isModalOpen} onClose={closeModal} title="Update Category">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-200" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-200" />
          </div>
          <div className="flex justify-end">
            <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600">Cancel</button>
            <button onClick={handleUpdateSubmit} disabled={updateLoading} className="bg-yellow-500 font-bold text-white px-4 py-2 rounded hover:bg-yellow-600">{updateLoading ? 'Updating...' : 'Save'}</button>
          </div>
        </ModalComponent>
      </div>
    </>
  );
};

export default UpdateCategoryComponent;
