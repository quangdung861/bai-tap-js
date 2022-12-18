import { createReducer } from "@reduxjs/toolkit";
import { FAIL, REQUEST, SUCCESS, CATEGORY_ADMIN_ACTION } from "../constants";

const initialState = {
  categoryList: {
    data: [],
    loading: true,
    errors: null,
  },
  createCategory: {
    data: [],
    loading: true,
    errors: null,
  },
  deleteCategory: {
    loading: true,
    errors: null,
  },
  updateCategory: {
    loading: true,
    errors: null,
  },
};

const categoryAdminReducer = createReducer(initialState, {
  [REQUEST(CATEGORY_ADMIN_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        loading: true,
      },
    };
  },

  [SUCCESS(CATEGORY_ADMIN_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        loading: false,
        data,
      },
    };
  },

  [FAIL(CATEGORY_ADMIN_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        loading: false,
        errors,
      },
    };
  },

  // CREATE

  [REQUEST(CATEGORY_ADMIN_ACTION.CREATE_CATEGORY_ITEM)]: (state, action) => {
    return {
      ...state,
      createCategory: {
        ...state.createCategory,
        loading: true,
      },
    };
  },

  [SUCCESS(CATEGORY_ADMIN_ACTION.CREATE_CATEGORY_ITEM)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      createCategory: {
        ...state.createCategory,
        loading: false,
        data,
      },
    };
  },

  [FAIL(CATEGORY_ADMIN_ACTION.CREATE_CATEGORY_ITEM)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      createCategory: {
        ...state.createCategory,
        loading: false,
        errors,
      },
    };
  },

  //

  [REQUEST(CATEGORY_ADMIN_ACTION.DELETE_CATEGORY_ITEM)]: (state, action) => {
    return {
      ...state,
      deleteCategory: {
        ...state.deleteCategory,
        loading: true,
      },
    };
  },

  [SUCCESS(CATEGORY_ADMIN_ACTION.DELETE_CATEGORY_ITEM)]: (state, action) => {
    return {
      ...state,
      deleteCategory: {
        ...state.deleteCategory,
        loading: false,
      },
    };
  },

  [FAIL(CATEGORY_ADMIN_ACTION.DELETE_CATEGORY_ITEM)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      deleteCategory: {
        ...state.deleteCategory,
        loading: false,
        errors,
      },
    };
  },

  // UPDATE
  //

  [REQUEST(CATEGORY_ADMIN_ACTION.UPDATE_CATEGORY_ITEM)]: (state, action) => {
    return {
      ...state,
      updateCategory: {
        ...state.updateCategory,
        loading: true,
      },
    };
  },

  [SUCCESS(CATEGORY_ADMIN_ACTION.UPDATE_CATEGORY_ITEM)]: (state, action) => {
    return {
      ...state,
      updateCategory: {
        ...state.updateCategory,
        loading: false,
      },
    };
  },

  [FAIL(CATEGORY_ADMIN_ACTION.UPDATE_CATEGORY_ITEM)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      updateCategory: {
        ...state.updateCategory,
        loading: false,
        errors,
      },
    };
  },
});

export default categoryAdminReducer;
