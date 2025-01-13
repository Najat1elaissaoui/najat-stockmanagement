import axiosClient from "@/axios/axiosClient";

const UserInfoService = async (id) => {
    return await axiosClient.get(`/users/${id}`);
};

export default UserInfoService;
