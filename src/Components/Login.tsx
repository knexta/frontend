import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { config } from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface error {
  password?: string;
  email?: string;
}

function Login() {
  const API = process.env.REACT_APP_API_URL;

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors: error = {};
      if (!values.email) {
        errors.email = "Please enter email";
      }
      if (!values.password) {
        errors.password = "Please enter password";
      }
      return errors;
    },
    onSubmit: async (values) => {
      console.log(values);
      // const API = env.API_URL;
      // console.log(API)

      try {
        const res = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/users/login`,
          values
        );
        // alert(res.data.message);
        // console.log(res.data.user);

        // localStorage.setItem("email", values.email);
        // localStorage.setItem("react_app_token", res.data.token);
        // localStorage.setItem("userid", res.data.user._id);
        navigate(`/products`);

        // localStorage.setItem("react_app_token",res.data.token)
      } catch (error: any) {
        // const message = error;
        // console.log(message)
        // console.log(error.response.data.message);
        toast(error.response.data.message);
      }
    },
  });

  return (
    <div>
      <ToastContainer />
      <h2 className="text-center mt-5">Authentication</h2>
      <div className="container">
        <div className="row m-5 no-gutters shadow-lg">
          <div className="col-md-6 d-none d-md-block">
            <img
              src="https://securityintelligence.com/wp-content/uploads/2018/10/si-advanced-authentication-feature.jpg"
              className="img-fluid"
              alt="system-lock"
              style={{ minHeight: "100%" }}
            />
          </div>
          <div className="col-md-6 bg-white p-5">
            <h3 className="pb-3">Login Form</h3>
            <div className="form-style">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group pb-3">
                  <input
                    type="text"
                    placeholder="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group pb-3">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="pb-2">
                  <button
                    type="submit"
                    className="btn btn-dark w-100 font-weight-bold mt-2"
                  >
                    Submit
                  </button>
                </div>
              </form>

              <div className="pt-4 text-center">
                Forget Password
                <Link to={"/forget-password"}>Forget Password?</Link>
              </div>
              <div className="pt-4 text-center">
                Get Members Benefit.<Link to={"/register"}>SignUP</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;