import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import $ from "jquery";
import "semantic-ui-css/semantic.min.css";

$(function() {
  $("header").remove();
});
ReactDOM.render(<App />, document.getElementById("root"));
