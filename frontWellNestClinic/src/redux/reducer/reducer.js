import { SET_USER, UPDATE_PROFILE_PICTURE, UPDATE_PASSWORD, 
  PAY_MEMBERSHIP, CANCEL_MEMBERSHIP, GENERIC_ERROR,
  LOGIN_USERMEMBER,  VERIFY_USERNAME,  VERIFY_ISMEMBER, RESET_GENERIC_ERROR, RESET_IS_MEMBER,GET_USER_ID } from '../action/type'; 

const initialState = {
  //useClient
  loginUsername:null,
  verifyIsMember: null,
  verifyUserName: null,
  genericError: null,

  user: null,
  profilePicture: [], 
  password: '', 
  membershipStatus: [],
  page:1  
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    //userClient
    case VERIFY_ISMEMBER:
      return {...state, verifyIsMember: action.payload }
    case GET_USER_ID:
      return { ...state, user: action.payload }
    //errors
    case RESET_GENERIC_ERROR:
      return {...state, genericError: action.payload }
    
    case GENERIC_ERROR:
      return {...state, genericError: action.payload  }
    case RESET_IS_MEMBER:
      return { ...state, verifyIsMember : null }

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
    default:
      return state;
  }
};

export default userReducer;