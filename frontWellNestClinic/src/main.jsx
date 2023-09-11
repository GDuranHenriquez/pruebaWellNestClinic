import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID_GOOGLE}>
        <App />
      </GoogleOAuthProvider>      
    </React.StrictMode>
  </Provider>
);
