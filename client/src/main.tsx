import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { PrimeReactProvider } from "primereact/api";
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex
import AuthContextProvider from "./Context/AuthContext.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

    <PrimeReactProvider>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
    </PrimeReactProvider>
  </React.StrictMode>
);
