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
          専門家からのフィードバックタスク
        </Header>
        <Segment attached color="red">
          <p>
            DEIM2018のセッションをより良くするための修正タスクになります． <br />
            このページではセッションタイトルの一覧があり，クリックすると，そこで発表されるかもしれない論文の一覧が表示されます．
          </p>

          <p>
            それを見て．ご自身の専門に近いセッションを2個選択し，次の2つの作業を行っていただきます．（3個以上でも構いません）
          </p>
          <p>
            作業1. セッションタイトルに対して，明らかにおかしいタイトルの論文の×を押してください．<br />
          </p>
          <div className="explain not-matching-paper">
            <Image src={`${path}/01.png`} fluid />
            <p>注意事項</p>
            <ul>
              <li>
                発表できないことは無いけど，よりふさわしいセッション名がある，という場合は×を押さず残しておいてください．
              </li>
              <li>この作業の時に，同一セッションの他の論文との相対的な関係を考慮する必要はありません．</li>
              <li>もう一度×を押すと取り消すことができます．</li>
            </ul>
          </div>

          <p>
            作業2. セッション内の論文のうち，特に関係が深いと思われる複数の論文があれば， <br />
            論文タイトルをクリックし，それらに同じ色をつけてグループ化してください．
          </p>
          <div className="explain grouing">
            <p>例: 左から順に，グループがない場合，グループが1つある場合，グループが2つある場合</p>
            <Image src={`${path}/03.png`} fluid />
            <p>注意事項</p>
            <ul>
              <li>
                論文タイトルをクリックすると，色が変わります．グループを表す色は全部で3色（オレンジ，黄，緑）あります．
              </li>
              <li>全部の論文に色を付ける必要はありません．</li>
              <li>3色すべて使う必要はありません．</li>
            </ul>
          </div>

          <p>タスク終了時は，右下の「回答する」ボタンで回答を行ってください．</p>
        </Segment>
      </div>
    );
  }
}

export default QuestionComponent;
