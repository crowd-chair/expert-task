import React, { Component } from "react";
import SessionNameList from "./SessionNameList";
import { sessions, sessionNames } from "../libs/load_sessions_info";

class SessionsComponent extends Component {
  render() {
    return <SessionNameList className="Base" sessions={sessions} sessionNames={sessionNames} />;
  }
}

export default SessionsComponent;
