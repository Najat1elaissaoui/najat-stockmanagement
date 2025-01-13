import axiosClient from "@/axios/axiosClient";

const UpdateSupplierService = async (id, data) => {
    return await axiosClient.put(`/suppliers/${id}`, data);
};

export default UpdateSupplierService;
