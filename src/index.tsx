import React from "react";
import ReactDOM from "react-dom";
import Contexts from "contexts/index";
import reportWebVitals from "./reportWebVitals";
import "@atlaskit/css-reset/dist/bundle.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Contexts />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
