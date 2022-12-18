import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { REQUEST, SUCCESS, FAIL, CUSTOMER_ACTION } from "../constants";
import { message } from "antd";

import { ADMIN_TABLE_LIMIT } from "../../../constants/pagination";

function* getCustomerListSaga(action) {
  try {
    const { params } = action.payload;
    const result = yield axios.get(`http://localhost:4000/users`, {
      params: {
        _page: params.page,
        _limit: params.limit,
        _sort: "id",
        _order: "desc",
      },
    });
    yield put({
      type: SUCCESS(CUSTOMER_ACTION.GET_CUSTOMER_LIST),
      payload: {
        data: result.data,
        meta: {
          total: parseInt(result.headers["x-total-count"]),
          page: params.page,
          limit: params.limit,
        },
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(CUSTOMER_ACTION.GET_CUSTOMER_LIST),
      payload: {
        errors: error,
      },
    });
  }
}

function* deleteCustomerAdminSaga(action) {
  try {
    const id = action.payload;
    yield axios.delete(`http://localhost:4000/users/${id}`);
    yield put({ type: SUCCESS(CUSTOMER_ACTION.DELETE_CUSTOMER_ITEM) });
    yield put({
      type: REQUEST(CUSTOMER_ACTION.GET_CUSTOMER_LIST),
      payload: {
        params: {
          page: 1,
          limit: ADMIN_TABLE_LIMIT,
        },
      },
    });
    message.success("Xóa người dùng thành công");
  } catch (error) {
    yield put({
      type: FAIL(CUSTOMER_ACTION.DELETE_CUSTOMER_ITEM),
      payload: {
        errors: error,
      },
    });
  }
}

export default function* customerAdminSaga() {
  yield takeEvery(
    REQUEST(CUSTOMER_ACTION.GET_CUSTOMER_LIST),
    getCustomerListSaga
  );
  yield takeEvery(
    REQUEST(CUSTOMER_ACTION.DELETE_CUSTOMER_ITEM),
    deleteCustomerAdminSaga
  );
}
