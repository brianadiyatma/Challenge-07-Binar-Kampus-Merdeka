import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Chart from "./Pages/Chart/Chart";
import Download from "./Pages/Download/Download";
import Input from "./Pages/Input/Input";
import SingleUser from "./Pages/SingleUser/SingleUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="" element={<Home />} />
        <Route path="/user/:id" element={<SingleUser />} />
        <Route path="chart" element={<Chart />} />
        <Route path="download" element={<Download />} />
        <Route path="input" element={<Input />} />
      </Route>
    </Routes>
  );
}

export default App;
