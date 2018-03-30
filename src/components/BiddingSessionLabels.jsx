import React, { Component } from "react";
import PropTypes from "prop-types";
import { sessionNames } from "../libs/load_sessions_info";
import DraggableSessionLabel from "./DraggableSessionLabel";

import { DropTarget } from "react-dnd";

@DropTarget(
  "sessionLabels",
  {
    drop(dropProps, monitor, dropComponent) {
      const dragProps = monitor.getItem();
      console.log(dragProps);

      dropComponent.props.onMove(dragProps.bidding, "labels");
    },
  },
  (connect, monitor) => {
    return {
      connectDropTarget: connect.dropTarget(),
      isHover: monitor.isOver(),
    };
  }
)
class BiddingSessionLabels extends Component {
  state = {
    isHover: false,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      isHover: nextProps.isHover,
    });
  }

  render() {
    const { isHover } = this.state;
    const { biddings } = this.props;
    const hoverClass = isHover ? "hovering" : "not-hovering";
    const ids = biddings.map(b => b.id);
    return this.props.connectDropTarget(
      <div className={`ui segment session-frame dropzone ${hoverClass}`}>
        {sessionNames
          .filterNot(b => ids.includes(b.id))
          .filterNot(b => b.noBidding)
          .map(sessionName => {
            const labelKey = `labels-${sessionName.id}`;
            return (
              <DraggableSessionLabel
                key={labelKey}
                sessionName={sessionName}
                bidding={{
                  id: sessionName.id,
                  rank: null,
                }}
                from="labels"
              />
            );
          })}
      </div>
    );
  }
}

BiddingSessionLabels.propTypes = {
  sessionNames: PropTypes.object,
  biddings: PropTypes.array,
  onMove: PropTypes.func,
};

export default BiddingSessionLabels;
