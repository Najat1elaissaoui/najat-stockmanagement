import GetCategoriesType from "@/redux/types/categories/GetCategoriesType";

const initialState = {
    isLoading: false,
    categories: null,
    error: null,
};


const GetCategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetCategoriesType.GET_CATEGORIES:
            return {
                ...state,
                isLoading: true,
            };
        case GetCategoriesType.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categories: action.payload,
            };
        case GetCategoriesType.GET_CATEGORIES_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default GetCategoriesReducer;