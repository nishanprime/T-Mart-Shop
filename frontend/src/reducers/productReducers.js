import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQ,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUC,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQ,
  PRODUCT_DELETE_SUC,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQ,
  PRODUCT_DETAILS_SUC,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQ,
  PRODUCT_LIST_SUC,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQ,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
} from "../constants/productConstant.js";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQ:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUC:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQ:
      return { loading: true, product: {} };
    case PRODUCT_DETAILS_SUC:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQ:
      return { loading: true };
    case PRODUCT_DELETE_SUC:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQ:
      return { loading: true };
    case PRODUCT_CREATE_SUC:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQ:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: [] };
    default:
      return state;
  }
};
