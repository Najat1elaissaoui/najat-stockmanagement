import CreateUserService from "@/redux/services/users/CreateUserService";
import CreateUserType from "@/redux/types/users/CreateUserType";

export const successCreateUser = (data) => {
    return {
        type: CreateUserType.CREATE_USER_SUCCESS,
        payload: data,
    };
};

export const failCreateUser = (error) => {
    return {
        type: CreateUserType.CREATE_USER_FAIL,
        payload: error,
    };
};

export const CreateUserAction = (data) => {
    return async (dispatch) => {
        try {
            const response = await CreateUserService(data);
            dispatch(successCreateUser(response.data.data));
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMsg =
                error?.response?.data?.message || "An error occurred. Please try again.";
            dispatch(failCreateUser(errorMsg));
            return { success: false, error: errorMsg };
        }
    };
};
