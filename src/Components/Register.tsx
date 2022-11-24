import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ContextAPI } from "../App";
import { notify } from "./Toast/toast";

interface error {
  password?: string;
  email?: string;
}
interface state {
  emailid: string;
  userid: string;
}

interface dispatchParam {
  type: string;
  payload: string;
}

type dispatch = (data: dispatchParam) => void;

interface context {
  Dispatch?: dispatch;
  State?: state;
}

function Register() {
  let navigate = useNavigate();
  let context: context = useContext(ContextAPI);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      let errors: error = {};
      if (!values.email) {
        errors.email = "Please enter email";
      }
      if (!values.password) {
        errors.password = "Please enter password";
      }
      if (!values.confirmPassword) {
        errors.password = "Please enter confirm password";
      }
      return errors;
    },
    onSubmit: async (values) => {
      if (values.password === values.confirmPassword) {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/users/signup`,
            values
          );
          if (context.Dispatch) {
            context.Dispatch({
              type: "addEmailid",
              payload: res.data.data.email,
            });
            context.Dispatch({
              type: "addUserid",
              payload: res.data.data.userId,
            });
          }
          // console.log(state);
          notify(res.data.message);
          if (context.State) {
            navigate(`/verifyotp/${context.State.userid}`);
          }
        } catch (error: any) {
          notify(error.response.data.message);
        }
      }
    },
  });

  return (
    <>
      <ToastContainer />

      <div>
        <h2 className="text-center mt-5">Authentication</h2>
        <div className="container">
          <div className="row m-5 no-gutters shadow-lg">
            <div className="col-md-6 d-none d-md-block">
              <img
                src="https://securityintelligence.com/wp-content/uploads/2018/10/si-advanced-authentication-feature.jpg"
                className="img-fluid"
                alt="image"
                style={{ minHeight: "100%" }}
              />
            </div>
            <div className="col-md-6 bg-white p-5">
              <h3 className="pb-3">Register Form</h3>
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
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="form-group pb-3">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="form-control"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
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
                  Already Have Account.<Link to={"/"}>SignIN</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
