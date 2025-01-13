import GetCategoriesAction from '@/redux/actions/categories/GetCategoriesAction';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TableComponent = () => {
  const dispatch = useDispatch();
  const { isLoading, productsGet, productsError } = useSelector((state) => state.getProducts);

  useEffect(() => {
    // Dispatch the action to fetch categories
    dispatch(GetCategoriesAction());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:hidden block">
        {/* Mobile view: Cards */}
        {productsGet.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
          >
            {product.images?.[0] ? (
              <Image
                width={150}
                height={150}
                src={product.images[0]}
                alt={product.title}
                className="w-32 h-32 object-cover rounded-lg"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-200 rounded-lg"></div>
            )}
            <h3 className="mt-4 text-lg font-semibold">{product.title}</h3>
            {/* Handle missing or undefined category */}
            <p className="text-sm text-gray-600">{product.category?.title || 'No Category'}</p>
            <p className="mt-2 text-xl font-bold">${product.price}</p>
          </div>
        ))}
      </div>

      {/* Desktop/table view: Table */}
      <div className="hidden md:block">
        <table className="min-w-full bg-white table-auto rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Image</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Category</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Price</th>
            </tr>
          </thead>
          <tbody>
            {productsGet.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  {product.images?.[0] ? (
                    <Image
                      width={50}
                      height={50}
                      src={product.images[0]}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                  )}
                </td>
                <td className="px-4 py-2">{product.title}</td>
                {/* Handle missing or undefined category */}
                <td className="px-4 py-2">{product.category?.title || 'No Category'}</td>
                <td className="px-4 py-2">${product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
