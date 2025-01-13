import DeleteUserService from "@/redux/services/users/DeleteUserService";
import DeleteUserType from "@/redux/types/users/DeleteUserType";

export const deleteUserSuccess = () => ({
    type: DeleteUserType.DELETE_USER_SUCCESS,
});

export const deleteUserFail = (error) => ({
    type: DeleteUserType.DELETE_USER_FAIL,
    payload: error,
});

export const DeleteUserAction = (id) => async (dispatch) => {
    try {
        await DeleteUserService(id);
        dispatch(deleteUserSuccess());
    } catch (error) {
        const errorMsg =
            error.response?.data?.message || "An error occurred. Please try again.";
        dispatch(deleteUserFail(errorMsg));
    }
};