import CreateSupplierType from "@/redux/types/suppliers/CreateSupplierType";

const initialState = {
    isLoading: false,
    createSupplier: null,
    supplierError: null,
};

const CreateSupplierReducer = (state = initialState, action) => {
    switch (action.type) {
        case CreateSupplierType.CREATE_SUPPLIER_REQUEST:
            return { ...state, isLoading: true, createSupplier: null, supplierError: null };
        case CreateSupplierType.CREATE_SUPPLIER_SUCCESS:
            return { ...state, isLoading: false, createSupplier: action.payload, supplierError: null };
        case CreateSupplierType.CREATE_SUPPLIER_FAIL:
            return { ...state, isLoading: false, createSupplier: null, supplierError: action.payload };
        default:
            return state;
    }
};

export default CreateSupplierReducer;
