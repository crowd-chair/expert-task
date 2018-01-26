import React, { Component } from "react";
import PropTypes from "prop-types";
import ArticleItem from "./ArticleItem";
import { Header, Segment, Icon } from "semantic-ui-react";
import "./ArticleList.css";

class ArticleList extends Component {
  state = {
    showArticles: true,
  };

  toggle = () => {
    this.setState({
      showArticles: !this.state.showArticles,
    });
  };

  render() {
    const { sessionName, articles } = this.props;
    const displayState = this.state.showArticles ? {} : { display: "none" };
    const showIconName = this.state.showArticles ? "chevron down" : "chevron right";
    return (
      <div className="article-list">
        <div>
          <Header as="h4" attached="top" onClick={this.toggle}>
            <Icon name={showIconName} size="mini" /> {`${sessionName.name}  (${articles.size})`}
          </Header>
          <Segment attached style={displayState}>
            <div className="article-label-wrapper">
              {articles.map(article => (
                <ArticleItem key={`ArticleItem-${article.id}`} sessionName={sessionName} article={article} />
              ))}
            </div>
          </Segment>
        </div>
      </div>
    );
  }
}

ArticleList.propTypes = {
  sessionName: PropTypes.opject,
  articles: PropTypes.object,
};

export default ArticleList;
