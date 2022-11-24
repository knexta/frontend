import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import VerifyOTP from "./Components/VerifyOTP";
import "react-toastify/dist/ReactToastify.css";
import React, { useReducer } from "react";
import { reducer } from "./Reducer/reducer";
import { Products } from "./Components/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgetPassword from "./Components/ForgetPassword";
import ResetPassword from "./Components/ResetPassword";
export const ContextAPI: React.Context<value> = React.createContext({});
interface actionParams {
  type: String;
  dispatch: String;
}
interface dispatchParam {
  action: actionParams;
}
interface stateParams {
  emailid: String;
  userid: String;
}
interface value {
  Dispatch?: dispatchParam | any;
  State?: stateParams | any;
}

const initialState = {
  emailid: "",
  userid: "",
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <ContextAPI.Provider value={{ State: state, Dispatch: dispatch }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verifyotp/:userid" element={<VerifyOTP />} />
          <Route path="/products" element={<Products />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      </ContextAPI.Provider>
    </BrowserRouter>
  );
}

export default App;
