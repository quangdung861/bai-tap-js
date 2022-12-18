import { createAction } from "@reduxjs/toolkit";

import { REQUEST, REVIEW_ACTION } from "../constants";

export const getReviewListAction = createAction(
  REQUEST(REVIEW_ACTION.GET_REVIEW_LIST)
);
export const getReviewDetailAction = createAction(
  REQUEST(REVIEW_ACTION.GET_REVIEW_DETAIL_ACTION)
);
export const postReviewAction = createAction(
  REQUEST(REVIEW_ACTION.POST_REVIEW)
);
export const patchReviewAction = createAction(
  REQUEST(REVIEW_ACTION.PATCH_REVIEW)
);

