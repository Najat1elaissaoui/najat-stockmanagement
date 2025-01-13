import UpdateCategoryType from "@/redux/types/categories/UpdateCategoryType";

const initialState = {
  updateCategory: null,
  updateError: null,
  isLoading: false,
};

const updateCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case UpdateCategoryType.UPDATE_CATEGORY_REQUEST:
      return { ...state, isLoading: true, updateCategory: null, updateError: null };
    case UpdateCategoryType.UPDATE_CATEGORY_SUCCESS:
      return { ...state, isLoading: false, updateCategory: action.payload, updateError: null };
    case UpdateCategoryType.UPDATE_CATEGORY_FAIL:
      return { ...state, isLoading: false, updateCategory: null, updateError: action.payload };
    default:
      return state;
  }
};

export default updateCategoryReducer;
