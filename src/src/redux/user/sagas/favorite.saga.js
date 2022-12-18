import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { message } from "antd";

import {
  REQUEST,
  SUCCESS,
  FAIL,
  PRODUCT_ACTION,
  FAVORITE_ACTION,
} from "../constants";

function* favoriteProductSaga(action) {
  try {
    // const { productId } = action.payload;
    const result = yield axios.post(
      `http://localhost:4000/favorites`,
      action.payload
    );
    yield put({
      type: SUCCESS(FAVORITE_ACTION.FAVORITE_PRODUCT),
      payload: {
        data: result.data,
      },
    });
    // yield put({
    //   type: REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
    //   payload: { id: productId}
    // })
  } catch (error) {
    yield put({
      type: FAIL(FAVORITE_ACTION.FAVORITE_PRODUCT),
      payload: {
        errors: error,
      },
    });
  }
}

function* unFavoriteProductSaga(action) {
  try {
    const { id, productId } = action.payload;
    yield axios.delete(`http://localhost:4000/favorites/${id}`);
    yield put({
      type: SUCCESS(FAVORITE_ACTION.UN_FAVORITE_PRODUCT),
      payload: {
        id: id,
      },
    });
    // yield put({
    //   type: REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
    //   payload: { id: productId}
    // })
  } catch (e) {
    yield put({
      type: FAIL(FAVORITE_ACTION.UN_FAVORITE_PRODUCT),
      payload: {
        errors: e.response.value,
      },
    });
  }
}

function* getfavoriteListSaga(action) {
  try {
    const result = yield axios.get(`http://localhost:4000/favorites`);
    yield put({
      type: SUCCESS(FAVORITE_ACTION.GET_FAVORITE_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(FAVORITE_ACTION.GET_FAVORITE_LIST),
      payload: {
        errors: e.response.data,
      },
    });
  }
}

export default function* favoriteSaga() {
  yield takeEvery(
    REQUEST(FAVORITE_ACTION.FAVORITE_PRODUCT),
    favoriteProductSaga
  );
  yield takeEvery(
    REQUEST(FAVORITE_ACTION.UN_FAVORITE_PRODUCT),
    unFavoriteProductSaga
  );
  yield takeEvery(
    REQUEST(FAVORITE_ACTION.GET_FAVORITE_LIST),
    getfavoriteListSaga
  );
}
