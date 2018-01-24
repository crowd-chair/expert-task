import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { submit } from "../libs/submit";
import "./ManageButtons.css";

class ManageButtons extends Component {
  onClick = () => {
    const { corrections, biddings } = this.props;
    const correctionsJS = corrections.map(correction => correction.toObject()).toJS();
    const biddingsJS = biddings.toArray();

    submit({
      corrections: correctionsJS,
      biddings: biddingsJS,
    });
  };

  render() {
    return (
      <div className="manage-buttons">
        <Button primary onClick={this.onClick}>
          <Icon name="check" /> 回答する
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  corrections: state.correction.corrections,
  biddings: state.correction.biddings,
});

export default connect(mapStateToProps)(ManageButtons);
