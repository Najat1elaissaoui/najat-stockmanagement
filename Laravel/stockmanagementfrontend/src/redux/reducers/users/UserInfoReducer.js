import UserInfoType from "@/redux/types/users/UserInfoType";

const initialState = {
    isLoading: false,
    user: null,
    error: null,
};

const UserInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case UserInfoType.GET_USER_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                error: null,
            };
        case UserInfoType.GET_USER_INFO_FAIL:
            return {
                ...state,
                isLoading: false,
                user: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default UserInfoReducer;
