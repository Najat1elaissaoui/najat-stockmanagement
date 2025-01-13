import UpdateSupplierType from "@/redux/types/suppliers/UpdateSupplierType";

const initialState = {
    updateSupplier: null,
    updateError: null,
    isLoading: false,
};

const updateSupplierReducer = (state = initialState, action) => {
    switch (action.type) {
        case UpdateSupplierType.UPDATE_SUPPLIER_REQUEST:
            return { ...state, isLoading: true, updateSupplier: null, updateError: null };
        case UpdateSupplierType.UPDATE_SUPPLIER_SUCCESS:
            return { ...state, isLoading: false, updateSupplier: action.payload, updateError: null };
        case UpdateSupplierType.UPDATE_SUPPLIER_FAIL:
            return { ...state, isLoading: false, updateSupplier: null, updateError: action.payload };
        default:
            return state;
    }
};

export default updateSupplierReducer;
