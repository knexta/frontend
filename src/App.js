import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import VerifyOTP from "./Components/VerifyOTP";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verifyotp/:userid" element={<VerifyOTP />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
