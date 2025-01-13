import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GetProductsAction from '@/redux/actions/products/GetProductsAction';
import Image from 'next/image';

const GetProductsComponent = () => {
  const dispatch = useDispatch();
  const { isLoading, productsGet, productsError } = useSelector((state) => state.getProducts);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    dispatch(GetProductsAction());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <p className="text-xl text-red-500">Error loading products</p>
      </div>
    );
  }

  const openModal = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const goToPreviousImage = () => {
    if (selectedProduct.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex - 1));
    }
  };

  const goToNextImage = () => {
    if (selectedProduct.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1));
    }
  };

  const filteredProducts = (productsGet || [])
    .filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((product) => selectedCategory ? product.category.title === selectedCategory : true)
    .filter((product) => {
      const createdAt = new Date(product.created_at);
      const isAfterStartDate = startDate ? createdAt >= new Date(startDate) : true;
      const isBeforeEndDate = endDate ? createdAt <= new Date(endDate) : true;
      return isAfterStartDate && isBeforeEndDate;
  });

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg mt-16">

      {/* Search Form */}
      <div className="mb-6 flex flex-col items-center md:flex-row justify-between gap-6">
        <div className="w-full md:w-1/3">
          <label htmlFor="search" className="block text-gray-700 font-semibold mb-2">Search by Title</label>
          <input
            type="text"
            id="search"
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex md:flex-row flex-col sm:flex-row gap-6">
          {/* Category Filter */}
          <div className="flex md:flex-row flex-col gap-4 items-center w-full sm:w-auto">
            <select
              id="category"
              className="px-4 py-1 border border-gray-300 rounded-lg"
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
            >
              <option value="">All Categories</option>
              {[...new Set(productsGet.map((product) => product.category.title))].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
              className="px-4 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 mt-2 sm:mt-0"
              onClick={() => setSelectedCategory('')}
            >
              Reset Filter
            </button>
          </div>

          {/* Date Range Filter */}
          <div className="flex flex-col sm:flex-row gap-6">
            <label htmlFor="start-date" className="block text-gray-700 font-semibold mb-2 text-center sm:text-left md:hidden block">
              Date Range:
            </label>
            
            <input
              type="date"
              id="start-date"
              className="px-4 py-1 border border-gray-300 rounded-lg"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              id="end-date"
              className="px-4 py-1 border border-gray-300 rounded-lg"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">Product List</h2>
        <table className="w-full text-left table-auto bg-gray-50 rounded-md shadow-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-4 font-medium text-sm">Product</th>
              <th className="p-4 font-medium text-sm">Category</th>
              <th className="p-4 font-medium text-sm">Price</th>
              <th className="p-4 font-medium text-sm">Quantity</th>
              <th className="p-4 font-medium text-sm">Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td
                  className="p-4 text-gray-700 cursor-pointer"
                  onClick={() => openModal(product)}
                >
                  {product.title}
                </td>
                <td className="p-4 text-gray-600">{product.category.title}</td>
                <td className="p-4 text-gray-600">${product.price}</td>
                <td className="p-4 text-gray-600">{product.quantity}</td>
                <td className="p-4 text-gray-600">${(product.price * product.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="block lg:hidden">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">Products</h2>
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-xl shadow-md max-w-sm mx-auto mb-6">
            <h3 className="font-semibold text-xl text-gray-800">{product.title}</h3>
            <p className="text-gray-600 mt-2">Price: <span className="font-semibold text-green-600">${product.price}</span></p>
            <p className="text-gray-600">Quantity: <span className="font-semibold text-gray-800">{product.quantity}</span></p>
            <button
              className="text-gray-600 hover:underline mt-4 block"
              onClick={() => openModal(product)}
            >
              View Images
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Viewing Images */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="relative p-8 rounded-lg max-w-4xl w-full h-full max-h-full overflow-hidden bg-transparent shadow-xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-400 transition duration-300"
            >
              ✕
            </button>
            <div className="flex justify-center items-center h-full space-x-4">
              <button
                onClick={goToPreviousImage}
                className="text-white bg-black p-4 rounded-full shadow-lg hover:bg-gray-800 transition duration-300"
              >
                ←
              </button>
              <div className="relative w-full h-full flex justify-center">
                <Image
                  src={selectedProduct.images[currentImageIndex]}
                  alt={`Product Image ${currentImageIndex + 1}`}
                  width={800}
                  height={800}
                  className="max-w-full max-h-full object-contain rounded-md"
                />
              </div>
              <button
                onClick={goToNextImage}
                className="text-white bg-black p-4 rounded-full shadow-lg hover:bg-gray-800 transition duration-300"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Total Calculation */}
      <div className="flex justify-between items-center mt-6 bg-gray-100 p-4 rounded-lg">
        <p className="text-lg text-gray-800 font-semibold">Total:</p>
        <p className="text-xl text-gray-900 font-bold">
          ${filteredProducts.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default GetProductsComponent;
