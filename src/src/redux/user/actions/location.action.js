import { createAction } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, LOCATION_ACTION } from "../constants";

export const getCityListAction = createAction(
  REQUEST(LOCATION_ACTION.GET_CITY_LIST)
);
export const getDistrictListAction = createAction(
  REQUEST(LOCATION_ACTION.GET_DISTRICT_LIST)
);
export const getWardListAction = createAction(
  REQUEST(LOCATION_ACTION.GET_WARD_LIST)
);
export const clearLocationAction = createAction(
  REQUEST(LOCATION_ACTION.CLEAR_LOCATION)
);

export const getDetailLocationAction = createAction(
  REQUEST(LOCATION_ACTION.GET_DETAIL_LOCATION)
);

export const createLocationAction = createAction(
  REQUEST(LOCATION_ACTION.CREATE_LOCATION_ITEM)
);
export const deleteLocationAction = createAction(
  REQUEST(LOCATION_ACTION.DELETE_LOCATION_ITEM)
);
export const updateLocationAction = createAction(
  REQUEST(LOCATION_ACTION.UPDATE_LOCATION_ITEM)
);
