import React, { Component } from "react";
import PropTypes from "prop-types";
import ArticleList from "./ArticleList";
import { Grid } from "semantic-ui-react";
import withSizes from "react-sizes";

class SessionNameList extends Component {
  calcColumns = width => {
    if (width < 700) {
      return 1;
    }
    return Math.ceil(this.props.width / 500);
  };

  render() {
    const sessionNames = this.props.sessionNames;
    const sessions = this.props.sessions;

    const columns = this.calcColumns(this.props.width);
    return (
      <div className="base">
        <Grid columns={columns}>
          {sessionNames
            .filter(sessionName => {
              const articles = sessions
                .filter(session => session.sessionName === sessionName)
                .map(session => session.articles)
                .flatten(true);
              return articles.size !== 0;
            })
            .map(sessionName => {
              const articles = sessions
                .filter(session => session.sessionName === sessionName)
                .map(session => session.articles)
                .flatten(true);
              return (
                <Grid.Column key={`ArticleList-${sessionName.id}`}>
                  <ArticleList sessionName={sessionName} articles={articles} />
                </Grid.Column>
              );
            })}
        </Grid>
      </div>
    );
  }
}

SessionNameList.propTypes = {
  sessions: PropTypes.object,
  sessionNames: PropTypes.object,
};

const mapSizesToProps = ({ width }) => ({
  width: width,
});

export default withSizes(mapSizesToProps)(SessionNameList);
