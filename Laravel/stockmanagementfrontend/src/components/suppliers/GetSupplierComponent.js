import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GetSuppliersAction from '@/redux/actions/suppliers/GetSuppliersAction';

const GetSupplierComponent = () => {
  const dispatch = useDispatch();
  const { isLoading, getSupplier, supplierError } = useSelector((state) => state.getSuppliers);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(GetSuppliersAction());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSuppliers = getSupplier?.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg mt-20">
      <div className="mb-6">
        {/* Search Form */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search suppliers by name..."
          className="p-3 w-full md:w-1/2 mx-auto border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="hidden lg:block">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900">Supplier List</h2>
        <table className="w-full text-left table-auto bg-gray-50 rounded-md shadow-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-4 font-medium text-sm">Name</th>
              <th className="p-4 font-medium text-sm">Email</th>
              <th className="p-4 font-medium text-sm">Phone</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-600">Loading...</td>
              </tr>
            ) : supplierError ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-red-600">{supplierError}</td>
              </tr>
            ) : filteredSuppliers?.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-600">No suppliers found.</td>
              </tr>
            ) : (
              filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="border-b border-gray-200">
                  <td className="p-4 text-gray-700">{supplier.name}</td>
                  <td className="p-4 text-gray-600">{supplier.email}</td>
                  <td className="p-4 text-gray-600">{supplier.phone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="block lg:hidden">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900">Suppliers</h2>
        <div className="bg-white p-6 rounded-xl shadow-md max-w-sm mx-auto">
          {/* Render suppliers data dynamically */}
          {isLoading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : supplierError ? (
            <div className="text-center text-red-600">{supplierError}</div>
          ) : filteredSuppliers?.length === 0 ? (
            <div className="text-center text-gray-600">No suppliers found.</div>
          ) : (
            filteredSuppliers.map((supplier) => (
              <div key={supplier.id} className="mb-6 border-b pb-6">
                <p className="font-semibold text-xl text-gray-800 text-center">{supplier.name}</p>
                <p className="text-gray-600 mt-2">{supplier.email}</p>
                <p className="text-gray-600 mt-2">{supplier.phone}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GetSupplierComponent;
