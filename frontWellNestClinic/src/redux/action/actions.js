import axios from "axios";

import {
  SET_USER,
  UPDATE_PROFILE_PICTURE,
  UPDATE_PASSWORD,
  PAY_MEMBERSHIP,
  CANCEL_MEMBERSHIP,
  LOGIN_USERMEMBER,
  VERIFY_USERNAME,
  VERIFY_ISMEMBER,
  GENERIC_ERROR,
  RESET_GENERIC_ERROR,
  RESET_IS_MEMBER,
  GET_USER_ID,
  DOCTOR_FILTERING,
  ALL_SCHEDULE,
  GET_DOCTORS,
  GET_SPECIALTIES,
  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_PAGE,
  ADD_TO_CART,
  CLEAR_CART,
  NOTHING,
  PAYMENT,
  UPLOAD_IMAGE_SUCCES,
  DEFAUL_STATE,
  GET_SALE
} from "./type.js";

export const verifyUsername = (userName) => {
  const endPoint =
    import.meta.env.VITE_BASENDPOINT_BACK +
    `/login-register/validateUser/?userName=${userName}`;
  return (dispatch) => {
    axios
      .get(endPoint)
      .then(({ data }) => {
        return dispatch({
          type: VERIFY_USERNAME,
          payload: data,
        });
      })
      .catch((error) => {
        var err = error.response;
        return dispatch({
          type: GENERIC_ERROR,
          payload: err.data.error,
        });
      });
  };
};

export const verifyIsMember = (ID, setIsLoading) => {
  const endPoint =
    import.meta.env.VITE_BASENDPOINT_BACK + `/login-register/isMember/${ID}`;
  return (dispatch) => {
    axios
      .get(endPoint)
      .then(({ data }) => {
        setIsLoading(false);
        return dispatch({
          type: VERIFY_ISMEMBER,
          payload: data,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        var err = error.response;
        if (err.status === 403) {
          setIsLoading(false);
          return dispatch({
            type: GENERIC_ERROR,
            payload: { ...err.data, status: err.status },
          });
        }
      });
  };
};

export const resetGenericError = () => {
  return {
    type: RESET_GENERIC_ERROR,
    payload: null,
  };
};

export const loginUser = (email, password, dni, token) => {
  return async function (dispatch) {
    const datos = {
      password: password,
      userName: email,
      dni: dni,
      token: token,
    };
    const endpoint =
      import.meta.env.VITE_BASENDPOINT_BACK + `/login-register/login`;

    try {
      const response = await axios.post(endpoint, datos);
      const apiResponse = response.data.user;

      dispatch({ type: LOGIN_USERMEMBER, payload: apiResponse });

      return response;

    } catch (error) {
      
      return error.response;
    }
  };
};

export const signUp = async (email, password, id, token) => {
  
  const endpoint =
    import.meta.env.VITE_BASENDPOINT_BACK + `/login-register/register`;
  try {
    const body = {
      email: email,
      password: password,
      id: id,
      token: token,
    };
    const response = await axios.post(endpoint, body, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const resetIsMember = () => ({
  type: RESET_IS_MEMBER,
  payload: null,
});

export const getUser = (id, token) => {
  
  const endPoint =
    import.meta.env.VITE_BASENDPOINT_BACK + `/userClient/?id=${id}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    axios
      .get(endPoint, config)
      .then(({ data }) => {
        return dispatch({
          type: GET_USER_ID,
          payload: data,
        });
      })
      .catch((error) => {
        var err = error.response;
        return dispatch({
          type: GENERIC_ERROR,
          payload: err.data.error,
        });
      });
  };
};

export const getUserTwo = (id, token) => {
  const endPoint =
    import.meta.env.VITE_BASENDPOINT_BACK + `/userClient/?id=${id}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return async (dispatch) => {
    axios
      .get(endPoint, config)
      .then(({ data }) => {
        return dispatch({
          type: GET_USER_ID,
          payload: data,
        });
      })
      .catch((error) => {
        var err = error.response;
        return dispatch({
          type: GENERIC_ERROR,
          payload: err.data.error,
        });
      });
  };
};

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const updateUserProfilePicture = (newProfilePicture) => ({
  type: UPDATE_PROFILE_PICTURE,
  payload: newProfilePicture,
});

export const updateUserPassword = (newPassword) => ({
  type: UPDATE_PASSWORD,
  payload: newPassword,
});

export const payMembership = () => ({
  type: PAY_MEMBERSHIP,
});

export const cancelMembership = () => ({
  type: CANCEL_MEMBERSHIP,
});

export const doctorFiltering = (dataSpeciality) => async (dispach) => {
  try {
    const refreshToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    };
    const { data } = await axios.get(
      import.meta.env.VITE_BASENDPOINT_BACK + "/doctor/",
      config
    );
    const filteredDoctors = data.filter((doctor) => {
      return doctor.specialities.some(
        (speciality) => speciality.name === dataSpeciality
      );
    });
    return dispach({
      type: DOCTOR_FILTERING,
      payload: filteredDoctors,
    });
  } catch (error) {
    return error.response;
  }
};

export const paymentProduct = (dataPayment) => async (dispach) => {
  try {
    const refreshToken = localStorage.getItem("token");
    const endPoint = import.meta.env.VITE_BASENDPOINT_BACK + "/sale";
    const config = {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    };
    const { data } = await axios.post(endPoint, dataPayment, config);
    return dispach({
      type: PAYMENT,
      payload: data,
    });
  } catch (error) {
    return error.response;
  }
};

export const allSchedule = (dataAppointment) => async (dispach) => {
  try {
    const refreshToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
    const { data } = await axios.post(
      import.meta.env.VITE_BASENDPOINT_BACK + "/appointment/doctor-schedule",
      dataAppointment, config
    );
    return dispach({
      type: ALL_SCHEDULE,
      payload: data,
    });
  } catch (error) {
    return error.response;
  }
};

export const getDoctors = () => {
  return async (dispatch) => {
    try {
      const refreshToken = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      };
      const response = await axios.get(
        import.meta.env.VITE_BASENDPOINT_BACK + "/doctor/",
        config
      );
      dispatch({
        type: GET_DOCTORS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
};

export const getSpecialties = () => async (dispach) => {
  try {
    const refreshToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
    const { data } = await axios.get(
      import.meta.env.VITE_BASENDPOINT_BACK + "/speciality",
      config
    );
    return dispach({
      type: GET_SPECIALTIES,
      payload: data,
    });
  } catch (error) {
    return error.response;
  }
};

export const getAllProducts = () => async (dispatch) => {
  try {
    const refreshToken = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      };
    const endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/product`;
    const { data } = await axios.get(endpoint, config);
    return dispatch({
      type: GET_ALL_PRODUCTS,
      payload: data,
    });
  } catch (error) {
    return error.response;
  }
};

export const getAllProductsByPage = (page, size) => async (dispatch) => {
  try {
    const refreshToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    };
    const endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/product`;
    const { data } = await axios.get(endpoint, config);
    const start = (page - 1) * size;
    let products = [];
    for (let i = start; i < start + size; i++) {
      if (data[i]) {
        products.push(data[i]);
      }
    }
    return dispatch({
      type: GET_ALL_PRODUCTS_PAGE,
      payload: products,
      size: data.length,
    });
  } catch (error) {
    return error.response;
  }
};

export const getProductsFilter =
  (presentationType, order, sort, name) => async (dispatch) => {
    try {
      const refreshToken = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      };
      let endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/product?`;
      if (presentationType) {
        endpoint = endpoint + `&presentation=${presentationType}`;
      }

      if (order) {
        endpoint = endpoint + `&order=${order}`;
      }

      if (sort) {
        endpoint = endpoint + `&sort=${sort}`;
      }

      if (name) {
        endpoint = endpoint + `&name=${name}`;
      }

      const { data } = await axios.get(endpoint, config);
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: data,
      });
    } catch (error) {
      return dispatch({
        type: GENERIC_ERROR,
        payload: error.response.data.error,
      });
    }
  };

export const createAppointment = (appointment) => async (dispatch) => {
  try {
    let endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/appointment`;
    const refreshToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    };
    const { data } = await axios.post(endpoint, appointment, config);
    return dispatch({
      type: NOTHING,
      payload: data,
    });
  } catch (error) {
    return error.response;
  }
};

export const getProductDetail = (productId) => {
  return async function (dispatch) {
    try {
      const refreshToken = localStorage.getItem("token");
      const endPoint = import.meta.env.VITE_BASENDPOINT_BACK + `/product/${productId}`;
      const config = {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      };
      const { data } = await axios.get(endPoint, config);
      return dispatch({
        type: "GET_PRODUCT_DETAIL",
        payload: data,
      });
    } catch (error) {
      return error.message;
    }
  };
};

export const addToCart = (product) => {
  return async (dispatch) => {
    try {
      const refreshToken = localStorage.getItem("token");
      const endPoint = import.meta.env.VITE_BASENDPOINT_BACK + "/cart/";
      const config = {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      };
      const response = await axios.post(endPoint, product, config);
      dispatch({
        type: ADD_TO_CART,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching doctors:", error.message);
    }
  };
};

export const uploadImage = (data) => {
  return async (dispatch) => {
    try {
      const refreshToken = localStorage.getItem("token");
      const endPoint = import.meta.env.VITE_BASENDPOINT_BACK + `/userClient/`;
      const config = {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      };
      const response = await axios.put(endPoint, data ,config);
      dispatch({
        type: UPLOAD_IMAGE_SUCCES,
        payload: response.data.imageUrl,
      });
      
    } catch (error) {
      dispatch({
        type: GENERIC_ERROR,
        payload: error.data.error
      });
    }
  };
};

export const getCart = (userId) => {
  return async (dispatch) => {
    try {
      const refreshToken = localStorage.getItem("token");
      const endPoint =
        import.meta.env.VITE_BASENDPOINT_BACK + `/cart/${userId}`;
      const config = {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      };
      const response = await axios.get(endPoint, config);
      dispatch({
        type: ADD_TO_CART,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error get cart:", error);
    }
  };
};

export const getSale = (userId) => {
  return async (dispatch) => {
    try {
      const refreshToken = localStorage.getItem("token");
      const endPoint =
        import.meta.env.VITE_BASENDPOINT_BACK + `/sale/${userId}`;
      const config = {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      };
      const response = await axios.get(endPoint, config);
      dispatch({
        type: GET_SALE,
        payload: response.data,
      });
      return response.data
    } catch (error) {
      return error.response
    }
  };
};

export const defaulState = (state) => ({
  type: DEFAUL_STATE,
  payload: state,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

