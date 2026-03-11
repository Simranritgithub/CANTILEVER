import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Auth/Register";
import Login from "./Auth/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;