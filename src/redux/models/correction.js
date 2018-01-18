import { Record } from "immutable";
import SessionName from "./session_name";
import Article from "./article";

const CorrectionRecord = Record({
  sessionName: new SessionName(),
  article: new Article(),
  group: 0,
  noMatching: false,
});

export default class Correction extends CorrectionRecord {
  toObject = () => ({
    sessionName: this.sessionName.id,
    article: this.article.id,
    group: this.group,
    noMatching: this.noMatching,
  });
}
