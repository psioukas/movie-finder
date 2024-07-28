import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SearchHistoryContextProvider } from "./contexts/SearchHistoryContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SearchHistoryContextProvider>
      <App />
    </SearchHistoryContextProvider>
  </React.StrictMode>,
);
