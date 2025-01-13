import GetSuppliersType from "@/redux/types/suppliers/GetSuppliersType";

const initialState = {
    isLoading: false,
    getSupplier: [],
    supplierError: null,
};

const GetSuppliersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetSuppliersType.GET_SUPPLIERS_REQUEST:
            return { ...state, isLoading: true, getSupplier: [], supplierError: null };
        case GetSuppliersType.GET_SUPPLIERS_SUCCESS:
            return { ...state, isLoading: false, getSupplier: action.payload, supplierError: null };
        case GetSuppliersType.GET_SUPPLIERS_FAIL:
            return { ...state, isLoading: false, getSupplier: [], supplierError: action.payload };
        default:
            return state;
    }
};

export default GetSuppliersReducer;
