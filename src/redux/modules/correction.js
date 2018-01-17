import { createAction, handleActions } from "redux-actions";
import { List } from "immutable";

const actions = {
  addCorrection: createAction("ADD_CORRECTION"),
};

export const correctionActions = actions;

const initialState = {
  corrections: List(),
};

export default handleActions(
  {
    [actions.addCorrection]: (state, action) => {
      const { correction } = action.payload;
      const index = state.corrections.findIndex(
        c => c.article === correction.article && c.sessionName === correction.sessionName
      );
      if (index === -1) {
        // Not Found
        return {
          ...state,
          corrections: state.corrections.push(correction),
        };
      }
      const corrections = state.corrections.update(index, oldCorrection => correction);
      return {
        ...state,
        corrections: corrections,
      };
    },
  },
  initialState
);
