import React, { Component } from "react";
import SessionsComponent from "./components/SessionsComponent";
import ManageButtons from "./components/ManageButtons";
import QuestionComponent from "./components/QuestionComponent";
import { Provider } from "react-redux";
import myStore from "./redux/store";
import "./App.css";
import "./libs/load_sessions_info";

const store = myStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="sessions-component">
            {/* <QuestionComponent /> */}
            <SessionsComponent />
            <ManageButtons />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
