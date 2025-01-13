import DeleteSupplierType from "@/redux/types/suppliers/DeleteSupplierType";

const initialState = {
    isDeleting: false,
    supplierDelete: null,
    supplierError: null,
};

const DeleteSupplierReducer = (state = initialState, action) => {
    switch (action.type) {
        case DeleteSupplierType.DELETE_SUPPLIER_REQUEST:
            return {
                ...state,
                isDeleting: true,
                supplierDelete: null,
                supplierError: null,
            };
        case DeleteSupplierType.DELETE_SUPPLIER_SUCCESS:
            return {
                ...state,
                isDeleting: false,
                supplierDelete: action.payload,
                supplierError: null,
            };
        case DeleteSupplierType.DELETE_SUPPLIER_FAIL:
            return {
                ...state,
                isDeleting: false,
                supplierDelete: null,
                supplierError: action.payload,
            };
        default:
            return state;
    }
};

export default DeleteSupplierReducer;
