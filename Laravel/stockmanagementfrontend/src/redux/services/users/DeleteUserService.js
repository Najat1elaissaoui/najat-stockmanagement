import axiosClient from "@/axios/axiosClient";

const DeleteUserService = async (id) => await axiosClient.delete(`/users/${id}`);

export default DeleteUserService;