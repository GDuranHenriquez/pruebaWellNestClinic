/* eslint-disable no-unused-vars */
import {
  SET_USER, UPDATE_PROFILE_PICTURE, UPDATE_PASSWORD,
  PAY_MEMBERSHIP, CANCEL_MEMBERSHIP, GENERIC_ERROR,
  LOGIN_USERMEMBER, VERIFY_USERNAME, VERIFY_ISMEMBER,
  RESET_GENERIC_ERROR, RESET_IS_MEMBER, GET_USER_ID, ALL_SCHEDULE,
  DOCTOR_FILTERING, GET_SPECIALTIES, GET_DOCTORS, GET_ALL_PRODUCTS, GET_PRODUCT_BY_NAME, GET_PRODUCT_DETAIL,
} from '../action/type';

const initialState = {
  //useClient
  loginUsername: null,
  verifyIsMember: null,
  verifyUserName: null,
  genericError: null,

  user: null,
  profilePicture: [],
  password: '',
  membershipStatus: [],
  page: 1,

  filteredDoctors: [],
  schedule: [],

  doctors: [],
  specialities: [],
  //Products
  allProducts:[],
  detail: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, allProducts: action.payload}
    case GET_PRODUCT_BY_NAME:
      return {...state, allProducts: action.payload}
      case GET_PRODUCT_DETAIL:
        console.log("handling GET_PRODUCT_DETAIL action with payload", action.payload);
        return {...state, detail: action.payload}

    //userClient
    case VERIFY_ISMEMBER:
      return { ...state, verifyIsMember: action.payload }
    case GET_USER_ID:
      return { ...state, user: action.payload }
    //errors
    case RESET_GENERIC_ERROR:
      return { ...state, genericError: action.payload }

    case GENERIC_ERROR:
      return { ...state, genericError: action.payload }
    case RESET_IS_MEMBER:
      return { ...state, verifyIsMember: null }

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
        membershipStatus: 'Active',
      };
    case CANCEL_MEMBERSHIP:
      return {
        ...state,
        membershipStatus: 'Expired',
      };
    case DOCTOR_FILTERING:
      return {
        ...state,
        filteredDoctors: action.payload,
      }
    case ALL_SCHEDULE:
      return {
        ...state,
        schedule: action.payload
      }
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
    default:
      return state;
  }
};

export default userReducer;