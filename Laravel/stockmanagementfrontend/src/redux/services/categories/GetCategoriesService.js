import axiosClient from "@/axios/axiosClient";

const GetCategoriesService = () => axiosClient.get("/categories");

export default GetCategoriesService;