import { call, put, takeEvery, debounce } from "redux-saga/effects";
import axios from "axios";
import { message } from "antd";

import { REQUEST, SUCCESS, FAIL, USER_ACTION } from "../constants";

function* getCustomerListSaga(action) {
  try {
    const { params } = action.payload;
    console.log(
      "🚀 ~ file: user.saga.js:10 ~ function*getCustomerListSaga ~ params",
      params
    );
    const result = yield axios.get(`http://localhost:4000/customers`, {
      params: {
        _embed: ["phoneNumbers", "emails", "images"],
        ...(params.keyword && {
          q: params.keyword,
        }),
        _sort: "id",
        _order: "desc",
      },
    });
    yield put({
      type: SUCCESS(USER_ACTION.GET_CUSTOMER_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(USER_ACTION.GET_CUSTOMER_LIST),
      payload: {
        errors: error,
      },
    });
  }
}

function* deleteCustomerSaga(action) {
  try {
    const id = action.payload;
    const result = yield axios.delete(`http://localhost:4000/customers/${id}`);
    yield put({
      type: SUCCESS(USER_ACTION.DELETE_CUSTOMER),
      payload: {
        data: result.data,
      },
    });

    yield put({
      type: REQUEST(USER_ACTION.GET_CUSTOMER_LIST),
      payload: {
        params: {},
      },
    });
    message.success("Xóa người dùng thành công!");
  } catch (error) {
    yield put({
      type: FAIL(USER_ACTION.DELETE_CUSTOMER),
      payload: {
        errors: error,
      },
    });
  }
}

function* updateNameSaga(action) {
  try {
    const { id, values } = action.payload;
    console.log(
      "🚀 ~ file: user.saga.js:69 ~ function*updateNameSaga ~ id",
      id
    );

    yield axios.patch(`http://localhost:4000/customers/${id}`, {
      name: values.name,
    });

    yield put({
      type: REQUEST(USER_ACTION.GET_CUSTOMER_LIST),
      payload: {
        params: {},
      },
    });
    message.success("Cập nhật số điện thoại thành công!");
  } catch (error) {
    yield put({
      type: FAIL(USER_ACTION.UPDATE_CUSTOMER),
      payload: {
        errors: error,
      },
    });
  }
}

function* createUserSaga(action) {
  try {
    const { name, phoneNumber, email, images, callback } = action.payload;

    const result = yield axios.post(`http://localhost:4000/customers`, {
      name,
    });

    yield axios.post(`http://localhost:4000/phoneNumbers`, {
      customerId: result.data.id,
      phoneNumber,
    });

    yield axios.post(`http://localhost:4000/emails`, {
      customerId: result.data.id,
      email,
    });

    if (images) {
      for (let i = 0; i < images.length; i++) {
        yield axios.post(`http://localhost:4000/images`, {
          customerId: result.data.id,
          url: images[i].url,
          name: images[i].name,
          type: images[i].type,
          thumbUrl: images[i].thumbUrl,
        });
      }
    }

    yield put({
      type: SUCCESS(USER_ACTION.CREATE_CUSTOMER),
      payload: {
        data: result.data,
      },
    });

    yield put({
      type: REQUEST(USER_ACTION.GET_CUSTOMER_LIST),
      payload: {
        params: {},
      },
    });

    if (callback.resetFields) yield callback.resetFields();
    message.success("Thêm người dùng thành công!");
  } catch (error) {
    yield put({
      type: FAIL(USER_ACTION.CREATE_CUSTOMER),
      payload: {
        errors: error,
      },
    });
  }
}

export default function* userSaga() {
  yield debounce(
    300,
    REQUEST(USER_ACTION.GET_CUSTOMER_LIST),
    getCustomerListSaga
  );
  yield takeEvery(REQUEST(USER_ACTION.CREATE_CUSTOMER), createUserSaga);
  yield takeEvery(REQUEST(USER_ACTION.DELETE_CUSTOMER), deleteCustomerSaga);
  yield takeEvery(REQUEST(USER_ACTION.UPDATE_NAME), updateNameSaga);
}
