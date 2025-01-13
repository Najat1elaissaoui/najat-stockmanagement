import CreateCategoryType from "@/redux/types/categories/CreateCategoryType";

const initialState = {
    isLoading: false,
    categories: null,
    error: null,
};

const CreateCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CreateCategoryType.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case CreateCategoryType.CATEGORIES_CREATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categories: action.payload,
                error: null,
            };
        case CreateCategoryType.CATEGORIES_CREATE_FAILURE:
            return {
                ...state,
                isLoading: false,
                categories: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default CreateCategoryReducer;
