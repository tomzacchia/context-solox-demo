import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import Context from "./Context";
import Solox from "./Solox";

import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="context" element={<Context />} />
          <Route path="solox" element={<Solox />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
