import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { icecreamActions } from "./icecreamSlice";
function IceCreamView() {
  const numberOfIceCreams = useSelector(
    (state) => state.icecream.numberOfIceCreams
  );
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Number of icecreams - {numberOfIceCreams} </h2>
      <button onClick={() => dispatch(icecreamActions.ordered())}>
        Order icecream
      </button>
      <button onClick={() => dispatch(icecreamActions.restocked(5))}>
        Restock icecreams
      </button>
    </div>
  );
}

export default IceCreamView;
