import CreateProductType from "@/redux/types/products/CreateProductType";

const initialState = {
  isLoading: false,
  product: null,
  error: null,
};

const CreateProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case CreateProductType.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product: action.payload,
        error: null,
      };
    case CreateProductType.CREATE_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
        product: null,
        error: action.payload,
      };
    case CreateProductType.SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export default CreateProductReducer;
