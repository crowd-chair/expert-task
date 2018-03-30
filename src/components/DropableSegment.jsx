import React, { Component } from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import DraggableSessionLabel from "./DraggableSessionLabel";

@DropTarget(
  "sessionLabels",
  {
    drop(dropProps, monitor, dropComponent) {
      const dragProps = monitor.getItem();
      console.log("drop to rank", dragProps);
      const bidding = {
        ...dragProps.bidding,
        rank: dropComponent.props.rank,
      };
      dropComponent.props.onMove(bidding, "rank");
    },
  },
  (connect, monitor) => {
    return {
      connectDropTarget: connect.dropTarget(),
      isHover: monitor.isOver(),
    };
  }
)
class DropableSegment extends Component {
  state = {
    isHover: false,
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);

    this.setState({
      ...this.state,
      isHover: nextProps.isHover,
    });
  }

  render() {
    const { rank, isHover, sessionName } = this.props;
    const hoverClass = isHover ? "hovering" : "not-hovering";
    return this.props.connectDropTarget(
      <div className={`ui segment session-frame dropzone related-session ${hoverClass}`}>
        <div className="ui label rank">{rank}</div>
        {sessionName === undefined ? (
          <div />
        ) : (
          <DraggableSessionLabel
            sessionName={sessionName}
            from="rank"
            bidding={{
              id: sessionName.id,
              rank: rank,
            }}
          />
        )}
      </div>
    );
  }
}

DropableSegment.propTypes = {
  rank: PropTypes.number,
  sessionName: PropTypes.object,
  onMove: PropTypes.func,
};

export default DropableSegment;
