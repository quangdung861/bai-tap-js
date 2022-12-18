import { fork } from "redux-saga/effects";

// USER
import userSaga from "./user/sagas/user.saga";
import productSaga from "./user/sagas/product.saga";
import categorySaga from "./user/sagas/category.saga";
import favoriteSaga from "./user/sagas/favorite.saga";
import locationSaga from "./user/sagas/location.saga";
import reviewSaga from "./user/sagas/review.saga";
import voucherSaga from "./user/sagas/voucher.saga";
import orderSaga from "./user/sagas/order.saga";
import newsletterSaga from "./user/sagas/newsletter.saga";

// ADMIN
import categoryAdminSaga from "./admin/sagas/category.saga";
import productAdminSaga from "./admin/sagas/product.saga";
import customerAdminSaga from "./admin/sagas/customer.saga";

export default function* rootSaga() {
  // USER
  yield fork(userSaga);
  yield fork(productSaga);
  yield fork(categorySaga);
  yield fork(locationSaga);
  yield fork(favoriteSaga);
  yield fork(reviewSaga);
  yield fork(voucherSaga);
  yield fork(orderSaga);
  yield fork(newsletterSaga);
  // ADMIN
  yield fork(productAdminSaga);
  yield fork(categoryAdminSaga);
  yield fork(customerAdminSaga);
}
