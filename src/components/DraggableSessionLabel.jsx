import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";

@DragSource(
  "sessionLabels",
  {
    beginDrag(props) {
      console.log("begin drag!");
      return {
        bidding: props.bidding,
        from: props.from,
      };
    },
  },
  connect => {
    return {
      connectDragSource: connect.dragSource(),
    };
  }
)
class DraggableSessionLabel extends Component {
  render() {
    const { sessionName } = this.props;
    const labelKey = `sessionName-${sessionName.id}`;
    return this.props.connectDragSource(
      <div className="ui session label draggable" key={labelKey} id={labelKey} draggable="true">
        {sessionName.name}
      </div>
    );
  }
}

DraggableSessionLabel.propTypes = {
  sessionName: PropTypes.object,
  bidding: PropTypes.object,
  from: PropTypes.string,
};

export default DraggableSessionLabel;
