import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQ,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_REQ,
  ORDER_DETAILS_SUCCESS,
  ORDER_MY_ORDERS_LIST_FAIL,
  ORDER_MY_ORDERS_LIST_REQ,
  ORDER_MY_ORDERS_LIST_RESET,
  ORDER_MY_ORDERS_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQ,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants.js";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQ:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getOrderDetailsReducer = (
  state = { loading: true, order: { orderItems: [] }, shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQ:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQ:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_MY_ORDERS_LIST_REQ:
      return {
        ...state,
        loading: true,
      };
    case ORDER_MY_ORDERS_LIST_SUCCESS:
      return {
        ...state,

        loading: false,
        orders: action.payload,
      };
    case ORDER_MY_ORDERS_LIST_FAIL:
      return {
        ...state,

        loading: false,
        error: action.payload,
      };
    case ORDER_MY_ORDERS_LIST_RESET:
      return {
        orders: [],
      };
    default:
      return state;
  }
};
