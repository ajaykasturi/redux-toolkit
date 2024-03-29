const redux = require("redux");
const produce = require("immer").produce;
const createStore = redux.createStore;
const initialState = {
  name: "Ajay",
  address: {
    street: "123 Main Street",
    city: "Los Angles",
    state: "MA",
  },
};

const STREET_UPDATED = "STREET_UPDATED";
const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "STREET_UPDATED":
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload,
      //     },
      //   };
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log("Initial State: ", store.getState());
const unsubscribe = store.subscribe(() => {
  console.log("updated state: ", store.getState());
});
store.dispatch(updateStreet("345 Main Street"));

unsubscribe();
