import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, REVIEW_ACTION } from "../constants";

const initialState = {
  reviewList: {
    data: [],
    loading: false,
    errors: null,
  },
  reviewDetail: {
    loading: false,
    errors: null,
  },
  postReviewData: {
    loading: false,
    errors: null,
  },
  patchReviewData: {
    loading: false,
    errors: null,
  },
};

const reviewReducer = createReducer(initialState, {
  [REQUEST(REVIEW_ACTION.GET_REVIEW_LIST)]: (state, action) => {
    return {
      ...state,
      reviewList: {
        ...state.reviewList,
        loading: true,
      },
    };
  },

  [SUCCESS(REVIEW_ACTION.GET_REVIEW_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      reviewList: {
        ...state.reviewList,
        data,
        loading: false,
      },
    };
  },

  [FAIL(REVIEW_ACTION.GET_REVIEW_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      reviewList: {
        ...state.reviewList,
        loading: false,
        errors,
      },
    };
  },

  // DETAIL

  [REQUEST(REVIEW_ACTION.GET_REVIEW_DETAIL_ACTION)]: (state, action) => {
    return {
      ...state,
      reviewDetail: {
        ...state.reviewDetail,
        loading: true,
      },
    };
  },

  [SUCCESS(REVIEW_ACTION.GET_REVIEW_DETAIL_ACTION)]: (state, action) => {
    return {
      ...state,
      reviewDetail: {
        ...state.reviewDetail,
        ...action.payload,
        loading: false,
      },
    };
  },

  [FAIL(REVIEW_ACTION.GET_REVIEW_DETAIL_ACTION)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      reviewDetail: {
        ...state.reviewDetail,
        loading: false,
        errors,
      },
    };
  },

  // POST

  [REQUEST(REVIEW_ACTION.POST_REVIEW)]: (state, action) => {
    return {
      ...state,
      postReviewData: {
        loading: true,
        errors: null,
      },
    };
  },

  [SUCCESS(REVIEW_ACTION.POST_REVIEW)]: (state, action) => {
    return {
      ...state,
      postReviewData: {
        loading: false,
        errors: null,
      },
    };
  },

  [FAIL(REVIEW_ACTION.POST_REVIEW)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      postReviewData: {
        loading: false,
        errors,
      },
    };
  },

  // PATCH

  [REQUEST(REVIEW_ACTION.PATCH_REVIEW)]: (state, action) => {
    return {
      ...state,
      patchReviewData: {
        loading: true,
        errors: null,
      },
    };
  },

  [SUCCESS(REVIEW_ACTION.PATCH_REVIEW)]: (state, action) => {
    return {
      ...state,
      patchReviewData: {
        loading: false,
        errors: null,
      },
    };
  },

  [FAIL(REVIEW_ACTION.PATCH_REVIEW)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      patchReviewData: {
        loading: false,
        errors,
      },
    };
  },
});

export default reviewReducer;
