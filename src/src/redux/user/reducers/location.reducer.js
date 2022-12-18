import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, LOCATION_ACTION } from "../constants";

const initialState = {
  cityList: {
    data: [],
    loading: false,
    errors: null,
  },
  locationDetail: {
    data: [],
    loading: false,
    errors: null,
  },
  districtList: {
    data: [],
    loading: false,
    errors: null,
  },
  wardList: {
    data: [],
    loading: false,
    errors: null,
  },
  createLocationData: {
    data: {},
    loading: false,
    errors: null,
  },
  deleteLocationData: {
    data: {},
    loading: false,
    errors: null,
  },
  updateLocationData: {
    data: {},
    loading: false,
    errors: null,
  },
};

const locationReducer = createReducer(initialState, {
  [REQUEST(LOCATION_ACTION.GET_CITY_LIST)]: (state, action) => {
    return {
      ...state,
      cityList: {
        ...state.cityList,
        loading: true,
      },
    };
  },

  [SUCCESS(LOCATION_ACTION.GET_CITY_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      cityList: {
        ...state.cityList,
        data,
        loading: false,
      },
    };
  },

  [FAIL(LOCATION_ACTION.GET_CITY_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      cityList: {
        ...state.cityList,
        loading: false,
        errors,
      },
    };
  },

  // DISTRICT

  [REQUEST(LOCATION_ACTION.GET_DISTRICT_LIST)]: (state, action) => {
    return {
      ...state,
      districtList: {
        ...state.districtList,
        loading: true,
      },
    };
  },
  [SUCCESS(LOCATION_ACTION.GET_DISTRICT_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      districtList: {
        ...state.districtList,
        data,
        loading: false,
      },
    };
  },
  [FAIL(LOCATION_ACTION.GET_DISTRICT_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      districtList: {
        ...state.districtList,
        loading: false,
        errors,
      },
    };
  },

  // WARDS

  [REQUEST(LOCATION_ACTION.GET_WARD_LIST)]: (state, action) => {
    return {
      ...state,
      wardList: {
        ...state.wardList,
        loading: true,
      },
    };
  },
  [SUCCESS(LOCATION_ACTION.GET_WARD_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      wardList: {
        ...state.wardList,
        data,
        loading: false,
      },
    };
  },
  [FAIL(LOCATION_ACTION.GET_WARD_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      wardList: {
        ...state.wardList,
        loading: false,
        errors,
      },
    };
  },

  // CLEAR

  [REQUEST(LOCATION_ACTION.CLEAR_LOCATION)]: (state, action) => {
    return {
      ...state,
      districtList: {
        data: [],
        loading: false,
        errors: null,
      },
      wardList: {
        data: [],
        loading: false,
        errors: null,
      },
    };
  },

  // GET_DETAIL
  [REQUEST(LOCATION_ACTION.GET_DETAIL_LOCATION)]: (state, action) => {
    return {
      ...state,
      locationDetail: {
        ...state.locationDetail,
        loading: true,
      },
    };
  },

  [SUCCESS(LOCATION_ACTION.GET_DETAIL_LOCATION)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      locationDetail: {
        ...state.locationDetail,
        data,
        loading: false,
      },
    };
  },

  [FAIL(LOCATION_ACTION.GET_DETAIL_LOCATION)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      locationDetail: {
        ...state.locationDetail,
        loading: false,
        errors,
      },
    };
  },

  // CREATE

  [REQUEST(LOCATION_ACTION.CREATE_LOCATION_ITEM)]: (state, action) => {
    return {
      ...state,
      createLocationData: {
        ...state.createLocationData,
        loading: true,
      },
    };
  },

  [SUCCESS(LOCATION_ACTION.CREATE_LOCATION_ITEM)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      createLocationData: {
        ...state.createLocationData,
        data,
        loading: false,
      },
    };
  },

  [FAIL(LOCATION_ACTION.CREATE_LOCATION_ITEM)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      createLocationData: {
        ...state.createLocationData,
        loading: false,
        errors,
      },
    };
  },

  // DELETE

  [REQUEST(LOCATION_ACTION.DELETE_LOCATION_ITEM)]: (state, action) => {
    return {
      ...state,
      deleteLocationData: {
        ...state.deleteLocationData,
        loading: true,
      },
    };
  },

  [SUCCESS(LOCATION_ACTION.DELETE_LOCATION_ITEM)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      deleteLocationData: {
        ...state.deleteLocationData,
        loading: false,
        data,
      },
    };
  },

  [FAIL(LOCATION_ACTION.DELETE_LOCATION_ITEM)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      deleteLocationData: {
        ...state.deleteLocationData,
        loading: false,
        errors,
      },
    };
  },

  // UPDATE

  [REQUEST(LOCATION_ACTION.UPDATE_LOCATION_ITEM)]: (state, action) => {
    return {
      ...state,
      updateLocationData: {
        ...state.updateLocationData,
        loading: true,
      },
    };
  },

  [SUCCESS(LOCATION_ACTION.UPDATE_LOCATION_ITEM)]: (state, action) => {
    return {
      ...state,
      updateLocationData: {
        ...state.updateLocationData,
        loading: false,
      },
    };
  },

  [FAIL(LOCATION_ACTION.UPDATE_LOCATION_ITEM)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      updateLocationData: {
        ...state.updateLocationData,
        loading: false,
        errors,
      },
    };
  },
});

export default locationReducer;
