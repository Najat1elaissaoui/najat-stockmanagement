import  DeleteCategoryType  from "@/redux/types/categories/DeleteCategoryType";

const initialState = {
    isLoading: false,
    deleteCategory: null,
    deleteError: null,
};


const deleteCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case DeleteCategoryType.DELETE_CATEGORY_REQUEST:
            return { ...state, isLoading: true, deleteCategory: null, deleteError: null };
        case DeleteCategoryType.DELETE_CATEGORY_SUCCESS:
            return { ...state, isLoading: false, deleteCategory: action.payload, deleteError: null };
        case DeleteCategoryType.DELETE_CATEGORY_FAIL:
            return { ...state, isLoading: false, deleteCategory: null, deleteError: action.payload };
        default:
            return state;
    }
};

export default deleteCategoryReducer;