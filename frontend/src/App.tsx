import useWebSocket, { ReadyState } from "react-use-websocket";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import A from "./components/A";
import B from "./components/B";
import Layout from "./pages/Layout";
import Home from "./pages/Home/Home";
import ProcessesTable from "./components/ProcessesTable/ProcessesTable";

function App() {
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket("ws://localhost:5000", {
    share: true,
    shouldReconnect: () => true,
    reconnectAttempts: 0,
    reconnectInterval: 3000,
  });

  console.log("App.tsx");
  console.log({ readyState, lastJsonMessage, sendJsonMessage });

  return (
    <HashRouter basename="/">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/b" element={<B />} />
          <Route path="/processes" element={<ProcessesTable />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
