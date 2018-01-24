import React, { Component } from "react";
import { Modal, Icon, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import BiddingComponent from "./BiddingComponent";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { correctionActions } from "../redux/modules/correction";
import { List } from "immutable";

class ModalBiddingComponent extends Component {
  state = {
    open: false,
    biddings: this.props.biddings || this.props.article.biddings,
    pastBiddings: this.props.biddings || this.props.article.biddings,
  };

  onOpen = () => this.setState({ ...this.state, open: true });
  onClose = () => this.setState({ ...this.state, open: false });

  existsId = id => {
    const biddings = this.state.biddings;
    const ids = biddings.map(bidding => bidding.id);
    return ids.includes(id);
  };

  emptyId = id => {
    return !this.existsId(id);
  };

  existsRank = rank => {
    const biddings = this.state.biddings;
    const ranks = biddings.map(bidding => bidding.rank);
    return ranks.includes(rank);
  };

  emptyRank = rank => {
    return !this.existsRank(rank);
  };

  onMove = (bidding, to) => {
    // biddingは以下の形式のObjectが期待される
    // bidding = {
    //   id: "s11",
    //   rank: 1,
    // };
    const id = bidding.id;
    const rank = bidding.rank;
    const { biddings } = this.state;

    // (0) toが右側
    if (to === "labels") {
      console.log("(0)", rank, id);
      const nextBiddings = List(biddings)
        .filterNot(b => b.id === id)
        .toArray();
      return this.setState({
        ...this.state,
        biddings: nextBiddings,
      });
    }
    // (1) 空欄で同じセッションIDもない
    // => 追加
    if (this.emptyRank(rank) && this.emptyId(id)) {
      console.log("(1)", rank, id);
      const nextBiddings = List(biddings)
        .push(bidding)
        .toArray();
      return this.setState({
        ...this.state,
        biddings: nextBiddings,
      });
    }
    // (2) 空欄だがセッションIDはある
    // => 移動
    if (this.emptyRank(rank) && this.existsId(id)) {
      console.log("(2)", rank, id, List(biddings).findIndex(b => b.id === id));
      const nextBiddings = List(biddings)
        .update(List(biddings).findIndex(b => b.id === id), b => ({
          id: b.id,
          rank: rank,
        }))
        .toArray();
      return this.setState({
        ...this.state,
        biddings: nextBiddings,
      });
    }
    // (3) 既に入っているがセッションIDはない
    // => ラベルとの入れ替え
    if (this.existsRank(rank) && this.emptyId(id)) {
      console.log("(3)", rank, id);
      const nextBiddings = List(biddings)
        .update(List(biddings).findIndex(b => b.rank === rank), b => ({
          id: id,
          rank: b.rank,
        }))
        .toArray();
      return this.setState({
        ...this.state,
        biddings: nextBiddings,
      });
    }
    // (4) 既に入っていてセッションIDもある
    // => ランクの入れ替え
    if (this.existsRank(rank) && this.existsId(id)) {
      console.log("(4)", rank, id);
      const newer = List(biddings).find(b => b.id === id);
      const already = List(biddings).find(b => b.rank === rank);
      const nextBiddings = List(biddings)
        .update(List(biddings).findIndex(b => b.id === newer.id), b => ({
          id: b.id,
          rank: rank,
        }))
        .update(List(biddings).findIndex(b => b.id === already.id), b => ({
          id: b.id,
          rank: newer.rank,
        }))
        .toArray();
      return this.setState({
        ...this.state,
        biddings: nextBiddings,
      });
    }
  };

  onSave = () => {
    // TODO
    const articleId = this.props.article.id;
    const biddings = this.state.biddings;

    console.log("save", articleId, biddings);

    this.setState({ ...this.state, pastBiddings: this.state.biddings, open: false });
    this.props.addBidding({
      article: articleId,
      bidding: biddings,
    });
  };

  onCancel = () => {
    // TODO
    this.setState({ ...this.state, biddings: this.state.pastBiddings, open: false });
  };

  showBiddingModal = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  render() {
    const { open, biddings } = this.state;
    return (
      <Modal
        className="bidding modal"
        dimmer={true}
        closeOnDimmerClick={false}
        open={open}
        onOpen={this.onOpen}
        onClose={this.onClose}
        trigger={<Icon className="trigger-button" onClick={this.showBiddingModal} name="arrow right" size="large" />}
      >
        <Modal.Header>投票のセッション希望の修正</Modal.Header>
        <Modal.Content scrolling>
          <BiddingComponent biddings={biddings} article={this.props.article} onMove={this.onMove} />
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={this.onCancel}>
            キャンセル
          </Button>
          <Button positive icon="checkmark" labelPosition="right" content="回答する" onClick={this.onSave} />
        </Modal.Actions>
      </Modal>
    );
  }
}

ModalBiddingComponent.propTypes = {
  article: PropTypes.object,
  biddings: PropTypes.object,
};

const mapStateToProps = (state, props) => {
  return {
    biddings: state.correction.biddings.find(b => b.article === props.article.id),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(correctionActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBiddingComponent);
