import Navbar from "./Navbar";
import "./styles.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Artikel from "./pages/Artikel";
import { Pruefplanung } from "./pages/Pruefplanung";
import { Department } from "./pages/Department";
import AQL from "./pages/AQL";
import Sidenav from "./Sidenav";
import WEBasisdaten from "./pages/WEBasisdaten";
function App() {
  return (
    <>
      <Sidenav />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/webasisdaten" element={<WEBasisdaten />} />
          <Route path="/pruefplanung" element={<Pruefplanung />} />
          <Route path="/aql" element={<AQL />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/department" element={<Department />} />
        </Routes>
      </div>
    </>
  );
}
export default App;
