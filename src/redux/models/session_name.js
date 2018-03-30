import { Record } from "immutable";

const SessionNameRecord = Record({
  id: null,
  name: null,
  isNewSession: false,
  noBidding: false,
});

export default class SessionName extends SessionNameRecord {
  get biddingable() {
    return !this.noBidding;
  }
}
