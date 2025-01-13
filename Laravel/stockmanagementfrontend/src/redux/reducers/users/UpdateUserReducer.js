import UpdateUserType from "@/redux/types/users/UpdateUserType";

const initialState = {
    isUpdating: false,
    userUpdate: null,  
    errorUpdate: null, 
};

const UpdateUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case UpdateUserType.UPDATE_USER_SUCCESS:
            return {
                ...state,
                isUpdating: false,
                userUpdate: action.payload,  
                errorUpdate: null, 
            };
        case UpdateUserType.UPDATE_USER_FAIL:
            return {
                ...state,
                isUpdating: false,
                userUpdate: null,  
                errorUpdate: action.payload, 
            };
        default:
            return state;
    }
};

export default UpdateUserReducer;
