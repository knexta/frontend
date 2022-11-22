import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import VerifyOTP from "./Components/VerifyOTP";
import "react-toastify/dist/ReactToastify.css";
import React, { useReducer } from "react";
import { reducer } from "./Reducer/reducer";
import { Products } from "./Components/Products";
export const ContextAPI = React.createContext();

const initialState = {
  emailid: "",
  userid: "",
};


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <BrowserRouter>
        <ContextAPI.Provider value={{ State: state, Dispatch: dispatch }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verifyotp/:userid" element={<VerifyOTP />} />
            <Route path="/products" element={<Products />} />
        </Routes>
        </ContextAPI.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
