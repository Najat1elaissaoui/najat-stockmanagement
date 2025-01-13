import axiosClient from "@/axios/axiosClient";

export const ProfileService = () => axiosClient.get("/auth/current");

export const UpdateProfileService = (data) => axiosClient.put("/auth/update", data); 
