import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { submit } from "../libs/submit";
import "./ManageButtons.css";

class ManageButtons extends Component {
  onClick = () => {
    const { corrections } = this.props;
    const object = corrections.map(correction => correction.toObject()).toJS();
    console.log(object);

    submit(object);
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
});

export default connect(mapStateToProps)(ManageButtons);
