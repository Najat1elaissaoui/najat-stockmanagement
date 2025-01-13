import axiosClient from "@/axios/axiosClient";

const GetProductsService = async () => await axiosClient.get("/products");

export default GetProductsService;
