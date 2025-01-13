import axiosClient from "@/axios/axiosClient";

export const LogoutService = async () => await axiosClient.post("/auth/logout");
