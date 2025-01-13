import GetUsersType from "@/redux/types/users/GetUsersType";

const initialState = {
    isLoading: false,
    users: [],
    error: null,
};

const GetUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetUsersType.LOADING_USERS:
            return {
                ...state,
                isLoading: true,
                users: [],
                error: null,
            };
        case GetUsersType.GET_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: action.payload,
                error: null,
            };
        case GetUsersType.GET_USERS_FAIL:
            return {
                ...state,
                isLoading: false,
                users: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default GetUsersReducer;
