import React, { useState } from "react";
import styleLogin from "../Login/Login.module.css";
import imgLogo from "../../../imgs/logoLogin.svg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RotatingLines } from "react-loader-spinner";

export default function ResetPass() {
  const navigate = useNavigate();
  const [loadingBtn, setloadingBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setshowPasswordConfirm] = useState(false);

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const togglePasswordConfirm = () => {
    setshowPasswordConfirm((prevState) => !prevState);
  };

  // data => شايل data for inputs
  async function onSubmit(data) {
    setloadingBtn(true);

    try {
      let DtaApi = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Users/Reset",
        data
      );
      // console.log(DtaApi.data.token)
      let ResultToen = DtaApi.data.token;
      // console.log(ResultToen);

      // setTimeout(() => {
      toast.success("You are reset");
      // }, 1000);
      navigate("/dashboard");
    } catch (error) {
      // console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
    setloadingBtn(false);

    // console.log(data)
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

                  <h5> Reset Password </h5>
                  <p className=" text-muted">
                    Please Enter Your Otp or Check Your Inbox
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group mb-3">
                      <span
                        className={`${styleLogin.IconInput} input-group-text`}
                        id="basic-addon1"
                      >
                        <i className="fa-solid fa-envelope"></i>
                      </span>
                      <input
                        className={`${styleLogin.InputLogin} form-control`}
                        type="email"
                        placeholder=" E-mail"
                        {...register("email", {
                          required: "Email is required",
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

                    {/* otp */}

                    <div className="input-group mb-3">
                      <span
                        className={`${styleLogin.IconInput} input-group-text`}
                        id="basic-addon1"
                      >
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input
                        className={`${styleLogin.InputLogin} form-control`}
                        type="text"
                        placeholder="OTP"
                        {...register("seed", {
                          required: "Otp is required",
                        })}
                      />
                      {errors.seed && (
                        <div className="alert alert-danger  d-inline-block w-100 mt-1">
                          {errors.seed.message}
                        </div>
                      )}
                    </div>

                    {/* password */}

                    <div className="input-group mb-3">
                      <span
                        className={`${styleLogin.IconInput} input-group-text`}
                        id="basic-addon1"
                      >
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      {/* password */}
                      <input
                        className={`${styleLogin.InputLogin} form-control`}
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        {...register("password", {
                          required: "password is required",
                          //     pattern:{
                          //       value: /^[a-zA-Z]{4}\d{1,5}$/,
                          //       message:"password Not vaild"
                          // }
                        })}
                      />
                      <i
                        className={`fa-regular fa-eye${
                          showPassword ? "-slash" : ""
                        }`}
                        onClick={togglePasswordVisibility}
                      ></i>

                      {errors.password && (
                        <div className="alert alert-danger  d-inline-block w-100 mt-1">
                          {errors.password.message}
                        </div>
                      )}
                    </div>

                    {/* confirmPassword */}

                    <div className="input-group mb-3">
                      <span
                        className={`${styleLogin.IconInput} input-group-text`}
                        id="basic-addon1"
                      >
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      {/* confirmPassword */}
                      <input
                        className={`${styleLogin.InputLogin} form-control`}
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm New Password"
                        {...register("confirmPassword", {
                          required: "confirm Password is required",
                        })}
                      />

                      <i
                        className={`fa-regular fa-eye${
                          showPassword ? "-slash" : ""
                        }`}
                        onClick={togglePasswordVisibility}
                      ></i>

                      {errors.confirmPassword && (
                        <div className="alert alert-danger  d-inline-block w-100 mt-1">
                          {errors.confirmPassword.message}
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
                          wrapperClass=""
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
