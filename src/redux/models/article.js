import { Record } from "immutable";

const ArticleRecord = Record({
  id: null,
  abstract: null,
  keywords: null,
  title: null,
  biddings: [],
});

export default class Article extends ArticleRecord {
  get name() {
    return this.title;
  }
}
