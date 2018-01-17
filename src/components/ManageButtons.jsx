import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import $ from "jquery";
import "./ManageButtons.css";

class ManageButtons extends Component {
  onClick = () => {
    console.log(this.props.corrections);
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
