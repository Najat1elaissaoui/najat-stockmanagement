import axiosClient from "@/axios/axiosClient";

const UpdateUserService = async (id, data) => {
    return await axiosClient.put(`/users/${id}`, data);
};

export default UpdateUserService;
