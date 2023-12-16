import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import A from "./components/A";
import B from "./components/B";
import Layout from "./pages/Layout";
import Home from "./pages/Home/Home";
import ProcessesTable from "./components/ProcessesTable/ProcessesTable";

function App() {
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
