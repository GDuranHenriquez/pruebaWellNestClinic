import axios from 'axios';

export const SET_USER = 'SET_USER';
export const UPDATE_PROFILE_PICTURE = 'UPDATE_PROFILE_PICTURE';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const PAY_MEMBERSHIP = 'PAY_MEMBERSHIP';
export const CANCEL_MEMBERSHIP = 'CANCEL_MEMBERSHIP';

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
