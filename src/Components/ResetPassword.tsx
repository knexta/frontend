import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function ResetPassword() {
  let navigate = useNavigate();

  interface error {
    email?: string;
    password?: string;
    token?: string;
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      token: "",
    },
    validate: (values) => {
      let errors: error = {};
      if (!values.email) {
        errors.email = "PLease enter emailid";
      }
      if (!values.password) {
        errors.password = "PLease enter password";
      }
      if (!values.token) {
        errors.token = "PLease enter token";
      }
      return errors;
    },
    onSubmit: async (values) => {
      // console.log(values)
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/users/verifyOtp`,
          values
        );
        navigate("/");
        // console.log(res)
        alert(res.data.message);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <ToastContainer />
      <h2 className="text-center mt-5">Authentication</h2>
      <div className="container">
        <div className="row m-5 no-gutters shadow-lg">
          <div className="col-md-6 bg-white p-5 ">
            <h3 className="pb-3">FORGET PASSWORD</h3>
            <div className="form-style">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group pb-3">
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter Email ID"
                    className="form-control"
                    value={formik.values.email}
                  />
                  <input
                    type="text"
                    name="password"
                    placeholder="Enter Password"
                    className="form-control"
                    value={formik.values.password}
                  />
                  <input
                    type="text"
                    name="emailid"
                    placeholder="Enter Token"
                    className="form-control"
                    value={formik.values.token}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
