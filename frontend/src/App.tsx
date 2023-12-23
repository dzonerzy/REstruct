import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProcessesTable from "./components/ProcessesTable/ProcessesTable";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout";
import { createContext } from "react";
import { GlobalCtxProperties } from "./App.types";
import { useGoWebSocket, useFooterMsg } from "./api";

export const GlobalCtx = createContext<GlobalCtxProperties>(null);

function App() {
  const ws = useGoWebSocket();
  const footer = useFooterMsg("Initializing...");

  return (
    <HashRouter basename="/">
      <GlobalCtx.Provider
        value={{
          ws,
          footer,
        }}
      >
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/processes" element={<ProcessesTable />} />
          </Route>
        </Routes>
      </GlobalCtx.Provider>
    </HashRouter>
  );
}

export default App;
