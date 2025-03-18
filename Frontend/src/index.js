import React from "react";
import ReactDOM from "react-dom/client";  // ✅ Ensure 'client' is included
import { Provider } from "react-redux";
import store from "./redux/store";  // ✅ Make sure the store path is correct
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
