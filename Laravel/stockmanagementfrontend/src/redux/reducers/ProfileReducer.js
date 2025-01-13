import { ProfileType } from "../types/ProfileType";

const initialState = {
    isLoading: false,
    profile: null,
    error: null,
};

const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ProfileType.GET_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                profile: action.payload,
                error: null,
            };
        case ProfileType.GET_PROFILE_FAIL:
            return {
                ...state,
                isLoading: false,
                profile: null,
                error: action.payload,
            };
        case ProfileType.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                profile: action.payload,
                error: null,
            };
        case ProfileType.UPDATE_PROFILE_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default ProfileReducer;