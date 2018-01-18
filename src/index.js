import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import $ from "jquery";

$(function() {
  $("header").remove();
  ReactDOM.render(<App />, document.getElementById("app-root"));
});
