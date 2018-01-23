import React, { Component } from "react";
import { Modal, Icon, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import BiddingComponent from "./BiddingComponent";

class ModalBiddingComponent extends Component {
  state = {
    open: false,
  };

  onOpen = () => this.setState({ ...this.state, open: true });
  onClose = () => this.setState({ ...this.state, open: false });

  showBiddingModal = e => {
    console.log("show");
    e.preventDefault();
    e.stopPropagation();
  };

  render() {
    const { open } = this.state;
    return (
      <Modal
        className="bidding modal"
        dimmer={true}
        closeOnDimmerClick={false}
        open={open}
        onOpen={this.onOpen}
        onClose={this.onClose}
        trigger={<Icon className="cancel-button" onClick={this.showBiddingModal} name="delete" size="small" />}
      >
        <Modal.Header>投票のセッション希望の修正</Modal.Header>
        <Modal.Content scrolling>
          <BiddingComponent article={this.props.article} />
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={this.onClose}>
            キャンセル
          </Button>
          <Button positive icon="checkmark" labelPosition="right" content="回答する" onClick={this.onClose} />
        </Modal.Actions>
      </Modal>
    );
  }
}

ModalBiddingComponent.propTypes = {
  article: PropTypes.object,
};

export default ModalBiddingComponent;
