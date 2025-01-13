import axiosClient from "@/axios/axiosClient";

const DeleteCategoryService = (id) => axiosClient.delete(`/categories/${id}`);

export default DeleteCategoryService;