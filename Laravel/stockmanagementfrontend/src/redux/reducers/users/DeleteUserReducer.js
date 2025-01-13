import DeleteUserType from "@/redux/types/users/DeleteUserType";

const initialState = {
    isDeleting: false,
    userDelete: null,
    errorDelete: null,
};

const DeleteUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case DeleteUserType.DELETE_USER_SUCCESS:
            return {
                ...state,
                isDeleting: false,
                userDelete: action.payload,
                errorDelete: null,
            };
        case DeleteUserType.DELETE_USER_FAIL:
            return {
                ...state,
                isDeleting: false,
                userDelete: null,
                errorDelete: action.payload,
            };
        default:
            return state;
    }
};

export default DeleteUserReducer;