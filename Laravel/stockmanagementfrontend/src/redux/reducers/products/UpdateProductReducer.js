import UpdateProductType from "@/redux/types/products/UpdateProductType";

const initialState = {
    isUpdating: false,
    updatedProduct: null,
    updateError: null,
};

const UpdateProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case UpdateProductType.UPDATE_PRODUCT_REQUEST:
            return { ...state, isUpdating: true, updatedProduct: null, updateError: null };
        case UpdateProductType.UPDATE_PRODUCT_SUCCESS:
            return { ...state, isUpdating: false, updatedProduct: action.payload, updateError: null };
        case UpdateProductType.UPDATE_PRODUCT_FAIL:
            return { ...state, isUpdating: false, updatedProduct: null, updateError: action.payload };
        default:
            return state;
    }
};

export default UpdateProductReducer;
