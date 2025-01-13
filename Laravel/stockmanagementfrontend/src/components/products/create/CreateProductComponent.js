import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GetCategoriesAction from '@/redux/actions/categories/GetCategoriesAction';
import CreateProductAction from '@/redux/actions/products/CreateProductAction';
import GetSuppliersAction from '@/redux/actions/suppliers/GetSuppliersAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateProductComponent = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.getCategories);
  const { getSupplier: suppliers } = useSelector((state) => state.getSuppliers);
  const { isLoading, error, product } = useSelector((state) => state.createProduct);

  const [formData, setFormData] = useState({
    title: '',
    category_id: '',
    supplier_id: '',
    description: '',
    price: '',
    quantity: '',
    images: [],
  });

  useEffect(() => {
    dispatch(GetCategoriesAction());
    dispatch(GetSuppliersAction());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];

    const validFiles = selectedFiles.filter((file) => allowedTypes.includes(file.type));

    if (validFiles.length !== selectedFiles.length) {
      toast.error('One or more files are of an invalid type. Please upload images in jpeg, png, jpg, gif, or svg format.');
    }

    setFormData({ ...formData, images: validFiles });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.supplier_id || !formData.quantity || formData.images.length === 0) {
      toast.error("Please fill in all required fields.");
      return;
    }

      dispatch(CreateProductAction(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (product) {
      toast.success("Product created successfully");
    }
  }, [error, product]);

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-4xl mt-20">
      <ToastContainer />
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Create New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label htmlFor="category_id" className="block text-gray-700">Category</label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="supplier_id" className="block text-gray-700">Supplier</label>
          <select
            id="supplier_id"
            name="supplier_id"
            value={formData.supplier_id}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Supplier</option>
            {suppliers?.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="title" className="block text-gray-700">Product Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter product title"
            required
          />
        </div>

        <div>
          <label htmlFor="images" className="block text-gray-700">Product Images</label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter product description"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter product price"
            required
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block text-gray-700">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter product quantity"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full md:w-1/2 py-3 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductComponent;
