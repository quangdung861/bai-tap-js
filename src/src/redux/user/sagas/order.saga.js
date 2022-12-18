import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import {
  ORDER_ACTION,
  REQUEST,
  SUCCESS,
  FAIL,
  CART_ACTION,
} from "../constants";
import { message } from "antd";

function* orderProductSaga(action) {
  try {
    const { products, images, callback, ...orderData } = action.payload;
    const result = yield axios.post("http://localhost:4000/orders", orderData);
    for (let i = 0; i < products.length; i++) {
      yield axios.post("http://localhost:4000/orderProducts", {
        orderId: result.data.id,
        ...products[i],
      });
    }
    yield put({
      type: SUCCESS(ORDER_ACTION.ORDER_PRODUCT),
      payload: {
        data: result.data,
      },
    });
    ///
    for (let i = 0; i < images.length; i++) {
      yield axios.post("http://localhost:4000/orderProductImages", {
        orderId: result.data.id,
        productId: images[i][0].productId,
        name: images[i][0].name,
        type: images[i][0].type,
        url: images[i][0].url,
      });
    }
    //

    yield axios.post("http://localhost:4000/statusDetailOrders", {
      orderId: result.data.id,
      confirm: "Xác Nhận Thông Tin Thanh Toán",
      delivery: "Giao Cho ĐVVC",
      delivering: "Đơn Hàng Đang Giao",
      review: "Đánh Giá",
    });

    ///
    yield put({
      type: REQUEST(CART_ACTION.CLEAR_CART_LIST),
    });
    yield callback?.goToSuccessPage();
  } catch (e) {
    yield put({
      type: FAIL(ORDER_ACTION.ORDER_PRODUCT),
      payload: {
        error: "Fail!",
      },
    });
  }
}

function* guestOrderProductSaga(action) {
  try {
    const { products, callback, ...orderData } = action.payload;
    const result = yield axios.post(
      "http://localhost:4000/guestOrders",
      orderData
    );
    for (let i = 0; i < products.length; i++) {
      yield axios.post("http://localhost:4000/guestOrderProducts", {
        guestOrderId: result.data.id,
        ...products[i],
      });
    }
    yield put({
      type: SUCCESS(ORDER_ACTION.GUEST_ORDER_PRODUCT),
      payload: {
        data: result.data,
      },
    });
    yield put({
      type: REQUEST(CART_ACTION.CLEAR_CART_LIST),
    });
    yield callback?.goToSuccessPage();
  } catch (e) {
    yield put({
      type: FAIL(ORDER_ACTION.GUEST_ORDER_PRODUCT),
      payload: {
        error: "Fail!",
      },
    });
  }
}

function* getOrderListSaga(action) {
  try {
    const { userId } = action.payload;
    const result = yield axios.get("http://localhost:4000/orders", {
      params: {
        ...(userId && {
          userId: userId,
        }),
        _embed: ["orderProducts", "orderProductImages", "statusDetailOrders"],
        _sort: "id",
        _order: "desc",
      },
    });
    yield put({
      type: SUCCESS(ORDER_ACTION.GET_ORDER_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(ORDER_ACTION.GET_ORDER_LIST),
      payload: {
        error: "Fail",
      },
    });
  }
}

function* getOrderDetailSaga(action) {
  try {
    const { orderId } = action.payload;
    const result = yield axios.get(`http://localhost:4000/orders/${orderId}`, {
      params: {
        _embed: ["orderProducts", "orderProductImages", "statusDetailOrders"],
      },
    });
    yield put({
      type: SUCCESS(ORDER_ACTION.GET_ORDER_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(ORDER_ACTION.GET_ORDER_DETAIL),
      payload: {
        error: "Fail!",
      },
    });
  }
}

function* getProductSoldSaga(action) {
  try {
    const { productId } = action.payload;
    const result = yield axios.get(`http://localhost:4000/orderProducts`, {
      params: {
        productId,
      },
    });
    yield put({
      type: SUCCESS(ORDER_ACTION.GET_PRODUCT_SOLD),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(ORDER_ACTION.GET_PRODUCT_SOLD),
      payload: {
        error: "Fail!",
      },
    });
  }
}

//ADMIN
function* handleOrderItemSaga(action) {
  try {
    const { id, params, messageOrder, paramsStatusDetailOrders, callback } =
      action.payload;
    const result = yield axios.patch(`http://localhost:4000/orders/${id}`, {
      ...(params.orderStatus && {
        orderStatus: params.orderStatus,
      }),
      ...(params.paymentStatus && {
        paymentStatus: params.paymentStatus,
      }),
      ...(params.deliveryStatus && {
        deliveryStatus: params.deliveryStatus,
      }),
      ...(params.deliveryName && {
        deliveryName: params.deliveryName,
      }),
    });

    yield axios.patch(
      `http://localhost:4000/statusDetailOrders/${paramsStatusDetailOrders.id}`,
      {
        ...(paramsStatusDetailOrders.confirm && {
          confirm: paramsStatusDetailOrders.confirm,
        }),
        ...(paramsStatusDetailOrders.createConfirmAt && {
          createConfirmAt: paramsStatusDetailOrders.createConfirmAt,
        }),
        ...(paramsStatusDetailOrders.delivery && {
          delivery: paramsStatusDetailOrders.delivery,
        }),
        ...(paramsStatusDetailOrders.createDeliveryAt && {
          createDeliveryAt: paramsStatusDetailOrders.createDeliveryAt,
        }),
        ...(paramsStatusDetailOrders.delivering && {
          delivering: paramsStatusDetailOrders.delivering,
        }),
        ...(paramsStatusDetailOrders.createDeliveringAt && {
          createDeliveringAt: paramsStatusDetailOrders.createDeliveringAt,
        }),
        ...(paramsStatusDetailOrders.review && {
          review: paramsStatusDetailOrders.review,
        }),
      }
    );

    yield put({
      type: REQUEST(ORDER_ACTION.GET_ORDER_LIST),
      payload: {
        userId: result.data.userId,
      },
    });
    message.success(messageOrder);
    if (callback.closeModal) callback.closeModal();
  } catch (e) {
    yield put({
      type: FAIL(ORDER_ACTION.GET_ORDER_LIST),
      payload: {
        error: "Fail!",
      },
    });
  }
}

export default function* orderSaga() {
  yield takeEvery(REQUEST(ORDER_ACTION.ORDER_PRODUCT), orderProductSaga);
  yield takeEvery(
    REQUEST(ORDER_ACTION.GUEST_ORDER_PRODUCT),
    guestOrderProductSaga
  );
  yield takeEvery(REQUEST(ORDER_ACTION.GET_ORDER_LIST), getOrderListSaga);
  yield takeEvery(REQUEST(ORDER_ACTION.GET_ORDER_DETAIL), getOrderDetailSaga);
  yield takeEvery(REQUEST(ORDER_ACTION.HANDLE_ORDER_ITEM), handleOrderItemSaga);
  yield takeEvery(REQUEST(ORDER_ACTION.GET_PRODUCT_SOLD), getProductSoldSaga);
}
