import { put, debounce, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { message } from "antd";

import { REQUEST, SUCCESS, FAIL, PRODUCT_ACTION } from "../constants";

function* getProductListSaga(action) {
  try {
    const { params, showMore } = action.payload;
    const result = yield axios.get(`http://localhost:4000/products`, {
      params: {
        _expand: "category",
        _page: params.page,
        _limit: params.limit,
        ...(params.categoryId && {
          categoryId: params.categoryId,
        }),
        ...(params.keyword && {
          q: params.keyword,
        }),
        _embed: ["images", "reviews"],
        ...(params.priceFilter
          ? {
              _sort: "price",
            }
          : { _sort: "id" }),
        ...(params.priceFilter
          ? {
              _order: params.priceFilter,
            }
          : { _order: "desc" }),
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        data: result.data,
        meta: {
          total: parseInt(result.headers["x-total-count"]),
          page: params.page,
          limit: params.limit,
        },
        showMore: showMore,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        errors: error,
      },
    });
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/products/${id}`, {
      params: {
        _expand: "category",
        _embed: ["options", "images", "favorites"],
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        errors: error,
      },
    });
  }
}

function* clearProductListSaga(action) {
  try {
    yield put({
      type: SUCCESS(PRODUCT_ACTION.CLEAR_PRODUCT_LIST),
    });
  } catch (error) {
    yield put({
      type: FAIL(PRODUCT_ACTION.CLEAR_PRODUCT_LIST),
      payload: {
        errors: error,
      },
    });
  }
}

export default function* productSaga() {
  yield debounce(
    100,
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST),
    getProductListSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
    getProductDetailSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ACTION.CLEAR_PRODUCT_LIST),
    clearProductListSaga
  );
}
