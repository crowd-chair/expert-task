import { createStore, combineReducers } from "redux";
import { reducers } from "./reducers";

export default function myStore() {
  const store = createStore(
    combineReducers({
      ...reducers,
    })
  );
  return store;
}
