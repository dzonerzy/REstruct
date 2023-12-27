import { createContext, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { GlobalCtxProperties } from "./App.types";
import { useFooterMsg, useGoWebSocket } from "./api";
import ErrorAlert from "./components/ErrorAlert/ErrorAlert";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout";
import LocalTypes from "./pages/LocalTypes/LocalTypes";
import MemoryInspector from "./pages/MemoryInspector/MemoryInspector";
import Processes from "./pages/Processes/Processes";

export const GlobalCtx = createContext<GlobalCtxProperties>(null);

function App() {
  const [attachedPid, setAttachedPid] = useState<number>(-1);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const ws = useGoWebSocket(setErrorMsg);
  const footer = useFooterMsg("Initializing...");

  const closeError = () => {
    setErrorMsg("");
  };
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
            <Route path="/processes" element={<Processes />} />
            <Route path="/memory-inspector" element={<MemoryInspector />} />
            <Route path="/local-types" element={<LocalTypes />} />
          </Route>
        </Routes>
        <ErrorAlert errorMsg={errorMsg} closeError={closeError} />
      </GlobalCtx.Provider>
    </HashRouter>
  );
}

export default App;
