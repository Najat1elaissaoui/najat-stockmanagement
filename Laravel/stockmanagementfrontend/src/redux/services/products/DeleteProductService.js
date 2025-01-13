import axiosClient from "@/axios/axiosClient";

const DeleteProductService = (id) => axiosClient.delete(`/products/${id}`);

export default DeleteProductService