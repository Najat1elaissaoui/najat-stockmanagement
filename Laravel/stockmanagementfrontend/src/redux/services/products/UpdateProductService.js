import axiosClient from "@/axios/axiosClient";

const UpdateProductService = async (id, data) => {
    try {
        const response = await axiosClient.put(`/products/${id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

export default UpdateProductService;
