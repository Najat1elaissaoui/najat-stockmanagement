import GetUsersService from "@/redux/services/users/GetUsersService";
import GetUsersType from "@/redux/types/users/GetUsersType";

export const successGetUsers = (data) => ({
    type: GetUsersType.GET_USERS_SUCCESS, 
    payload: data,
});

export const failGetUsers = (error) => ({
    type: GetUsersType.GET_USERS_FAIL,    
    payload: error,
});

export const loadingGetUsers = () => ({
    type: GetUsersType.LOADING_USERS,
    payload: null,
});

export const GetUsersAction = (params) => {
    return async (dispatch) => {
        dispatch(loadingGetUsers());

        try {
            const response = await GetUsersService(params);
            dispatch(successGetUsers(response.data.data));
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMsg = error?.response?.data?.message || "An error occurred. Please try again.";
            dispatch(failGetUsers(errorMsg));
            return { success: false, error: errorMsg };
        }
    };
};
