import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteSupplierAction from "@/redux/actions/suppliers/DeleteSupplierAction";
import GetSuppliersAction from "@/redux/actions/suppliers/GetSuppliersAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteSupplierComponent = () => {
  const dispatch = useDispatch();

  const { supplierError, supplierDelete, isDeleting } = useSelector((state) => state.deleteSupplier);

  const { getSupplier } = useSelector((state) => state.getSuppliers);

  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const handleDeleteSubmit = async (supplier) => {
    if (isDeleting) return;

    setSelectedSupplier(supplier);

    try {
      await dispatch(DeleteSupplierAction(supplier.id));
      dispatch(GetSuppliersAction());
    } catch (error) {
      toast.error(`Error: ${error.message}`, { autoClose: 1000 });
    } finally {
      setSelectedSupplier(null); 
    }
  };

  useEffect(() => {
    dispatch(GetSuppliersAction());
  }, [dispatch]);

  const handleDeleteSuccess = () => {
    if (supplierDelete) {
      toast.success("Supplier deleted successfully.", { autoClose: 1000 });
    }
  };

  const handleDeleteError = () => {
    if (supplierError) {
      toast.error(supplierError, { autoClose: 1000 });
    }
  };

  useEffect(() => {
    handleDeleteError();
    handleDeleteSuccess();
  }, [supplierError, supplierDelete]);

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg mt-10">
      <ToastContainer />
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">Supplier List</h2>

      {/* Mobile View */}
      <div className="block lg:hidden">
        {(getSupplier || []).map((supplier) => (
          <div key={supplier.id} className="p-4 mb-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
            <h3 className="text-lg font-bold text-gray-700 mb-2">{supplier.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{supplier.email}</p>
            <p className="text-sm text-gray-600 mb-2">Phone: {supplier.phone}</p>
            <p className="text-sm text-gray-500 mb-4">Address: {supplier.address}</p>
            <button
              onClick={() => handleDeleteSubmit(supplier)}
              className="bg-red-500 font-bold text-white px-4 py-2 rounded hover:bg-red-600"
              disabled={isDeleting && selectedSupplier?.id === supplier.id}
            >
              {isDeleting && selectedSupplier?.id === supplier.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <table className="w-full text-left table-auto bg-gray-50 rounded-md shadow-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-4 font-medium text-sm">Name</th>
              <th className="p-4 font-medium text-sm">Email</th>
              <th className="p-4 font-medium text-sm">Phone</th>
              <th className="p-4 font-medium text-sm">Address</th>
              <th className="p-4 font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(getSupplier || []).map((supplier) => (
              <tr key={supplier.id} className="border-b border-gray-200">
                <td className="p-4 text-gray-700">{supplier.name}</td>
                <td className="p-4 text-gray-600">{supplier.email}</td>
                <td className="p-4 text-gray-600">{supplier.phone}</td>
                <td className="p-4 text-gray-600">{supplier.address}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleDeleteSubmit(supplier)}
                    className="bg-red-500 font-bold text-white px-4 py-2 rounded hover:bg-red-600"
                    disabled={isDeleting && selectedSupplier?.id === supplier.id}
                  >
                    {isDeleting && selectedSupplier?.id === supplier.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeleteSupplierComponent;
