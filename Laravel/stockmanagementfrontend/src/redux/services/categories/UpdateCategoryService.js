import axiosClient from "@/axios/axiosClient";

const UpdateCategoryService = async (id, data) => axiosClient.put(`/categories/${id}`, data);

export default UpdateCategoryService;
