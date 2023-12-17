import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProcessesTable from "./components/ProcessesTable/ProcessesTable";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout";

function App() {
  return (
    <HashRouter basename="/">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/processes" element={<ProcessesTable />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
