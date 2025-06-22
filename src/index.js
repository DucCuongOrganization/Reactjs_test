import "bootstrap/dist/css/bootstrap.min.css";
import React, { JSX } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { createStore } from "redux";
import reportWebVitals from "./reportWebVitals";
import rootReducer from "./store/reducers/rootReducer.ts";
import "./styles/global.scss";
import App from "./views/App";

const reduxStore = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__?.({ trace: true })
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
