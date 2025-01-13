import axiosClient from "@/axios/axiosClient";

const CreateSupplierService = async (data) => axiosClient.post("/suppliers", data);

export default CreateSupplierService;