import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProcessesTable from "./components/ProcessesTable/ProcessesTable";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout";
import { createContext, useState } from "react";
import { GlobalCtxProperties } from "./App.types";
import { useGoWebSocket, useFooterMsg } from "./api";
import ModalGuard from "./components/Wrappers/ModalThemed";
import { Alert } from "flowbite-react";
import ErrorAlert from "./components/ErrorAlert/ErrorAlert";

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
          footer: useFooterMsg("Initializing..."),
        }}
      >
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/processes" element={<ProcessesTable />} />
          </Route>
        </Routes>
        <ErrorAlert errorMsg={errorMsg} closeError={closeError} />
      </GlobalCtx.Provider>
    </HashRouter>
  );
}

export default App;
