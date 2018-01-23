import React, { Component } from "react";
import PropTypes from "prop-types";
import "./BiddingComponent.css";
import "../libs/dnd_event";
import BiddingSessionPools from "./BiddingSessionPools";
import BiddingSessionLabels from "./BiddingSessionLabels";
import { DragDropContext } from "react-dnd";
import ReactDnDHTML5Backend from "react-dnd-html5-backend";
import { List } from "immutable";

@DragDropContext(ReactDnDHTML5Backend)
class BiddingComponent extends Component {
  state = {
    articleId: this.props.article.id,
    biddings: this.props.article.biddings,
  };

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

  render() {
    const { article } = this.props;
    const { biddings } = this.state;
    return (
      <div className="bidding task page">
        <div className="ui container main">
          <div className="question header">
            <p>以下の投稿内容を読み、設問に答えてください</p>
          </div>
          <div className="ui segment">
            <div className="ui top attached label">投稿内容</div>
            <div className="content">
              <table className="ui table">
                <tbody>
                  <tr>
                    <td className="collapsing">タイトル</td>
                    <td>{article.title}</td>
                  </tr>
                  <tr>
                    <td className="collapsing">概要</td>
                    <td>{article.abstract}</td>
                  </tr>
                  <tr>
                    <td className="collapsing">キーワード</td>
                    <td>{article.keywords}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <section className="question">
            <div className="question header">
              <p>
                セッションリストの中から発表投稿に関連するセッションを、関連度の高いものから順に
                ドラッグ&ドロップで入れてください。 <br />
                <b>
                  できるだけ全ての欄にセッションを入れてください．どうしても入れられない場合のみ空欄にしてください．
                  タスクが終了した場合「回答する」を押してください．
                </b>
              </p>
            </div>
            <div className="sessions section">
              <div className="ui stackable grid">
                <div id="related-session-pool" className="six wide column">
                  <h3 className="ui dividing header">発表論文に関連するセッション</h3>
                  <BiddingSessionPools biddings={biddings} onMove={this.onMove} />
                </div>

                <div className="ten wide column">
                  <h3 className="ui dividing header">セッションリスト</h3>
                  <BiddingSessionLabels biddings={biddings} onMove={this.onMove} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

BiddingComponent.propTypes = {
  article: PropTypes.object,
};

export default BiddingComponent;
