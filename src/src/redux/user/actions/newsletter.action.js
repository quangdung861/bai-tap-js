import { createAction } from "@reduxjs/toolkit";

import { REQUEST, NEWSLETTER_ACTION } from "../constants";

export const addNewsletterAction = createAction(
  REQUEST(NEWSLETTER_ACTION.ADD_NEWSLETTER)
);
export const getNewsletterListAction = createAction(
  REQUEST(NEWSLETTER_ACTION.GET_NEWSLETTER_LIST)
);