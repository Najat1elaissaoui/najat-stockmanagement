import axiosClient from "@/axios/axiosClient";

const CreateProductService = (formData) => {
  return axiosClient.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default CreateProductService;
