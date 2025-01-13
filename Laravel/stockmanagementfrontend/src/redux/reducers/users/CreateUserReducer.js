import CreateUserType from "@/redux/types/users/CreateUserType";

const initialState = {
    isLoading: false,
    user: null,
    error: null,
};

const CreateUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case CreateUserType.CREATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                error: null,
            };
        case CreateUserType.CREATE_USER_FAIL:
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

export default CreateUserReducer;
