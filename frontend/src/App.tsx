import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProcessesTable from "./components/ProcessesTable/ProcessesTable";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout";
import useGoWebSocket from "./api/useGoWebSocket";
import { createContext } from "react";

export const WsContext = createContext<ReturnType<typeof useGoWebSocket> | null>(null);

function App() {
  const ws = useGoWebSocket();

  return (
    <HashRouter basename="/">
      <WsContext.Provider value={ws}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/processes" element={<ProcessesTable />} />
          </Route>
        </Routes>
      </WsContext.Provider>
    </HashRouter>
  );
}

export default App;
