import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import router from "./config/routes/router";
import { Provider } from "react-redux";
import { store } from "./config/store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientGGId =
  "483449278493-ua9hfvdehhbc4u7h30a5m1fekvj5igo7.apps.googleusercontent.com";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={clientGGId}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </GoogleOAuthProvider>
);
reportWebVitals();
