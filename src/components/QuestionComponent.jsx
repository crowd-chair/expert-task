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
          専門家からのセッション案改善タスク
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
            作業1.
            セッションタイトルに対して，よりふさわしいセッション名がある場合，論文の→を押して，論文のセッションの希望調査の修正を行ってください．このタスクはポップアップにより表示されます．
          </p>
          <div className="explain not-matching-paper">
            <Image src={`${path}/04.png`} fluid />
            <p>注意事項</p>
            <ul>
              <li>「保存する」ボタンを押すことで内容の保存ができます．</li>
              <li>キャンセルを押すことで→ボタンを押す前の状態に戻ります．</li>
              <li>希望調査は同じ論文に対して何回もやり直すことができます．</li>
            </ul>
          </div>

          <p>
            作業2.
            セッション内の論文のうち，関係が深いと思われる複数の論文があれば，論文タイトルをクリックし，それらに同じ色をつけてグループ化してください．
          </p>
          <div className="explain grouing">
            <p>例: 左から順に，グループがない場合，グループが1つある場合，グループが2つある場合</p>
            <Image src={`${path}/05.png`} fluid />
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
