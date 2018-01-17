import { Record, List } from "immutable";
import SessionName from "./session_name";
import Article from "./article";

const SessionRecord = Record({
  id: null,
  sessionName: new SessionName(),
  articles: List(),
  count: 1,
});

export default class Session extends SessionRecord {}
