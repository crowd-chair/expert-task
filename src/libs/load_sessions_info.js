import sessionData from "../data/sessions.json";
import articleData from "../data/articles.json";
import sessionNameData from "../data/sessionNames.json";
import { List } from "immutable";
import { Article, SessionName, Session } from "../redux/models";

const tag = sessionData.tag;

const articles = List(
  articleData.articles.map(data => {
    return new Article(data);
  })
);

const sessionNames = List(
  sessionNameData.sessionNames.map(data => {
    return new SessionName(data);
  })
);

const sessions = List(
  sessionData.sessions.map(data => {
    const sessionName = sessionNames.find(sessionName => sessionName.id === data.session_name);
    const articleGroup = new List(
      data.articles.map(articleId => {
        return articles.find(article => article.id === articleId);
      })
    );
    const count = data.count;
    return new Session({
      sessionName: sessionName,
      articles: articleGroup,
      count: count,
    });
  })
);

console.log(articles);

export { tag, articles, sessionNames, sessions };
