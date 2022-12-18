import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { message } from "antd";

import { REQUEST, SUCCESS, FAIL, PRODUCT_ADMIN_ACTION } from "../constants";

import { ADMIN_TABLE_LIMIT } from "../../../constants/pagination";

function* getProductListAdminSaga(action) {
  try {
    const { params } = action.payload;
    const result = yield axios.get(`http://localhost:4000/products`, {
      params: {
        _expand: "category",
        _page: params.page,
        _limit: params.limit,
        _sort: "id",
        _order: "desc",
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ADMIN_ACTION.GET_PRODUCT_LIST),
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
      type: FAIL(PRODUCT_ADMIN_ACTION.GET_PRODUCT_LIST),
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
        _embed: ["options", "images"],
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ADMIN_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(PRODUCT_ADMIN_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        errors: error,
      },
    });
  }
}

function* createProductAdminSaga(action) {
  try {
    const { values, options, images, callback } = action.payload;
    console.log("🚀 ~ file: product.saga.js ~ line 71 ~ function*createProductAdminSaga ~ values", values)
    const result = yield axios.post(`http://localhost:4000/products`, values);
    if (options) {
      for (let i = 0; i < options.length; i++) {
        yield axios.post(`http://localhost:4000/options`, {
          productId: result.data.id,
          name: options[i].name,
          bonusPrice: options[i].bonusPrice,
        });
      }
    }

    if (images) {
      for (let i = 0; i < images.length; i++) {
        yield axios.post(`http://localhost:4000/images`, {
          productId: result.data.id,
          url: images[i].url,
          name: images[i].name,
          type: images[i].type,
          thumbUrl: images[i].thumbUrl,
        });
      }
    }

    yield put({
      type: SUCCESS(PRODUCT_ADMIN_ACTION.CREATE_PRODUCT),
      payload: {
        data: result.data,
      },
    });
    yield callback.redirectProductList();
    message.success("Tạo sản phẩm thành công");
  } catch (error) {
    yield put({
      type: FAIL(PRODUCT_ADMIN_ACTION.CREATE_PRODUCT),
      payload: {
        errors: error,
      },
    });
  }
}

function* deleteProductAdminSaga(action) {
  try {
    const id = action.payload;
    yield axios.delete(`http://localhost:4000/products/${id}`);
    yield put({ type: SUCCESS(PRODUCT_ADMIN_ACTION.DELETE_PRODUCT) });
    yield put({
      type: REQUEST(PRODUCT_ADMIN_ACTION.GET_PRODUCT_LIST),
      payload: {
        params: {
          page: 1,
          limit: ADMIN_TABLE_LIMIT,
        },
      },
    });
    message.success("Xóa sản phẩm thành công");
  } catch (error) {
    yield put({
      type: FAIL(PRODUCT_ADMIN_ACTION.DELETE_PRODUCT),
      payload: {
        errors: error,
      },
    });
  }
}

function* updateProductAdminSaga(action) {
  try {
    const {
      id,
      values,
      options,
      initialOptionIds,
      images,
      initialImageIds,
      callback,
    } = action.payload;
    console.log("🚀 ~ file: product.saga.js ~ line 146 ~ function*updateProductAdminSaga ~ action.payload", action.payload)
    const result = yield axios.patch(
      `http://localhost:4000/products/${id}`,
      values
    );
    // Option
    for (let i = 0; i < options.length; i++) {
      if (options[i].id) {
        yield axios.patch(`http://localhost:4000/options/${options[i].id}`, {
          productId: result.data.id,
          name: options[i].name,
          bonusPrice: options[i].bonusPrice,
        });
      } else {
        yield axios.post(`http://localhost:4000/options`, {
          productId: result.data.id,
          name: options[i].name,
          bonusPrice: options[i].bonusPrice,
        });
      }
    }

    for (let j = 0; j < initialOptionIds.length; j++) {
      const keepOption = options.find(
        (item) => item.id && item.id === initialOptionIds[j]
      );
      if (!keepOption) {
        yield axios.delete(
          `http://localhost:4000/options/${initialOptionIds[j]}`
        );
      }
    }

    // Image
    for (let i = 0; i < images.length; i++) {
      if (!images[i].id) {
        yield axios.post(`http://localhost:4000/images`, {
          ...images[i],
          productId: result.data.id,
        });
      } 
    }

    for (let i = 0; i < initialImageIds.length; i++) {
      const keepImage = images.find(
        (item) => item.id && item.id === initialImageIds[i]
      );

      if (!keepImage) {
        yield axios.delete(
          `http://localhost:4000/images/${initialImageIds[i]}`
        );
      }
    }

    yield put({ type: SUCCESS(PRODUCT_ADMIN_ACTION.UPDATE_PRODUCT) });
    yield callback.redirectProductList();
    message.success("Cập nhập sản phẩm thành công");
  } catch (error) {
    yield put({
      type: FAIL(PRODUCT_ADMIN_ACTION.UPDATE_PRODUCT),
      payload: {
        errors: error,
      },
    });
  }
}

export default function* productAdminSaga() {
  yield takeEvery(
    REQUEST(PRODUCT_ADMIN_ACTION.CREATE_PRODUCT),
    createProductAdminSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ADMIN_ACTION.GET_PRODUCT_LIST),
    getProductListAdminSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ADMIN_ACTION.GET_PRODUCT_DETAIL),
    getProductDetailSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ADMIN_ACTION.DELETE_PRODUCT),
    deleteProductAdminSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ADMIN_ACTION.UPDATE_PRODUCT),
    updateProductAdminSaga
  );
}
