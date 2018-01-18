import React, { Component } from "react";
import { Segment, Header, Image } from "semantic-ui-react";
// [NOTE] Using imgs from oahu server
// import img_01 from "../assets/01.png";
// import img_02 from "../assets/02.png";
// import img_03 from "../assets/03.png";
import s from "./QuestionComponent.css";

const path = "https://oahu.slis.tsukuba.ac.jp/nkobayashi/feedback/assets";

class QuestionComponent extends Component {
  render() {
    return (
      <div>
        <Header as="h2" attached="top">
          セッション修正タスク
        </Header>
        <Segment attached color="red">
          <p>DEIM2018のセッションをより良くするための修正タスクになります．</p>
          <p>以下の作業を行っていただきます．</p>
          <p>(1) 各セッション内で発表が適していない論文の選択</p>
          <div className="explain not-matching-paper">
            <Image src={`${path}/01.png`} fluid />
            <p>
              論文タイトルラベルの☓ボタンをクリックするとで打ち消し線が表示されます．<br />
              この状態は，枠内のセッションでその論文が適していないことを表しています．
            </p>
          </div>
          <p>(2) 各セッション内で論文のグルーピング</p>
          <div className="explain grouing">
            <Image src={`${path}/02.png`} fluid />
            <p>論文タイトルラベルをクリックするとラベルの色を変更できます．</p>
          </div>
          <div className="explain grouing">
            <Image src={`${path}/03.png`} fluid />
            <p>
              セッション内の論文で色を揃えることでグルーピングを行います．<br />
              色は全部で3色あります（オレンジ,　黄色，オリーブ）． <br />
              デフォルトの色ではグルーピングは行われません．
            </p>
          </div>
          <p>
            <strong>※全てのセッションでタスクを行う必要はありません．</strong>
            タスク終了時は，右下の「回答する」ボタンで回答を行ってください．
          </p>
        </Segment>
      </div>
    );
  }
}

export default QuestionComponent;
