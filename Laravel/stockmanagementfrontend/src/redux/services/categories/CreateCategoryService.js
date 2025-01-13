const { default: axiosClient } = require("@/axios/axiosClient");

const CreateCategoryService = async (data) => {
    return await axiosClient.post("/categories", data);
};

export default CreateCategoryService;
