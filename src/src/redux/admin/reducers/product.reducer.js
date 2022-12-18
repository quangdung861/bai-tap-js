import { createReducer } from "@reduxjs/toolkit";
import { FAIL, REQUEST, SUCCESS, PRODUCT_ADMIN_ACTION } from "../constants";

const initialState = {
  productList: {
    data: [],
    meta: {},
    loading: false,
    errors: null,
  },
  productDetail: {
    data: {},
    loading: false,
    errors: null,
  },
  createProduct: {
    loading: false,
    errors: null,
  },
  deleteProductData: {
    loading: false,
    errors: null,
  },
  updateProduct: {
    loading: false,
    errors: null,
  },
};

const productAdminReducer = createReducer(initialState, {
  [REQUEST(PRODUCT_ADMIN_ACTION.CREATE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      createProduct: {
        ...state.createProduct,
        loading: true,
      },
    };
  },

  [SUCCESS(PRODUCT_ADMIN_ACTION.CREATE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      createProduct: {
        ...state.createProduct,
        loading: false,
      },
    };
  },

  [FAIL(PRODUCT_ADMIN_ACTION.CREATE_PRODUCT)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      createProduct: {
        ...state.createProduct,
        loading: false,
        errors,
      },
    };
  },

  // GET PRODUCT_LIST

  [REQUEST(PRODUCT_ADMIN_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    return {
      ...state,
      productList: {
        ...state.productList,
        loading: true,
        errors: null,
      },
    };
  },

  [SUCCESS(PRODUCT_ADMIN_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { data, meta } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        loading: false,
        errors: null,
        data,
        meta,
      },
    };
  },

  [FAIL(PRODUCT_ADMIN_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        loading: false,
        errors,
      },
    };
  },

  // GET PRODUCT_DETAIL

  [REQUEST(PRODUCT_ADMIN_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        loading: true,
        errors: null,
      },
    };
  },

  [SUCCESS(PRODUCT_ADMIN_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        data,
        loading: false,
        errors: null,
      },
    };
  },

  [FAIL(PRODUCT_ADMIN_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        loading: false,
        errors,
      },
    };
  },

  // DELETE_PRODUCT

  [REQUEST(PRODUCT_ADMIN_ACTION.DELETE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      deleteProductData: {
        ...state.deleteProductData,
        loading: true,
      },
    };
  },

  [SUCCESS(PRODUCT_ADMIN_ACTION.DELETE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      deleteProductData: {
        ...state.deleteProductData,
        loading: false,
      },
    };
  },

  [FAIL(PRODUCT_ADMIN_ACTION.DELETE_PRODUCT)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      deleteProductData: {
        ...state.deleteProductData,
        loading: false,
        errors,
      },
    };
  },

  // UPDATE_PRODUCT
  [REQUEST(PRODUCT_ADMIN_ACTION.UPDATE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      updateProduct: {
        ...state.updateProduct,
        loading: true,
        errors: null,
      },
    };
  },

  [SUCCESS(PRODUCT_ADMIN_ACTION.UPDATE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      updateProduct: {
        ...state.updateProduct,
        loading: false,
        errors: null,
      },
    };
  },

  [FAIL(PRODUCT_ADMIN_ACTION.UPDATE_PRODUCT)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      updateProduct: {
        ...state.updateProduct,
        loading: false,
        errors,
      },
    };
  },

  // CLEAR_PRODUCT_DETAIL
  [REQUEST(PRODUCT_ADMIN_ACTION.CLEAR_PRODUCT_DETAIL)]: (state, action) => {
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        data: {},
        loading: false,
      },
    };
  },
});

export default productAdminReducer;
