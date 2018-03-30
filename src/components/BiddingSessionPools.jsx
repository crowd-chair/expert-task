import React, { Component } from "react";
import { Range } from "immutable";
import PropTypes from "prop-types";
import DropableSegment from "./DropableSegment";
import { List } from "immutable";
import { sessionNames } from "../libs/load_sessions_info";

class BiddingSessionPools extends Component {
  state = {
    maxBiddings: 5,
  };
  render() {
    const { biddings } = this.props;
    const ranks = biddings.map(b => b.rank);

    // Create [1,2,...,7]
    const pools = Range(1, this.state.maxBiddings + 1).toArray();
    return pools.map(rank => {
      const rankKey = `rank-${rank}`;
      if (ranks.includes(rank)) {
        const id = List(biddings).find(b => b.rank === rank).id;
        const sessionName = sessionNames.find(s => s.id === id);
        console.log(id, sessionName);
        return <DropableSegment key={rankKey} rank={rank} sessionName={sessionName} onMove={this.props.onMove} />;
      }
      return <DropableSegment key={rankKey} rank={rank} onMove={this.props.onMove} />;
    });
  }
}

BiddingSessionPools.propTypes = {
  biddings: PropTypes.array,
  onMove: PropTypes.func,
};

export default BiddingSessionPools;
