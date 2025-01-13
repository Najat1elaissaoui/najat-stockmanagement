import GetProductsType from "@/redux/types/products/GetProductsType";

const initialState = {
    isLoading: false,
    productsGet: [],
    productsError: null,
};

const GetProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetProductsType.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                productsGet: action.payload,
                productsError: null,
            };
        case GetProductsType.GET_PRODUCTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                productsGet: [],
                productsError: action.payload,
            };
        case GetProductsType.SET_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };
        default:
            return state;
    }
};

export default GetProductsReducer;
