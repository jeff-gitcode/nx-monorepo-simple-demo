// action types
export enum ActionsTypes {
  // user list actions
  getUserList = 'GET_USER_LIST',
  getUserListSuccess = 'GET_USER_LIST_SUCCESS',
  getUserListFailure = 'GET_USER_LIST_FAILURE',

  // user CRUD actions
  createUser = 'CREATE_USER',
  createUserSuccess = 'CREATE_USER_SUCCESS',
  createUserFailure = 'CREATE_USER_FAILURE',

  updateUser = 'UPDATE_USER',
  updateUserSuccess = 'UPDATE_USER_SUCCESS',
  updateUserFailure = 'UPDATE_USER_FAILURE',

  deleteUser = 'DELETE_USER',
  deleteUserSuccess = 'DELETE_USER_SUCCESS',
  deleteUserFailure = 'DELETE_USER_FAILURE',

  //form actions
  fetchForm = 'FETCH_FORM',
  fetchFormSuccess = 'FETCH_FORM_SUCCESS',
  fetchFormFailure = 'FETCH_FORM_FAILURE',

  // alert actions
  initial = 'INITIAL',
  initialSuccess = 'INITIAL_SUCCESS',
  initialFailure = 'INITIAL_FAILURE',

  subscribe = 'SUBSCRIBE',
  subscribeSuccess = 'SUBSCRIBE_SUCCESS',
  subscribeFailure = 'SUBSCRIBE_FAILURE',

  clearMessage = 'CLEAR_MESSAGE',
  clearMessageSuccess = 'CLEAR_MESSAGE_SUCCESS',
  clearMessageFailure = 'CLEAR_MESSAGE_FAILURE',

  sendMessage = 'SEND_MESSAGE',
  sendMessageSuccess = 'SEND_MESSAGE_SUCCESS',
  sendMessageFailure = 'SEND_MESSAGE_FAILURE',

  // auth
  signUp = 'SING_UP',
  signUpSuccess = 'SING_UP_SUCCESS',
  signUpFailure = 'SING_UP_FAILURE',

  login = 'LOGIN',
  loginSuccess = 'LOGIN_SUCCESS',
  loginFailure = 'LOGIN_FAILURE',

  logout = 'LOGOUT',
  logoutSuccess = 'LOGOUT_SUCCESS',
  logoutFailure = 'LOGOUT_FAILURE',

  refresh = 'REFRESH',
  refreshSuccess = 'REFRESH_SUCCESS',
  refreshFailure = 'REFRESH_FAILURE',
}
