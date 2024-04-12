import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styleLogin from "../Login/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imgLogo from "../../../imgs/logoLogin.svg";
import { RotatingLines } from "react-loader-spinner";

export default function ForgetPass() {
  const navigate = useNavigate();
  const [loadingBtn, setloadingBtn] = useState(false);

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // data => شايل data for inputs
  async function onSubmit(data) {
    setloadingBtn(true);

    try {
      let DtaApi = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",
        data
      );
      // console.log(DtaApi.data.token)
      let ResultToen = DtaApi.data.token;
      // console.log(ResultToen);

        toast.success(
          "Your request is being processed, please check your email"
        );
      navigate("/resetPass");
    } catch (error) {
      // console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }

    // console.log(data)
    setloadingBtn(false);
  }

  return (
    <>
      <section className={`${styleLogin.secLogin}`}>
        {/* <ToastContainer /> */}
        <div className="AuthContainer vh-100">
          <div className="AuthLayer vh-100 container-fluid">
            <div className=" row vh-100 justify-content-center  align-items-center">
              <div className=" col-md-5">
                <div className=" bg-white rounded-3 px-5 py-4">
                  <div className="  text-center">
                    <img className=" w-50 " src={imgLogo} alt=" logo food" />
                  </div>

                  <h5>Forgot Your Password? </h5>
                  <p className=" text-muted">
                    No worries! Please enter your email and we will send a
                    password reset link
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group mb-3">
                      <span
                        className={`${styleLogin.IconInput} input-group-text`}
                        id="basic-addon1"
                      >
                        <i className="fa-solid fa-mobile-screen-button"></i>
                      </span>
                      <input
                        className={`${styleLogin.InputLogin} form-control`}
                        type="email"
                        placeholder="Enter Your E-mail"
                        {...register("email", {
                          required: "Email Address is required",
                          pattern: {
                            value: /[A-Za-z0-9._%+-]+@(gmail|yahoo|email)\.com/,
                            message: "Email Not vaild",
                          },
                        })}
                      />
                      {errors.email && (
                        <div className="alert alert-danger  d-inline-block w-100 mt-1">
                          {errors.email.message}
                        </div>
                      )}
                    </div>

                    <button className=" w-100 btn btn-success">
                      {" "}
                      {loadingBtn ? (
                        <RotatingLines
                          visible={true}
                          height="20"
                          width="20"
                          color="grey"
                          strokeWidth="5"
                          animationDuration="0.75"
                          ariaLabel="rotating-lines-loading"
                          wrapperStyle={{}}
                          className=""
                        />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
