import { SET_USER, UPDATE_PROFILE_PICTURE, UPDATE_PASSWORD, PAY_MEMBERSHIP, CANCEL_MEMBERSHIP } from './actions'; 

const initialState = {
  user: null,
  profilePicture: [], 
  password: '', 
  membershipStatus: [],
  page:1,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
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
    default:
      return state;
  }
};

export default userReducer;