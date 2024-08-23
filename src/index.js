/**
=========================================================
* Convo.AI React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { SoftUIControllerProvider } from "context";
import { Provider } from "react-redux";
import store from "./redux/index";
import * as serviceWorker from "./serviceWorker";

// Set a limit on the number of visible toasts
const TOAST_LIMIT = 1;

function ToastLimitEffect() {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      ?.filter((t) => t.visible)
      ?.filter((_, i) => i >= TOAST_LIMIT)
      ?.forEach((t) => toast?.dismiss(t.id));
  }, [toasts]);

  return null;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <SoftUIControllerProvider>
        {/* Toast limit logic */}
        <ToastLimitEffect />

        {/* Toaster Configuration */}
        <Toaster
          containerStyle={{ zIndex: "99999999999999" }}
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              fontSize: "13px", // Set the font size
              color: "#232743", // Set the text color
              backgroundColor: "#fff", // Set the background color
            },
            // Adding a close icon to all toasts
          }}
        />

        {/* Main App Component */}
        <App />
      </SoftUIControllerProvider>
    </BrowserRouter>
  </Provider>
);
serviceWorker.register();
