/* eslint-disable no-unused-vars */
import {
  SET_USER,
  UPDATE_PROFILE_PICTURE,
  UPDATE_PASSWORD,
  PAY_MEMBERSHIP,
  CANCEL_MEMBERSHIP,
  GENERIC_ERROR,
  LOGIN_USERMEMBER,
  DEFAUL_STATE,
  VERIFY_ISMEMBER,
  RESET_GENERIC_ERROR,
  RESET_IS_MEMBER,
  GET_USER_ID,
  ALL_SCHEDULE,
  GET_SPECIALTIES,
  GET_DOCTORS,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_NAME,
  GET_PRODUCT_DETAIL,
  GET_ALL_PRODUCTS_PAGE,
  DOCTOR_FILTERING,
  ADD_TO_CART,
  GET_CART_USER,
  UPLOAD_IMAGE_SUCCES,
} from "../action/type";

const initialState = {
  //useClient
  loginUsername: null,
  verifyIsMember: null,
  verifyUserName: null,
  genericError: null,

  user: null,
  profilePicture: [],
  password: "",
  membershipStatus: [],
  page: 1,

  filteredDoctors: [],
  schedule: [],

  doctors: [],
  specialities: [],
  //Products
  allProducts: [],
  detail: {},

  totalProducts: 0,
  //shoppingCart
  cartItems: {},
  selectedItems: [],
  totalPrice: 0,
  idProductsCart: [],
  imageUrl: null,
};

const userReducer = (state = initialState, action) => {
  let updatedCartItemsAdd, updatedCartItemsRemove;
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
        totalProducts: action.payload.length,
      };
    case GET_ALL_PRODUCTS_PAGE:
      return {
        ...state,
        allProducts: action.payload,
        totalProducts: action.size,
      };
    case GET_PRODUCT_BY_NAME:
      return { ...state, allProducts: action.payload };
    case GET_PRODUCT_DETAIL:
      console.log(
        "handling GET_PRODUCT_DETAIL action with payload",
        action.payload
      );
      return { ...state, detail: action.payload };

    //userClient
    case VERIFY_ISMEMBER:
      return { ...state, verifyIsMember: action.payload };
    case GET_USER_ID:
      return { ...state, user: action.payload };
    //errors
    case RESET_GENERIC_ERROR:
      return { ...state, genericError: action.payload };

    case GENERIC_ERROR:
      return { ...state, genericError: action.payload };
    case RESET_IS_MEMBER:
      return { ...state, verifyIsMember: null };

    /* case SET_USER:
      return {
        ...state,
        user: action.payload,
      }; */
    case UPDATE_PROFILE_PICTURE:
      return {
        ...state,
        profilePicture: action.payload,
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case PAY_MEMBERSHIP:
      return {
        ...state,
        membershipStatus: "Active",
      };
    case CANCEL_MEMBERSHIP:
      return {
        ...state,
        membershipStatus: "Expired",
      };
    case DOCTOR_FILTERING:
      return {
        ...state,
        filteredDoctors: action.payload,
      };
    case ALL_SCHEDULE:
      return {
        ...state,
        schedule: action.payload,
      };
    case GET_DOCTORS:
      return {
        ...state,
        doctors: action.payload,
      };
    case GET_SPECIALTIES:
      return {
        ...state,
        specialities: action.payload,
      };
    case UPLOAD_IMAGE_SUCCES:
      return {
        ...state,
        imageUrl: action.payload,
      };
    case ADD_TO_CART:
      var data = action.payload;
      var productsInCart = [];
      if (Object.keys(data.cart).includes('products')) {
        data.cart.products.forEach((prod) => {
          const cartProduct = {
            id: prod.id,
            amount: prod.cart_product.amount,
          };
          productsInCart.push(cartProduct);
        });
      }else{
        productsInCart = [];
      }

      // Agregar un producto al carrito

      return { ...state, cartItems: data, idProductsCart: productsInCart };

    case DEFAUL_STATE:
      return { ...action.payload }
    default:
      return { ...state };
  }
};

export default userReducer;
