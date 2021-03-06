import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { correctionActions } from "../redux/modules/correction";
import { Correction } from "../redux/models";
import { Label, Icon } from "semantic-ui-react";
import "./ArticleItem.css";
import ModalBiddingComponent from "./ModalBiddingComponent";

class ArticleItem extends Component {
  state = {
    sessionName: null,
    article: null,
    groupSizeMax: 3,
    group: 0,
    noMatching: false,
    bidding: false,
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
    if (index < 0) {
      return "grey";
    }
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

  addOrUpdateCorrection = state => {
    const correction = new Correction(state);
    this.props.addCorrection({ correction });
  };

  clickTags = e => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.noMatching) {
      return;
    }
    if (this.state.bidding) {
      return;
    }
    let nextColorIndex = this.state.group + 1;
    if (nextColorIndex === this.state.groupSizeMax + 1) {
      nextColorIndex = 0;
    }
    const nextState = {
      ...this.state,
      group: nextColorIndex,
    };
    this.addOrUpdateCorrection(nextState);
    this.setState(nextState);
  };

  toggleNoMatching = e => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = {
      ...this.state,
      group: 0,
      noMatching: !this.state.noMatching,
    };
    this.addOrUpdateCorrection(nextState);
    this.setState(nextState);
  };

  onBidding = () => {
    const nextState = {
      ...this.state,
      group: -1,
      bidding: true,
    };
    this.addOrUpdateCorrection(nextState);
    this.setState(nextState);
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
          <ModalBiddingComponent article={article} onSaveForGroup={this.onBidding} />
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
