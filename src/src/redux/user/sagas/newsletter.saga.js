import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { REQUEST, SUCCESS, FAIL, NEWSLETTER_ACTION } from "../constants";
import { message } from "antd";

function* addNewsletterSaga(action) {
  try {
    const { email, callback } = action.payload;
    console.log(
      "🚀 ~ file: newsletter.saga.js ~ line 9 ~ function*addNewsletterSaga ~ email",
      email
    );
    const result = yield axios.post(`http://localhost:4000/newletters`, {
      email,
    });
    yield put({
      type: SUCCESS(NEWSLETTER_ACTION.ADD_NEWSLETTER),
      payload: {
        data: result.data,
      },
    });
    yield put({
      type: REQUEST(NEWSLETTER_ACTION.GET_NEWSLETTER_LIST),
    });
    yield callback.resetNewsletterForm();
    yield message.success("Đăng ký nhận bản tin thành công")
  } catch (error) {
    yield put({
      type: FAIL(NEWSLETTER_ACTION.ADD_NEWSLETTER),
      payload: {
        errors: error,
      },
    });
  }
}

function* getNewsletterListSaga(action) {
  try {
    const result = yield axios.get(`http://localhost:4000/newletters`);
    yield put({
      type: SUCCESS(NEWSLETTER_ACTION.GET_NEWSLETTER_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(NEWSLETTER_ACTION.GET_NEWSLETTER_LIST),
      payload: {
        errors: error,
      },
    });
  }
}

export default function* newsletterSaga() {
  yield takeEvery(REQUEST(NEWSLETTER_ACTION.ADD_NEWSLETTER), addNewsletterSaga);
  yield takeEvery(
    REQUEST(NEWSLETTER_ACTION.GET_NEWSLETTER_LIST),
    getNewsletterListSaga
  );
}
