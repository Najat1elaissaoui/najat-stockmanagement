import axiosClient from "@/axios/axiosClient";

const CreateUserService = async (data) => {
    return await axiosClient.post('/users', data);
};

export default CreateUserService;
