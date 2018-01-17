import sessionData from "../sessions.json";
import { List } from "immutable";
import { Article, SessionName, Session } from "../redux/models";

const articles = List(
  sessionData.articles.map(data => {
    return new Article({
      id: data.id,
      name: data.name,
    });
  })
);

const sessionNames = List(
  sessionData.session_names.map(data => {
    return new SessionName({
      id: data.id,
      name: data.name,
    });
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

export { articles, sessionNames, sessions };
