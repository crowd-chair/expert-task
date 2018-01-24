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
  render() {
    const { article, biddings } = this.props;
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
                  <BiddingSessionPools biddings={biddings} onMove={this.props.onMove} />
                </div>

                <div className="ten wide column">
                  <h3 className="ui dividing header">セッションリスト</h3>
                  <BiddingSessionLabels biddings={biddings} onMove={this.props.onMove} />
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
  biddings: PropTypes.array,
  onMove: PropTypes.func,
};

export default BiddingComponent;
