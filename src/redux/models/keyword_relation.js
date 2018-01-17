import { Record } from "immutable";
import Keyword from "./keyword";
import Article from "./article";

const KeywordRelationRecord = Record({
  id: null,
  keyword: new Keyword(),
  article: new Article(),
  weight: 0.0,
});

export default class KeywordRelation extends KeywordRelationRecord {}
