import { createReducer } from "@reduxjs/toolkit";
import { REQUEST, CART_ACTION } from "../constants";

const initialState = {
  cartList: JSON.parse(localStorage.getItem("cartList")) || [],
};

const cartReducer = createReducer(initialState, {
  [REQUEST(CART_ACTION.ADD_TO_CART)]: (state, action) => {
    const { productId, optionId, quantity } = action.payload;
    let newCartList = [...state.cartList];

    if (optionId) {
      const existOptionIndex = state.cartList.findIndex(
        (item) => item.optionId === optionId
      );
      if (existOptionIndex !== -1) {
        newCartList.splice(existOptionIndex, 1, {
          ...state.cartList[existOptionIndex],
          quantity: state.cartList[existOptionIndex].quantity + quantity,
        });
      } else {
        newCartList = [action.payload, ...state.cartList];
      }
    } else {
      const existProductIndex = state.cartList.findIndex(
        (item) => item.productId === productId
      );
      if (existProductIndex !== -1) {
        newCartList.splice(existProductIndex, 1, {
          ...state.cartList[existProductIndex],
          quantity: state.cartList[existProductIndex].quantity + quantity,
        });
      } else {
        newCartList = [action.payload, ...state.cartList];
      }
    }

    localStorage.setItem("cartList", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: newCartList,
    };
  },

  // CHANGE QUANTITY

  [REQUEST(CART_ACTION.UPDATE_CART_ITEM)]: (state, action) => {
    const { productId, optionId, quantity } = action.payload;
    let newCartList = [...state.cartList];
    if (optionId) {
      const existOptionIndex = state.cartList.findIndex((item) => {
        return item.optionId === optionId;
      });
      if (existOptionIndex !== -1) {
        newCartList.splice(existOptionIndex, 1, {
          ...state.cartList[existOptionIndex],
          quantity,
        });
      }
    } else {
      const existProductIndex = state.cartList.findIndex((item) => {
        return item.productId === productId;
      });
      if (existProductIndex !== -1) {
        newCartList.splice(existProductIndex, 1, {
          ...state.cartList[existProductIndex],
          quantity,
        });
      }
    }
    localStorage.setItem("cartList", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: newCartList,
    };
  },

  [REQUEST(CART_ACTION.DELETE_CART_ITEM)]: (state, action) => {
    const { productId, optionId } = action.payload;
    let newCartList = [...state.cartList];
    if (optionId) {
      newCartList = state.cartList.filter((item) => item.optionId !== optionId);
    } else {
      newCartList = state.cartList.filter(
        (item) => item.productId !== productId
      );
    }
    localStorage.setItem("cartList", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: newCartList,
    };
  },

  // CLEAR

  [REQUEST(CART_ACTION.CLEAR_CART_LIST)]: (state, action) => {
    localStorage.removeItem("cartList");
    return {
      ...state,
      cartList: JSON.parse(localStorage.getItem("cartList")) || [],
    };
  },
});

export default cartReducer;
