import { createAction } from "@reduxjs/toolkit";

import { REQUEST, CATEGORY_ACTION } from "../constants";

export const getCategoryListAction = createAction(
  REQUEST(CATEGORY_ACTION.GET_CATEGORY_LIST)
);

