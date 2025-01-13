import axiosClient from "@/axios/axiosClient";

const DeleteSupplierService = async (id) => axiosClient.delete(`/suppliers/${id}`)

export default DeleteSupplierService;