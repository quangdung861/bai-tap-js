import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./redux/sagasCommon";

import userReducer from "./redux/user/reducers/user.reducer";
import productReducer from "./redux/user/reducers/product.reducer";
import categoryReducer from "./redux/user/reducers/category.reducer";
import cartReducer from "./redux/user/reducers/cart.reducer";
import favoriteReducer from "./redux/user/reducers/favorite.reducer";
import locationReducer from "./redux/user/reducers/location.reducer";
import reviewReducer from "./redux/user/reducers/review.reducer";
import voucherReducer from "./redux/user/reducers/voucher.reducer";
import newsletterReducer from "./redux/user/reducers/newsletter.reducer";
import orderReducer from "./redux/user/reducers/order.reducer";

import categoryAdminReducer from "./redux/admin/reducers/category.reducer";
import productAdminReducer from "./redux/admin/reducers/product.reducer";
import customerAdminReducer from "./redux/admin/reducers/customer.reducer";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    // USER
    userReducer,
    productReducer,
    categoryReducer,
    cartReducer,
    locationReducer,
    favoriteReducer,
    reviewReducer,
    voucherReducer,
    newsletterReducer,
    orderReducer,
    // ADMIN
    categoryAdminReducer,
    productAdminReducer,
    customerAdminReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export default store;
