import DeleteProductType from "@/redux/types/products/DeleteProductType";

const initialState = {
    isDeleting: false,
    productDelete: null,
    productError: null,
};

const DeleteProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case DeleteProductType.DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                isDeleting: true,
                productDelete: null,
                productError: null,
            };
        case DeleteProductType.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                isDeleting: false,
                productDelete: action.payload,
                productError: null,
            };
        case DeleteProductType.DELETE_PRODUCT_FAIL:
            return {
                ...state,
                isDeleting: false,
                productDelete: null,
                productError: action.payload,            
            };
        default:
            return state;
    }    
};

export default DeleteProductReducer;