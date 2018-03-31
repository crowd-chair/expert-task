import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import $ from "jquery";
import { injectGlobal } from "styled-components";

$(() => {
  $("header").remove();
  ReactDOM.render(<App />, document.getElementById("app-root"));
});

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  @font-face {
    font-family: sans-serif;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`;
