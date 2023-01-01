export enum ActionTypes {
  // user list actions
  getUserList = 'GET_USER_LIST',
  getUserListSuccess = 'GET_USER_LIST_SUCCESS',
  getUserListFailure = 'GET_USER_LIST_FAILURE',

  // user CRUD actions
  getUser = 'GET_USER',
  getUserSuccess = 'GET_USER_SUCCESS',
  getUserFailure = 'GET_USER_FAILURE',

  createUser = 'CREATE_USER',
  createUserSuccess = 'CREATE_USER_SUCCESS',
  createUserFailure = 'CREATE_USER_FAILURE',

  updateUser = 'UPDATE_USER',
  updateUserSuccess = 'UPDATE_USER_SUCCESS',
  updateUserFailure = 'UPDATE_USER_FAILURE',

  deleteUser = 'DELETE_USER',
  deleteUserSuccess = 'DELETE_USER_SUCCESS',
  deleteUserFailure = 'DELETE_USER_FAILURE',

  // json form actions
  getJsonForm = 'GET_JSON_FORM',
  getJsonFormSuccess = 'GET_JSON_FORM_SUCCESS',
  getJsonFormFailure = 'GET_JSON_FORM_FAILURE',

  // auth actions
  login = 'LOGIN',
  loginSuccess = 'LOGIN_SUCCESS',
  loginFailure = 'LOGIN_FAILURE',

  signup = 'SIGN_UP',
  signupSuccess = 'SIGN_UP_SUCCESS',
  signupFailure = 'SIGN_UP_FAILURE',

  refresh = 'REFRESH',
  refreshSuccess = 'REFRESH_SUCCESS',
  refreshFailure = 'REFRESH_FAILURE',

  logout = 'LOGOUT',
  logoutSuccess = 'LOGOUT_SUCCESS',
  logoutFailure = 'LOGOUT_FAILURE',
}
