import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import CreateCategoryAction from '@/redux/actions/categories/CreateCategoryAction';

const CategoryComponent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const { error, categories } = useSelector((state) => state.createCategory);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || description.trim() === '') {
      toast.error('Title and description are required!', { autoClose: 1000 });
      return;
    }

    dispatch(CreateCategoryAction({ title, description }));
    setTitle('');
    setDescription('');
  };


  useEffect(() => {
    if (categories) {
      toast.success('Category created successfully!' , {autoClose: 1000});
    }

    if (error) {
      toast.error(`Error: ${error}` , {autoClose: 1000});
    }
  }, [categories, error]);
  
  
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl mt-20">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Category</h2>

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Enter category title"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Enter category description"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Create Category
        </button>
      </form>
    </div>
  );
};

export default CategoryComponent;
