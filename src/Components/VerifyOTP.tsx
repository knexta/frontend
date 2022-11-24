import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ContextAPI } from "../App";
import { notify } from "./Toast/toast";

interface error {
  otp?: string;
  userId?: string;
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

function VerifyOTP() {
  let context: context = useContext(ContextAPI);
  let navigate = useNavigate();
  let handleResend = async () => {
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/resendOtp`,
        formik.values
      );
      console.log(res);
      notify(res.data.message);
    } catch (error: any) {
      notify(error.response.data.message);
    }
  };
  let params = useParams();

  let formik = useFormik({
    initialValues: {
      otp: "",
      userId: params.userid,
      email: context.State?.emailid ? context.State.emailid : null,
    },
    validate: (values) => {
      let errors: error = {};
      if (!values.otp) {
        errors.otp = "Please enter otp";
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
            <h3 className="pb-3">Verify OTP</h3>
            <div className="form-style">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group pb-3">
                  <input
                    type="text"
                    name="userid"
                    className="form-control"
                    value={params.userid}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="form-control"
                    id="otp"
                    name="otp"
                    value={formik.values.otp}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="pb-2">
                  <button
                    type="submit"
                    className="btn btn-dark w-100 font-weight-bold mt-2"
                  >
                    Verify OTP
                  </button>
                  <button
                    className="btn btn-secondary w-100 font-weight-bold mt-2"
                    type="button"
                    onClick={() => handleResend()}
                  >
                    Resend OTP
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

export default VerifyOTP;
