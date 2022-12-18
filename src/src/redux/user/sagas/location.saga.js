import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  REQUEST,
  SUCCESS,
  FAIL,
  LOCATION_ACTION,
  USER_ACTION,
} from "../constants";
import { message } from "antd";

function* getCityListSaga(action) {
  try {
    const result = yield axios.get(`http://localhost:4000/cities`);
    yield put({
      type: SUCCESS(LOCATION_ACTION.GET_CITY_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(LOCATION_ACTION.GET_CITY_LIST),
      payload: {
        errors: error,
      },
    });
  }
}

function* getLocationDetailSaga(action) {
  try {
    const result = yield axios.get(`http://localhost:4000/locations`);
    yield put({
      type: SUCCESS(LOCATION_ACTION.GET_DETAIL_LOCATION),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(LOCATION_ACTION.GET_DETAIL_LOCATION),
      payload: {
        errors: error,
      },
    });
  }
}

function* getDistrictListSga(action) {
  try {
    const { cityCode } = action.payload;
    const result = yield axios.get(
      `http://localhost:4000/districts?parentcode=${cityCode}`
    );

    yield put({
      type: SUCCESS(LOCATION_ACTION.GET_DISTRICT_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(LOCATION_ACTION.GET_DISTRICT_LIST),
      payload: {
        errors: error,
      },
    });
  }
}

function* getWardListSaga(action) {
  try {
    const { districtCode } = action.payload;
    const result = yield axios.get(
      `http://localhost:4000/wards?parentcode=${districtCode}`
    );

    yield put({
      type: SUCCESS(LOCATION_ACTION.GET_WARD_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(LOCATION_ACTION.GET_WARD_LIST),
      payload: {
        errors: error,
      },
    });
  }
}

///

function* createLocationSaga(action) {
  try {
    const { callback, ...values } = action.payload;
    const result = yield axios.post(`http://localhost:4000/locations`, values);
    yield put({
      type: SUCCESS(LOCATION_ACTION.CREATE_LOCATION_ITEM),
      payload: {
        data: result.data,
      },
    });
    yield put({
      type: REQUEST(USER_ACTION.GET_USER_INFO),
      payload: {
        id: result.data.userId,
      },
    });
    yield message.success("Thêm địa chỉ mới thành công");
    yield callback.resetModalCreateLocation;
    yield callback.cancelModalCreateLocation;
  } catch (error) {
    yield put({
      type: FAIL(LOCATION_ACTION.CREATE_LOCATION_ITEM),
      payload: {
        errors: error,
      },
    });
  }
}

// DELETE

function* deleteLocationSaga(action) {
  try {
    const { locationId, userId } = action.payload;
    const result = yield axios.delete(`http://localhost:4000/locations/${locationId}`);
    yield put({
      type: SUCCESS(LOCATION_ACTION.DELETE_LOCATION_ITEM),
      payload: {
        data: result.data
      }
    });
    yield put({
      type: REQUEST(USER_ACTION.GET_USER_INFO),
      payload: {
        id: userId,
      },
    });
    yield message.success("Xóa địa chỉ thành công");
  } catch (error) {
    yield put({
      type: FAIL(LOCATION_ACTION.DELETE_LOCATION_ITEM),
      payload: {
        errors: "Fails",
      },
    });
  }
}

function* updateLocationSaga(action) {
  try {
    const { callback, locationId, ...values } = action.payload;
    const result = yield axios.patch(
      `http://localhost:4000/locations/${locationId}`,
      values
    );
    yield put({
      type: SUCCESS(LOCATION_ACTION.UPDATE_LOCATION_ITEM),
      payload: {
        data: result.data,
      },
    });
    yield put({
      type: REQUEST(USER_ACTION.GET_USER_INFO),
      payload: {
        id: result.data.userId,
      },
    });
    yield message.success("Cập nhật địa chỉ thành công");
    yield callback.resetModalUpdateLocation;
    yield callback.cancelModalUpdateLocation;
  } catch (error) {
    yield put({
      type: FAIL(LOCATION_ACTION.UPDATE_LOCATION_ITEM),
      payload: {
        errors: error,
      },
    });
  }
}

export default function* locationSaga() {
  yield takeEvery(REQUEST(LOCATION_ACTION.GET_CITY_LIST), getCityListSaga);
  yield takeEvery(
    REQUEST(LOCATION_ACTION.GET_DETAIL_LOCATION),
    getLocationDetailSaga
  );
  yield takeEvery(
    REQUEST(LOCATION_ACTION.GET_DISTRICT_LIST),
    getDistrictListSga
  );
  yield takeEvery(REQUEST(LOCATION_ACTION.GET_WARD_LIST), getWardListSaga);
  yield takeEvery(
    REQUEST(LOCATION_ACTION.CREATE_LOCATION_ITEM),
    createLocationSaga
  );
  yield takeEvery(
    REQUEST(LOCATION_ACTION.DELETE_LOCATION_ITEM),
    deleteLocationSaga
  );
  yield takeEvery(
    REQUEST(LOCATION_ACTION.UPDATE_LOCATION_ITEM),
    updateLocationSaga
  );
}
