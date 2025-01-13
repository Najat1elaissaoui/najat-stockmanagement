import axiosClient from "@/axios/axiosClient";

const GetSuppliersService = async () => await axiosClient.get("/suppliers");

export default GetSuppliersService;