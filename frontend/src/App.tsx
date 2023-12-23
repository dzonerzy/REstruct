import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProcessesTable from "./components/ProcessesTable/ProcessesTable";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout";
import { createContext, useState } from "react";
import { GlobalCtxProperties } from "./App.types";
import { useGoWebSocket, useFooterMsg } from "./api";

export const GlobalCtx = createContext<GlobalCtxProperties>(null);

function App() {
  const ws = useGoWebSocket();
  const footer = useFooterMsg("Initializing...");
  const [attachedPid, setAttachedPid] = useState<number>(-1);

  return (
    <HashRouter basename="/">
      <GlobalCtx.Provider
        value={{
          ws,
          footer,
          pid: [attachedPid, setAttachedPid],
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
