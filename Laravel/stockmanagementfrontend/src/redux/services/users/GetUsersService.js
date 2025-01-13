import axiosClient from "@/axios/axiosClient";

const GetUsersService = (data) => axiosClient.get("/users", data );

export default GetUsersService;