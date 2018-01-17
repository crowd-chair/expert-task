import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { correctionActions } from "../redux/modules/correction";
import { Correction } from "../redux/models";
import { Label, Icon } from "semantic-ui-react";
import "./ArticleItem.css";

class ArticleItem extends Component {
  state = {
    sessionName: null,
    article: null,
    groupSizeMax: 3,
    group: 0,
    noMatching: false,
  };

  componentWillMount() {
    const { sessionName, article } = this.props;
    this.setState({
      ...this.state,
      sessionName: sessionName,
      article: article,
    });
  }

  getColors = index => {
    const colorMaps = [
      null,
      "orange",
      "yellow",
      "olive",
      "green",
      "teal",
      "blue",
      "red",
      "violet",
      "purple",
      "pink",
      "brown",
      "grey",
      "black",
    ];
    return colorMaps[index];
  };

  addOrUpdateCorrection = () => {
    const correction = new Correction(this.state);
    this.props.addCorrection({ correction });
  };

  clickTags = e => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.noMatching) {
      return;
    }
    let nextColorIndex = this.state.group + 1;
    if (nextColorIndex === this.state.groupSizeMax + 1) {
      nextColorIndex = 0;
    }
    this.setState({
      ...this.state,
      group: nextColorIndex,
    });
    this.addOrUpdateCorrection();
  };

  toggleNoMatching = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      ...this.state,
      group: 0,
      noMatching: !this.state.noMatching,
    });
    this.addOrUpdateCorrection();
  };

  render() {
    const { article, group, noMatching } = this.state;
    const decorationLabel = noMatching ? { textDecoration: "line-through" } : [];
    return (
      <div className="article-label">
        <Label
          className="inner-article-label"
          color={this.getColors(group)}
          onClick={this.clickTags}
          style={decorationLabel}
        >
          {article.name}
          <Icon className="cancel-button" onClick={this.toggleNoMatching} name="delete" size="small" />
        </Label>
      </div>
    );
  }
}

ArticleItem.propTypes = {
  sessionName: PropTypes.opject,
  article: PropTypes.object,
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(correctionActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(ArticleItem);
