import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import $ from "jquery";

$(() => {
  $("header").remove();
  ReactDOM.render(<App />, document.getElementById("app-root"));
});
