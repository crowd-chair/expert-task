import { createAction, handleActions } from "redux-actions";
import { List } from "immutable";

const actions = {
  addCorrection: createAction("ADD_CORRECTION"),
  addBidding: createAction("ADD_BIDDING"),
};

export const correctionActions = actions;

const initialState = {
  corrections: List(),
  biddings: List(),
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
    [actions.addBidding]: (state, action) => {
      const { article, bidding } = action.payload;
      const index = state.biddings.findIndex(b => b.article === article);
      if (index === -1) {
        // Not Found
        return {
          ...state,
          biddings: state.biddings.push({
            article: article,
            bidding: bidding,
          }),
        };
      }
      const biddings = state.biddings.update(index, b => ({
        article: b.article,
        bidding: bidding,
      }));
      return {
        ...state,
        biddings: biddings,
      };
    },
  },
  initialState
);
