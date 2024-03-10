const redux = require("redux");
const thunk = require("redux-thunk").default;
const axios = require("axios");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

const initialState = {
  loading: false,
  users: [],
  error: "",
};
function fetchUsersRequest() {
  return {
    type: FETCH_USERS_REQUESTED,
  };
}
function fetchUsersSuccess(users) {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  };
}
function fetchUsersFailure(error) {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_REQUESTED":
      return { ...state, loading: true };
    case "FETCH_USERS_SUCCEEDED":
      return { ...state, loading: false, users: action.payload, error: "" };
    case "FETCH_USERS_FAILED":
      return { ...state, loading: false, users: [], error: action.payload };
    default:
      return state;
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        //res.data is users
        const users = res.data.map((user) => user.id);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((err) => {
        //err.message is error
        dispatch(fetchUsersFailure(err.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());
