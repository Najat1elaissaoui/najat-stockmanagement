
import { ProfileType } from "../types/ProfileType";
import { ProfileService, UpdateProfileService } from "../services/ProfileService";

export const GetProfileSuccess = (data) => ({
    type: ProfileType.GET_PROFILE_SUCCESS,
    payload: data,
});

export const GetProfileFail = (error) => ({
    type: ProfileType.GET_PROFILE_FAIL,
    payload: error,
});

export const UpdateProfileSuccess = (data) => ({
    type: ProfileType.UPDATE_PROFILE_SUCCESS,
    payload: data,
});

export const UpdateProfileFail = (error) => ({
    type: ProfileType.UPDATE_PROFILE_FAIL,
    payload: error,
});

export const ProfileAction = () => {
    return async (dispatch) => {
        dispatch({ type: "LOADING_PROFILE" }); 
        try {
            const response = await ProfileService();
            dispatch(GetProfileSuccess(response.data.data));
        } catch (error) {
            const errorMsg =
                error.response?.data?.message || "An error occurred. Please try again.";
            dispatch(GetProfileFail(errorMsg));
        }
    };
};

export const UpdateProfileAction = (updatedData) => {
    return async (dispatch) => {
        dispatch({ type: "LOADING_PROFILE" });
        try {
            const response = await UpdateProfileService(updatedData);
            dispatch(UpdateProfileSuccess(response.data.data));
        } catch (error) {
            const errorMsg =
                error.response?.data?.message || "Failed to update profile. Please try again.";
            dispatch(UpdateProfileFail(errorMsg));
        }
    };
};