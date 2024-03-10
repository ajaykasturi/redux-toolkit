const redux = require("redux");

const createStore = redux.createStore;
const bindActionCreator = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

//action creator that returns action object
function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}
function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}
function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}
function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}
// (previousState, action) ⇒ newState

const initialCakeState = {
  numberOfCakes: 10,
};
const initialIceCreamState = {
  numberOfIceCreams: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case "CAKE_ORDERED":
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };
    case "CAKE_RESTOCKED":
      return {
        ...state,
        numberOfCakes: state.numberOfCakes + action.payload,
      };
    default:
      return state;
  }
};
const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case "ICECREAM_ORDERED":
      return {
        ...state,
        numberOfIceCreams: state.numberOfIceCreams - 1,
      };
    case "ICECREAM_RESTOCKED":
      return {
        ...state,
        numberOfIceCreams: state.numberOfIceCreams + action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));

console.log("initial state", store.getState());

const unsubscribe = store.subscribe(() => {});

const actions = bindActionCreator(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(4);

actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(3);
