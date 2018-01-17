import { Record } from "immutable";

const ArticleRecord = Record({
  id: null,
  name: null,
});

export default class Article extends ArticleRecord {}
