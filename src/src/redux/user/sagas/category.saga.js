import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { REQUEST, SUCCESS, FAIL, CATEGORY_ACTION } from "../constants";

function* getCategoryListSaga(action) {
  try {
    const result = yield axios.get(`http://localhost:4000/categories`, {
      _sort: "id",
      _order: "desc",
    });
    yield put({
      type: SUCCESS(CATEGORY_ACTION.GET_CATEGORY_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(CATEGORY_ACTION.GET_CATEGORY_LIST),
      payload: {
        errors: error,
      },
    });
  }
}

export default function* categorySaga() {
  yield takeEvery(
    REQUEST(CATEGORY_ACTION.GET_CATEGORY_LIST),
    getCategoryListSaga
  );
}
