import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQ,
  PRODUCT_CREATE_SUC,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQ,
  PRODUCT_DELETE_SUC,
  PRODUCT_DETAILS_REQ,
  PRODUCT_DETAILS_SUC,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQ,
  PRODUCT_LIST_SUC,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQ,
  PRODUCT_UPDATE_SUCCESS,
} from "../constants/productConstant";
import axios from "axios";
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQ,
    });
    const { data } = await axios.get("/api/products");
    dispatch({
      type: PRODUCT_LIST_SUC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQ,
    });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQ,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/products/${id}`, config);
    dispatch({
      type: PRODUCT_DELETE_SUC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQ,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/products`, {}, config);
    dispatch({
      type: PRODUCT_CREATE_SUC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQ,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type":"application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/products/${product._id}`, product, config);
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
