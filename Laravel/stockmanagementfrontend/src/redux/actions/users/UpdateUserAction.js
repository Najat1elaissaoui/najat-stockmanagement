import UpdateUserService from "@/redux/services/users/UpdateUserService";
import UpdateUserType from "@/redux/types/users/UpdateUserType";

const updateUserSuccess = (data) => {
    return {
        type: UpdateUserType.UPDATE_USER_SUCCESS,
        payload: data,
    };
};

const updateUserFail = (error) => {
    return {
        type: UpdateUserType.UPDATE_USER_FAIL,
        payload: error,
    };
};

export const UpdateUserAction = (id, data) => async (dispatch) => {
    try {
        const response = await UpdateUserService(id, data);
        if (response?.data?.data) {
            dispatch(updateUserSuccess(response.data.data));
        } else {
            throw new Error("Invalid response from server.");
        }
    } catch (error) {
        const errorMsg =
            error.response?.data?.message || "An error occurred. Please try again.";
        dispatch(updateUserFail(errorMsg));
    }
};

export default UpdateUserAction;
