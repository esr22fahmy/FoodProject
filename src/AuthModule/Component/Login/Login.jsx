import React, { useEffect, useState } from "react";
import styleLogin from "../Login/Login.module.css";
import imgLogo from "../../../imgs/logoLogin.svg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RotatingLines } from "react-loader-spinner";
import { useLocation } from "react-router-dom";

export default function Login({ FunDataAdmin }) {
  const navigate = useNavigate();
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  // const [validPassword, setValidPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // data => شايل data for inputs
  async function onSubmit(data) {
    setLoadingBtn(true);

    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",
        data
      );
      // console.log(response)
      let token = response.data.token;
      localStorage.setItem("tokemAdmin", token);
      FunDataAdmin();
     
      navigate("/dashboard");
      toast.success("You are logged in successfully!");
    } catch (error) {
      console.log(error)
      toast.error(error.message);

      if (error) {
        if (error.response.status === 401) {
          toast.error("The password is incorrect");
        } else if (error.response.status === 404) {
          toast.error(" The email is not already registered  ");
        }
      } else {
        toast.error(error.response.data.message);
      }
    }
    setLoadingBtn(false);
  }

  return (
    <>
      {/* <ToastContainer/> */}

      <section className={`${styleLogin.secLogin}`}>
        <div className="AuthContainer vh-100">
          <div className="AuthLayer vh-100 container-fluid">
            <div className=" row vh-100 justify-content-center  align-items-center">
              <div className=" col-md-5">
                <div className=" bg-white rounded-3 px-5 py-4">
                  <div className="  text-center">
                    <img className=" w-50 " src={imgLogo} alt=" logo food" />
                  </div>

                  <h5>Log In </h5>
                  <p className=" text-muted">
                    Welcome Back! Please enter your details
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

                    {/* password */}

                    <div className="input-group mb-3">
                      <span
                        className={`${styleLogin.IconInput} input-group-text`}
                        id="basic-addon1"
                      >
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input
                        className={`${styleLogin.InputLoginPass} form-control`}
                        type={showPassword ? "text" : "password"}
                        placeholder="password  "
                        {...register("password", {
                          required: "password is required ",
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

                    <div className=" d-flex justify-content-between my-2">
                      <Link to="/register" className=" text-dark">
                        Register Now?
                      </Link>
                      <Link to="/forgetPass" className=" text-success">
                        Forgot Password?
                      </Link>
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
                        "Login"
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
