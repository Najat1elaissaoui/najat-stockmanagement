import axiosClient from "../../axios/axiosClient";

export const LoginService = async (email , password) => await axiosClient.post("/auth/login", { email, password });
